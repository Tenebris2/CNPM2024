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

  return (
    <div className="Signup">
      <div className="auth-form-container">
        <form className="login-form" onSubmit={signUp}>
          <h1>Sign up</h1>

          <label className="input">
            <input
              spellcheck="false"
              className="input__field"
              type="email"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="input__label">Enter your email</span>
          </label>

          <label className="input">
            <input
              spellcheck="false"
              className="input__field"
              type="password"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="input__label">Enter your password</span>
          </label>

          <label className="input">
            <input
              spellcheck="false"
              className="input__field"
              type="password"
              placeholder=" "
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span className="input__label">Re-enter your password</span>
          </label>

          <button type="submit">Sign up</button>
          <div
            className="link-btn"
            onClick={navigateToSignIn}
            data-replace="Sign in"
          >
            <span>Already have an account?</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
