import React from "react";
import logo from "../images/ghould.png";

function User() {
  return (
    <div className="User">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="info">
        <p>Hanoi Ghoul</p>
        <a href="/">Logout</a>
      </div>
    </div>
  );
}

export default User;
