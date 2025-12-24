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

    return (
        <>
            {/* TOP NAVBAR */}
            <nav className="navbar navbar-dark bg-black shadow-sm fixed-top">
                <div className="container d-flex justify-content-between align-items-center">

                    {/* LOGO */}
                    <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
                        <img
                            src={logo}
                            alt="ResumeCraft AI Logo"
                            style={{ height: "32px", width: "32px" }}
                        />
                        ResumeCraft AI
                    </Link>

                    {/* HAMBURGER (FIXED TOP-RIGHT) */}
                    <button
                        className="btn text-white fs-3 d-lg-none"
                        onClick={() => setMenuOpen(true)}
                        aria-label="Open menu"
                    >
                        ☰
                    </button>

                    {/* DESKTOP MENU */}
                    <div className="d-none d-lg-flex align-items-center gap-4">
                        <Link className="nav-link text-white" to="/">Home</Link>

                        {user ? (
                            <>
                                <span className="text-info fw-bold">
                                    {user.displayName || user.email}
                                </span>
                                <button
                                    className="btn btn-outline-danger"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link className="nav-link text-white" to="/signup">Sign Up</Link>
                                <Link className="nav-link text-white" to="/login">Login</Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* MOBILE FULLSCREEN MENU */}
            {menuOpen && (
                <div className="mobile-menu-overlay">
                    <button
                        className="close-btn"
                        onClick={() => setMenuOpen(false)}
                        aria-label="Close menu"
                    >
                        ✕
                    </button>

                    <div className="mobile-menu-content">
                        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>

                        {user ? (
                            <>
                                <span className="user-name">
                                    {user.displayName || user.email}
                                </span>
                                <button className="btn btn-outline-danger mt-3" onClick={handleLogout}>
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/signup" onClick={() => setMenuOpen(false)}>Sign Up</Link>
                                <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* STYLES */}
            <style>{`
                body {
                    padding-top: 70px;
                }

                .mobile-menu-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.95);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 2000;
                    animation: fadeIn 0.3s ease;
                }

                .mobile-menu-content {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 24px;
                    font-size: 1.5rem;
                    animation: scaleIn 0.35s ease;
                }

                .mobile-menu-content a {
                    color: white;
                    text-decoration: none;
                    font-weight: 600;
                }

                .mobile-menu-content a:hover {
                    color: #0dcaf0;
                }

                .user-name {
                    color: #0dcaf0;
                    font-weight: bold;
                    text-align: center;
                }

                .close-btn {
                    position: absolute;
                    top: 20px;
                    right: 24px;
                    font-size: 2rem;
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes scaleIn {
                    from {
                        opacity: 0;
                        transform: scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
            `}</style>
        </>
    );
}
