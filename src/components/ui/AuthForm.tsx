import { useState } from "react";
import Login from "../ui/Login";
import SignUp from "../ui/Signup";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-form">
      {isLogin ? <Login /> : <SignUp />}
      <p style={{ textAlign: "center", marginTop: "1rem", color: "#3182ce" }}>
        {isLogin ? "Need an account? " : "Already have an account? "}
        <button
          onClick={() => setIsLogin(!isLogin)}
          style={{
            background: "none",
            border: "none",
            color: "#3182ce",
            cursor: "pointer",
            fontWeight: "bold",
            textDecoration: "underline"
          }}
        >
          {isLogin ? "Sign Up" : "Login"}
        </button>
      </p>
    </div>
  );
};

export default AuthForm;

