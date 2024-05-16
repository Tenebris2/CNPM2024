import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TodoContextProvider } from "./context";
import App from "./App";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
ReactDOM.render(
  <TodoContextProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <App />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  </TodoContextProvider>,
  document.getElementById("root")
);
