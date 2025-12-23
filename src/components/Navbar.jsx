import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { subscribeToAuthChanges } from "../authState";
import logo from "../assets/logo.png";


export default function Navbar() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        subscribeToAuthChanges((loggedUser) => {
            setUser(loggedUser);
        });
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        alert("Logged out successfully");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-black shadow-sm">
            <div className="container">

                <Link className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/">
                    <img
                        src={logo}
                        alt="ResumeCraft AI Logo"
                        style={{ height: "32px", width: "32px" }}
                    />
                    ResumeCraft AI
                </Link>


                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#mainNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="mainNav">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Home
                            </Link>
                        </li>

                        {user && (
                            <>
                                <li className="nav-item">
                                    <span className="nav-link text-info fw-bold">
                                        {user.displayName || user.email}
                                    </span>
                                </li>

                                <li className="nav-item">
                                    <button className="btn btn-outline-danger ms-3" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}

                        {!user && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/signup">
                                        Sign Up
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">
                                        Login
                                    </Link>
                                </li>
                            </>
                        )}

                    </ul>
                </div>

            </div>
        </nav>
    );
}
