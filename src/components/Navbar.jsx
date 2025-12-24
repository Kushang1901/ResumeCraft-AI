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
      {/* NAVBAR */}
      <nav className="bg-white shadow-md fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* LOGO */}
            <Link to="/" className="flex items-center space-x-2 group">
              <img 
                src={logo} 
                alt="Logo" 
                className="h-10 w-10 transition-transform group-hover:scale-110"
              />
              <span className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                ResumeCraft AI
              </span>
            </Link>

            {/* DESKTOP MENU */}
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Home
              </Link>
              
              {user ? (
                <>
                  <span className="text-gray-600 text-sm">
                    {user.displayName || user.email}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  >
                    Sign Up
                  </Link>
                  <Link
                    to="/login"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>

            {/* HAMBURGER BUTTON */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-gray-700 hover:text-blue-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {menuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen ? "max-h-96" : "max-h-0"
          }`}
        >
          <div className="px-4 pt-2 pb-4 space-y-3 bg-gray-50 border-t">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors"
            >
              Home
            </Link>
            
            {user ? (
              <>
                <div className="text-gray-600 text-sm py-2 border-t">
                  {user.displayName || user.email}
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="block text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors"
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-center transition-colors"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* SPACER */}
      <div className="h-16"></div>
    </>
  );
}
