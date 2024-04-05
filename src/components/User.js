import React from "react";
import logo from "../images/ghould.png";
import { auth } from "../firebase/FirebaseForLogin";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { BoxArrowRight } from "react-bootstrap-icons";

function User() {
  const navigate = useNavigate();
  const userSignOut = () => {
    signOut(auth)
      .then((userCredential) => {
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="User">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="info">
        <p>Hanoi Ghoul</p>
        <button onClick={userSignOut}>
          <BoxArrowRight size={20} />
          <div className="textOut">Sign out</div>
        </button>
      </div>
    </div>
  );
}

export default User;
