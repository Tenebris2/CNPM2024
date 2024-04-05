import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/FirebaseForLogin";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./css/Signup.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const navigateToSignIn = () => {
    navigate("/");
  };

  const signUp = (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Passwords do not match. Please re-enter.");
      return;
    }
    
    if (password.length < 6) {
      alert("Password should be at least 6 characters long.");
      return;
    }
    
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate("/app"); // Navigate to "/app" after successful sign up
      })
      .catch((error) => {
        console.log(error);
      });
  };
<<<<<<< HEAD
=======
  
>>>>>>> 74ec940e3b49415ddff24698ccf6fb58998450fd

  return (
    <div className="Signup">
      <div className="auth-form-container">
        <form className="login-form" onSubmit={signUp}>
          <h1>Sign up</h1>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit">Sign up</button>
          <div className="link-btn" onClick={navigateToSignIn}>
            Already have an account? Login
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
