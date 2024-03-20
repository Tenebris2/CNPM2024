import React from "react";
import reactDom from "react-dom";
import App from "./App";
import { TodoContextProvider } from "./context";
reactDom.render(
  <TodoContextProvider>
    <App />
  </TodoContextProvider>,

  document.getElementById("root")
);
