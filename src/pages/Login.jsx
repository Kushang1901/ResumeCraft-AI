import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { getRecaptchaToken } from "../utils/recaptcha";


export default function Login() {
    const navigate = useNavigate();
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
  


    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // EMAIL LOGIN
    const handleEmailLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, formData.email, formData.password);

            alert("Login successful!");
            navigate("/");

        } catch (error) {
            alert(error.message);
        }
    };

    // GOOGLE LOGIN
    const handleGoogleLogin = async () => {
        try {
            const recaptchaToken = await getRecaptchaToken("LOGIN");

            const result = await signInWithPopup(auth, googleProvider);

            await fetch(`${process.env.REACT_APP_API_URL}/login`, {

                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName: result.user.displayName?.split(" ")[0] || "",
                    lastName: result.user.displayName?.split(" ")[1] || "",
                    email: result.user.email,
                    provider: "google",
                    recaptchaToken
                })
            });

            navigate("/");
        } catch (error) {
            alert("Google login failed");
            console.error(error);
        }
    };


    return (
        <div className="bg-dark text-white min-vh-100">
            <Navbar />

            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-lg-5">

                        <h1 className="text-center fw-bold mb-4">Login</h1>

                        <button
                            className="btn btn-danger w-100 py-3 mb-4 fw-semibold"
                            onClick={handleGoogleLogin}
                        >
                            Login with Google
                        </button>

                        <p className="text-center text-white-50">or login using email</p>

                        <form onSubmit={handleEmailLogin}>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input type="email" className="form-control" name="email" onChange={handleChange} required />
                            </div>

                            <div className="mb-4">
                                <label className="form-label">Password</label>
                                <input type="password" className="form-control" name="password" onChange={handleChange} required />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary w-100 py-3 fw-semibold"
                            >
                                Login
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
