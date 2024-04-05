import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
import { auth } from "../firebase/FirebaseForLogin";
import { signInWithEmailAndPassword } from "firebase/auth";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "./css/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Redirect to "/app" if login successful
        navigate("/app");
      })
      .catch((error) => {
        // Handle authentication errors
        console.error("Login Error:", error); // Log the full error object for debugging
        if (
          error.code === "auth/user-not-found" ||
          error.code === "auth/wrong-password"
        ) {
          alert("Invalid email or password. Please try again.");
        } else {
          alert("Invalid email or password. Please try again.");
        }
      });
  };

  const navigateToSignUp = () => {
    navigate("/signup");
  };

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    };
  }, []);

  /* const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
      })
      .catch((error) => console.log(error));
  }; */

  return (
    <div className="Login">
      <div className="auth-form-container">
        <form className="login-form" onSubmit={signIn}>
          <h1>Sign in</h1>
          <label className="input">
            <input
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
              className="input__field"
              type="password"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="input__label">Enter your password</span>
          </label>

          <button type="submit">Sign in</button>
          <div className="link-btn" onClick={navigateToSignUp}>
            Don't have an account? Sign up
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
