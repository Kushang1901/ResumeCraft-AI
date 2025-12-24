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
        alert("Logged out successfully");
    };

    return (
        <>
            {/* NAVBAR */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/50 backdrop-blur-lg shadow-2xl">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

                    {/* LOGO */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="relative">
                            <img
                                src={logo}
                                alt="Logo"
                                className="h-11 w-11 transform group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                        </div>
                        <span className="text-white font-bold text-xl tracking-tight">
                            ResumeCraft <span className="text-blue-400">AI</span>
                        </span>
                    </Link>

                    {/* DESKTOP MENU */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link
                            to="/"
                            className="relative text-gray-300 hover:text-white transition-colors text-sm font-medium group"
                        >
                            Home
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                        </Link>

                        {user ? (
                            <>
                                <div className="flex items-center gap-3 px-4 py-2 bg-slate-800/50 rounded-full border border-slate-700/50">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
                                        {(user.displayName || user.email || 'U')[0].toUpperCase()}
                                    </div>
                                    <span className="text-gray-300 text-sm max-w-[150px] truncate">
                                        {user.displayName || user.email}
                                    </span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="px-5 py-2.5 text-sm rounded-lg bg-red-500/10 border border-red-500/50 text-red-400 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300 font-medium"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/signup"
                                    className="relative text-gray-300 hover:text-white transition-colors text-sm font-medium group"
                                >
                                    Sign Up
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                                </Link>
                                <Link
                                    to="/login"
                                    className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white text-sm font-medium transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
                                >
                                    Login
                                </Link>
                            </>
                        )}
                    </div>

                    {/* HAMBURGER BUTTON */}
                    <button
                        className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700/50 transition-all duration-300"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle Menu"
                    >
                        <div className="w-5 h-4 flex flex-col justify-between">
                            <span
                                className={`block h-0.5 w-full bg-white rounded-full transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''
                                    }`}
                            ></span>
                            <span
                                className={`block h-0.5 w-full bg-white rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'
                                    }`}
                            ></span>
                            <span
                                className={`block h-0.5 w-full bg-white rounded-full transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''
                                    }`}
                            ></span>
                        </div>
                    </button>
                </div>

                {/* MOBILE MENU */}
                <div
                    className={`md:hidden fixed left-0 right-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 backdrop-blur-2xl transition-all duration-500 ease-in-out border-b border-slate-700/50 ${menuOpen
                            ? "opacity-100 visible max-h-screen"
                            : "opacity-0 invisible max-h-0 overflow-hidden"
                        }`}
                    style={{ top: '80px' }}
                >
                    <div className="flex flex-col items-center py-8 gap-6">

                        <Link
                            to="/"
                            onClick={() => setMenuOpen(false)}
                            className="text-white text-2xl font-bold hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 transition-all duration-300"
                        >
                            Home
                        </Link>

                        {user ? (
                            <>
                                <div className="flex items-center gap-3 px-6 py-3 bg-slate-800/50 rounded-full border border-slate-700/50">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                                        {(user.displayName || user.email || 'U')[0].toUpperCase()}
                                    </div>
                                    <span className="text-gray-300 text-base">
                                        {user.displayName || user.email}
                                    </span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="px-8 py-3 rounded-xl bg-red-500/10 border-2 border-red-500/50 text-red-400 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300 font-medium text-lg"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/signup"
                                    onClick={() => setMenuOpen(false)}
                                    className="text-white text-2xl font-bold hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 transition-all duration-300"
                                >
                                    Sign Up
                                </Link>
                                <Link
                                    to="/login"
                                    onClick={() => setMenuOpen(false)}
                                    className="px-10 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white text-lg font-medium transition-all duration-300 shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50"
                                >
                                    Login
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* SPACER to prevent content from hiding under fixed navbar */}
            <div className="h-20" />
        </>
    );
}