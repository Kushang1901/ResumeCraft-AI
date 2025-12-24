import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { subscribeToAuthChanges } from "../authState";
import logo from "../assets/logo.png";

export default function Navbar() {
    const [user, setUser] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        subscribeToAuthChanges((loggedUser) => {
            setUser(loggedUser);
        });
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        setMenuOpen(false);
        alert("Logged out successfully");
    };

    const closeMenu = () => setMenuOpen(false);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-black shadow-sm">
            <div className="container">

                {/* LOGO */}
                <Link
                    className="navbar-brand fw-bold d-flex align-items-center gap-2"
                    to="/"
                    onClick={closeMenu}
                >
                    <img
                        src={logo}
                        alt="ResumeCraft AI Logo"
                        style={{ height: "32px", width: "32px" }}
                    />
                    ResumeCraft AI
                </Link>

                {/* HAMBURGER BUTTON */}
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* MENU */}
                <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                        <li className="nav-item">
                            <Link className="nav-link" to="/" onClick={closeMenu}>
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
                                    <button
                                        className="btn btn-outline-danger ms-lg-3 mt-2 mt-lg-0"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}

                        {!user && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/signup" onClick={closeMenu}>
                                        Sign Up
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link" to="/login" onClick={closeMenu}>
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
