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

                {/* HAMBURGER */}
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* MENU WITH ANIMATION */}
                <div
                    className={`navbar-collapse-wrapper ${menuOpen ? "open" : ""}`}
                >
                    <ul className="navbar-nav ms-auto text-center text-lg-start">

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
                                        className="btn btn-outline-danger mt-2 mt-lg-0 ms-lg-3"
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

            {/* INLINE CSS FOR SMOOTH ANIMATION */}
            <style>{`
                .navbar-collapse-wrapper {
                    overflow: hidden;
                    max-height: 0;
                    opacity: 0;
                    transform: translateY(-10px);
                    transition: all 0.4s ease;
                }

                .navbar-collapse-wrapper.open {
                    max-height: 400px;
                    opacity: 1;
                    transform: translateY(0);
                }

                @media (min-width: 992px) {
                    .navbar-collapse-wrapper {
                        max-height: none;
                        opacity: 1;
                        transform: none;
                        display: flex !important;
                        justify-content: flex-end;
                    }
                }
            `}</style>
        </nav>
    );
}
