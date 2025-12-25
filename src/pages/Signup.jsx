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

    // ✅ async function — await allowed here
    const handleGoogleSignup = async () => {
        try {
            const recaptchaToken = await getRecaptchaToken("SIGNUP");

            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            await fetch(`${process.env.REACT_APP_API_URL}/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName: user.displayName?.split(" ")[0] || "",
                    lastName: user.displayName?.split(" ")[1] || "",
                    email: user.email,
                    provider: "google",
                    recaptchaToken
                })
            });

            navigate("/builder");

        } catch (err) {
            alert("Signup failed");
        }
    };

    return (
        <div className="bg-dark text-white min-vh-100">
            <Navbar />

            <div className="container py-5">
                <div className="text-center mb-4">
                    <h2>Create your account</h2>
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
