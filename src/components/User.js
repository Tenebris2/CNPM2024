import React, { useState, useEffect } from "react";
import logo from "../images/ghould.png";
import { auth } from "../firebase/FirebaseForLogin";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { BoxArrowRight } from "react-bootstrap-icons";

function User() {
  const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate();

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => console.log(error));
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

  return (
    <div className="User">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="info">
        {authUser ? (
          <>
            <p>{`Signed in as ${authUser.email}`}</p>
            <button onClick={userSignOut}>
              <BoxArrowRight size={20} />
              <div className="textOut">Sign out</div>
            </button>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default User;
