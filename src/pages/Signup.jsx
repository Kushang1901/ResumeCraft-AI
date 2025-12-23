import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";

export default function Signup() {
    const navigate = useNavigate();
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // ----------------- EMAIL SIGN UP ---------------------
    const handleEmailSignup = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, formData.email, formData.password);

            await fetch("http://localhost:5000/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    provider: "email"
                })
            });

            alert("Signup successful!");
            navigate("/");

        } catch (error) {
            alert(error.message);
        }
    };

    // ----------------- GOOGLE SIGN UP ---------------------
    const handleGoogleSignup = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);

            await fetch(`${process.env.REACT_APP_API_URL}/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName: result.user.displayName.split(" ")[0],
                    lastName: result.user.displayName.split(" ").slice(1).join(" "),
                    email: result.user.email,
                    provider: "google"
                })
            });

            alert("Google Signup successful!");
            navigate("/");

        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="bg-dark text-white min-vh-100">
            <Navbar />

            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-lg-5">

                        <h1 className="text-center fw-bold mb-4">Create Your Account</h1>

                        <button
                            className="btn btn-danger w-100 py-3 mb-4 fw-semibold"
                            onClick={handleGoogleSignup}
                        >
                            Sign up with Google
                        </button>

                        <p className="text-center text-white-50">or sign up using email</p>

                        <form onSubmit={handleEmailSignup}>
                            <div className="mb-3">
                                <label className="form-label">First Name</label>
                                <input type="text" className="form-control" name="firstName" onChange={handleChange} required />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Last Name</label>
                                <input type="text" className="form-control" name="lastName" onChange={handleChange} required />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input type="email" className="form-control" name="email" onChange={handleChange} required />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input type="password" className="form-control" name="password" onChange={handleChange} required />
                            </div>

                            <div className="mb-4">
                                <label className="form-label">Confirm Password</label>
                                <input type="password" className="form-control" name="confirmPassword" onChange={handleChange} required />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary w-100 py-3 fw-semibold"
                            >
                                Sign Up
                            </button>

                        </form>

                    </div>
                </div>
            </div>

            <footer className="bg-black border-top border-secondary py-4">
                <div className="container">
                    <div className="text-center text-white-50">
                        <p className="mb-1">
                            &copy; 2025 ResumeCraft AI. All rights reserved.
                        </p>
                        <p className="mb-0">
                            Designed &amp; Developed by{" "}
                            <a
                                href="https://kushangacharya.vercel.app"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-info fw-semibold text-decoration-none"
                            >
                                Kushang Acharya
                            </a>
                        </p>
                    </div>
                </div>
            </footer>

        </div>
    );
}
