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
                        <NavLink to="/">Home</NavLink>

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
                                <NavLink to="/signup">Sign Up</NavLink>
                                <Link
                                    to="/login"
                                    className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white text-sm font-medium transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
                                >
                                    Login
                                </Link>
                            </>
                        )}
                    </div>

                    {/* HAMBURGER */}
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
                    className={`md:hidden fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 backdrop-blur-2xl transition-all duration-500 ease-in-out ${menuOpen ? "opacity-100 visible translate-x-0" : "opacity-0 invisible translate-x-full"
                        }`}
                    style={{ top: '80px' }}
                >
                    <div className="h-full flex flex-col items-center justify-center gap-8 p-8">

                        <MobileLink to="/" onClick={() => setMenuOpen(false)} delay="0">
                            Home
                        </MobileLink>

                        {user ? (
                            <>
                                <div className={`flex items-center gap-3 px-6 py-3 bg-slate-800/50 rounded-full border border-slate-700/50 transition-all duration-500 ${menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                    }`} style={{ transitionDelay: '100ms' }}>
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                                        {(user.displayName || user.email || 'U')[0].toUpperCase()}
                                    </div>
                                    <span className="text-gray-300 text-base">
                                        {user.displayName || user.email}
                                    </span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className={`px-8 py-4 rounded-xl bg-red-500/10 border-2 border-red-500/50 text-red-400 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300 font-medium text-lg ${menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                        }`}
                                    style={{ transitionDelay: '200ms' }}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <MobileLink to="/signup" onClick={() => setMenuOpen(false)} delay="100">
                                    Sign Up
                                </MobileLink>
                                <Link
                                    to="/login"
                                    onClick={() => setMenuOpen(false)}
                                    className={`px-10 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white text-lg font-medium transition-all duration-300 shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 ${menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                        }`}
                                    style={{ transitionDelay: '200ms' }}
                                >
                                    Login
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* SPACER */}
            <div className="h-20" />
        </>
    );
}

/* ---------- Helper Components ---------- */

function NavLink({ to, children }) {
    return (
        <Link
            to={to}
            className="relative text-gray-300 hover:text-white transition-colors text-sm font-medium group"
        >
            {children}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
        </Link>
    );
}

function MobileLink({ to, children, onClick, delay }) {
    return (
        <Link
            to={to}
            onClick={onClick}
            className="text-white text-3xl font-bold hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 transition-all duration-300 transform hover:scale-110"
            style={{
                opacity: 0,
                transform: 'translateY(20px)',
                animation: 'slideIn 0.5s ease-out forwards',
                animationDelay: delay + 'ms'
            }}
        >
            {children}
            <style jsx>{`
                @keyframes slideIn {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </Link>
    );
}