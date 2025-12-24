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
        const unsub = subscribeToAuthChanges((loggedUser) => {
            setUser(loggedUser);
        });
        return () => unsub && unsub();
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        setMenuOpen(false);
    };

    return (
        <>
            {/* NAVBAR */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-black border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

                    {/* LOGO */}
                    <Link to="/" className="flex items-center gap-2">
                        <img src={logo} alt="Logo" className="h-8 w-8" />
                        <span className="text-white font-semibold text-lg">
                            ResumeCraft AI
                        </span>
                    </Link>

                    {/* DESKTOP MENU */}
                    <div className="hidden md:flex items-center gap-8">
                        <NavLink to="/">Home</NavLink>

                        {user ? (
                            <>
                                <span className="text-gray-400 text-sm max-w-[180px] truncate">
                                    {user.displayName || user.email}
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 text-sm rounded-md border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <NavLink to="/signup">Sign Up</NavLink>
                                <Link
                                    to="/login"
                                    className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm transition"
                                >
                                    Login
                                </Link>
                            </>
                        )}
                    </div>

                    {/* HAMBURGER */}
                    <button
                        className="md:hidden text-white"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle Menu"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            {menuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* MOBILE MENU */}
                <div
                    className={`md:hidden fixed inset-0 bg-black/95 backdrop-blur-sm transition-all duration-300 ${
                        menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                >
                    <div className="h-full flex flex-col items-center justify-center gap-8 text-lg">

                        <MobileLink to="/" onClick={() => setMenuOpen(false)}>
                            Home
                        </MobileLink>

                        {user ? (
                            <>
                                <span className="text-gray-400 text-sm px-6 text-center">
                                    {user.displayName || user.email}
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="px-6 py-3 rounded-md border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <MobileLink to="/signup" onClick={() => setMenuOpen(false)}>
                                    Sign Up
                                </MobileLink>
                                <MobileLink to="/login" onClick={() => setMenuOpen(false)}>
                                    Login
                                </MobileLink>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* SPACER */}
            <div className="h-16" />
        </>
    );
}

/* ---------- Helper Components ---------- */

function NavLink({ to, children }) {
    return (
        <Link
            to={to}
            className="text-gray-300 hover:text-white transition text-sm"
        >
            {children}
        </Link>
    );
}

function MobileLink({ to, children, onClick }) {
    return (
        <Link
            to={to}
            onClick={onClick}
            className="text-white text-2xl font-medium hover:text-blue-500 transition"
        >
            {children}
        </Link>
    );
}
