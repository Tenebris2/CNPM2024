import React, { useContext, useEffect, useRef } from "react";
import { TodoContext } from "../context";
import SignOut from "./SignOut"; // Import the SignOut component

function Sidebar({ children }) {
  // CONTEXT
  const { setSelectedTodo } = useContext(TodoContext);

  // REF
  const sidebarRef = useRef();

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  });

  const handleClick = (e) => {
    if (
      e.target === sidebarRef.current ||
      sidebarRef.current.contains(e.target)
    ) {
      setSelectedTodo(undefined);
    }
  };

  return (
    <div className="Sidebar" ref={sidebarRef}>
      {children}
      <SignOut /> {/* Include the SignOut component */}
    </div>
  );
}

export default Sidebar;
