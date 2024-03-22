import React from "react";
import reactDom from "react-dom";
import App from "./App";
import { TodoContextProvider } from "./context";
import { BrowserRouter } from "react-router-dom";
reactDom.render(
  <TodoContextProvider>
    <React.StrictMode>
    <App />
    </React.StrictMode>
  </TodoContextProvider>,

  document.getElementById("root")
);
