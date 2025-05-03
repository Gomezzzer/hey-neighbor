import React, { useState, useEffect } from "react";
import "./MessageBoard.css";

type Message = {
  id: number;
  author: string;
  text: string;
  timestamp: string;
  likes: number;
};

const MessageBoard = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  // Load saved messages from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("messages");
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  // Save to localStorage on messages change
  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !text) return;

    if (editId !== null) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === editId ? { ...msg, author, text } : msg
        )
      );
      setEditId(null);
    } else {
      const newMessage: Message = {
        id: Date.now(),
        author,
        text,
        timestamp: new Date().toLocaleString(),
        likes: 0,
      };
      setMessages([newMessage, ...messages]);
    }

    setAuthor("");
    setText("");
  };

  const handleEdit = (id: number) => {
    const msg = messages.find((m) => m.id === id);
    if (msg) {
      setAuthor(msg.author);
      setText(msg.text);
      setEditId(id);
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Delete this message?")) {
      setMessages((prev) => prev.filter((m) => m.id !== id));
    }
  };

  const handleLike = (id: number) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id ? { ...msg, likes: msg.likes + 1 } : msg
      )
    );
  };  
  
  return (
    <div className="message-board">
      <h2>Neighborhood Message Board</h2>

      <form onSubmit={handleSubmit} className="message-form">
        <input
          type="text"
          placeholder="Your Name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <textarea
          placeholder="Write your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">
          {editId !== null ? "Update Message" : "Post Message"}
        </button>
      </form>

      <ul className="message-list">
        {messages.map((msg) => (
          <li key={msg.id} className="message-card">
            <p className="message-text">{msg.text}</p>
            <div className="message-meta">
              <strong>{msg.author}</strong> — <span>{msg.timestamp}</span>
            </div>
            <div className="message-actions">
              <button onClick={() => handleEdit(msg.id)}>Edit</button>
              <button onClick={() => handleDelete(msg.id)}>Delete</button>
              <button className="like-button" onClick={() => handleLike(msg.id)}> 👍 {msg.likes}</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageBoard;

