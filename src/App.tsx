import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import "./LandingPage.css";
import "./Button.css";
import "./Input.css";
import MessageBoard from "./components/ui/MessageBoard";
import "./NavBar.css";
// In App.tsx or a context file
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase"; 
import AuthForm from "./components/ui/AuthForm";
import "./LandingPage.css";
import "./Button.css";
import "./Input.css";
import "./NavBar.css";
import ProtectedRoute from "./components/ui/ProtectedRoute"; 
import PublicRoute from "./components/ui/PublicRoute";


const NavBar = ({ user }: { user: any }) => (
  <nav className="navbar">
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/messages">Message Board</Link></li>
      {!user ? (
        <li><Link to="/auth">Login / Signup</Link></li>
      ) : (
        <li><button onClick={() => auth.signOut()}>Logout</button></li>
      )}
    </ul>
  </nav>
);


const Button = ({ type = "button", className = "", children, onClick }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button type={type} className={`custom-button ${className}`} onClick={onClick}>
    {children}
  </button>
);

const Input = ({ type, value, onChange, placeholder, className = "", required }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`custom-input ${className}`}
    required={required}
  />
);

const LandingPage = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(`Thanks for signing up, ${email}! We'll keep you posted.`);
      setEmail("");
    }
  };

  return (
    <div className="landing-wrapper">
      <div className="landing-container">
        <div className="landing-content">
          <img
            src="/hey-neighbor-logo.png"
            alt="Hey Neighbor Logo"
            className="logo"
          />

          <h1 className="title">Hey Neighbor</h1>
          <p className="subtitle">
            A private neighborhood forum to connect with the people living right next door.
            Share updates, local tips, events, safety alerts, and more — all in a safe and friendly space.
          </p>

          <form onSubmit={handleSubmit} className="signup-form">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email to get early access"
              className="email-input"
              required
            />
            <Button type="submit" className="submit-button">
              Notify Me
            </Button>
          </form>

          <p className="launch-info">Launching soon in select neighborhoods</p>

          <div className="social-icons">
            <a href="#" aria-label="Share on Facebook">
              <FaFacebook size={24} />
            </a>
            <a href="#" aria-label="Share on Twitter">
              <FaTwitter size={24} />
            </a>
            <a href="#" aria-label="Share on Instagram">
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <NavBar user={user} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/messages"
          element={
            <ProtectedRoute user={user}>
              <MessageBoard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/auth"
          element={
            <PublicRoute user={user}>
              <AuthForm />
            </PublicRoute>
          }
        />
      </Routes>
    </Router>
  );
  
    
}


export default App;



