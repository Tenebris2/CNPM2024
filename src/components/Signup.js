import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { auth } from "../firebase/FirebaseForLogin";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./css/Signup.css";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        // Redirect to "/" after successful sign up
        navigate("/app");
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
          ></input>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>

          <button type="submit">Sign up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
