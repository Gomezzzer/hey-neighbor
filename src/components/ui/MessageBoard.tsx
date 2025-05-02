import React, { useState, useEffect } from "react";
import "./MessageBoard.css";

interface Message {
  id: number;
  name: string;
  content: string;
  timestamp: string;
}

const MessageBoard: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const savedName = localStorage.getItem("neighborName");
    if (savedName) setName(savedName);
    else {
      const userName = prompt("What's your name?");
      if (userName) {
        setName(userName);
        localStorage.setItem("neighborName", userName);
      }
    }
  }, []);

  const handlePost = () => {
    if (!input.trim()) return;
    const newMessage: Message = {
      id: Date.now(),
      name,
      content: input,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages([newMessage, ...messages]);
    setInput("");
  };

  return (
    <div className="message-board">
      <h2>Neighbor Feed</h2>
      <div className="message-input">
        <textarea
          placeholder="Share something with your neighbors..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handlePost}>Post</button>
      </div>

      <div className="message-list">
        {messages.map((msg) => (
          <div key={msg.id} className="message">
            <div className="message-header">
              <strong>{msg.name}</strong>
              <span className="timestamp">{msg.timestamp}</span>
            </div>
            <p>{msg.content}</p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageBoard;
