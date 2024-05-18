// SignOut.js
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/FirebaseForLogin";
import { useNavigate } from "react-router-dom";
import { BoxArrowRight } from "react-bootstrap-icons";

function SignOut() {
  const navigate = useNavigate();

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="signOutBtn">
      <button onClick={userSignOut}>
        <BoxArrowRight size={20} />
        <div className="textOut">Sign out</div>
      </button>
    </div>
  );
}

export default SignOut;
