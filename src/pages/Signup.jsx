import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { getRecaptchaToken } from "../utils/recaptcha";
import Navbar from "../components/Navbar";

export default function Signup() {
    const navigate = useNavigate();
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: ""
    });

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    // ✅ UPDATED GOOGLE SIGNUP HANDLER
    const handleGoogleSignup = async () => {
        try {
            const recaptchaToken = await getRecaptchaToken("SIGNUP");

            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/signup`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        firstName: user.displayName?.split(" ")[0] || "",
                        lastName: user.displayName?.split(" ").slice(1).join(" ") || "",
                        email: user.email,
                        provider: "google",
                        recaptchaToken
                    })
                }
            );

            const data = await response.json();

            // 🔴 ALREADY REGISTERED USER
            if (!data.isNewUser) {
                alert("You already have an account. Please login.");
                navigate("/login");
                return;
            }

            // 🟢 NEW USER
            navigate("/builder");

        } catch (err) {
            console.error(err);
            alert("Signup failed. Please try again.");
        }
    };

    return (
        <div className="bg-dark text-white min-vh-100">
            <Navbar />

            <div className="container py-5">
                <div className="text-center mb-4">
                    <h2>Create your account</h2>
                    <p className="text-white-50">
                        Sign up to start building professional resumes
                    </p>
                </div>

                <div className="text-center">
                    <button
                        onClick={handleGoogleSignup}
                        className="btn btn-primary px-5 py-3"
                    >
                        Sign up with Google
                    </button>
                </div>
            </div>
        </div>
    );
}
