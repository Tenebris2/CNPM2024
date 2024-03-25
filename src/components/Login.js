import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
import { auth } from "../firebase/FirebaseForLogin";
import { signInWithEmailAndPassword } from "firebase/auth";
import { onAuthStateChanged, signOut } from "firebase/auth";

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
                console.log(error);
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

    const userSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log("sign out successful");
            })
            .catch((error) => console.log(error));
    };

    return (
        <div className="sign-in-container">
            <form onSubmit={signIn}>
                <h1>Login in to your account</h1>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></input>

                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></input>

                <button type="submit">Login</button>
                <button onClick={navigateToSignUp}>Sign up</button>
            </form>

            <div>
                {authUser ? (
                    <>
                        <p>{`Signed in as ${authUser.email}`}</p>
                        <button onClick={userSignOut}>Sign out</button>
                    </>
                ) : (
                    <p>Signed Out</p>
                )}
            </div>
        </div>
    );
};

export default Login;
