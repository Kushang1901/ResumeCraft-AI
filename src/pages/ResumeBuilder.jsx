import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getRecaptchaToken } from "../utils/recaptcha";

export default function ResumeBuilder() {
    const navigate = useNavigate();

    const maxYear = 2028;
    const minYear = 1980;
    const years = Array.from(
        { length: maxYear - minYear + 1 },
        (_, i) => maxYear - i
    );

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        professionalSummary: "",
        graduation: { course: "", startYear: "", endYear: "" },
        hasPostGraduation: false,
        postGraduation: { course: "", startYear: "", endYear: "" },
        hasPhd: false,
        phd: { course: "", startYear: "", endYear: "" },
        projects: "",
        experience: "",
        skills: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // ✅ reCAPTCHA must be here
            const recaptchaToken = await getRecaptchaToken("GENERATE_RESUME");

            sessionStorage.setItem("resumeData", JSON.stringify(formData));

            const prompt = `
Create a professional resume.

Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}

Professional Summary:
${formData.professionalSummary || "Generate a strong summary"}

Graduation:
${formData.graduation.course}
${formData.graduation.startYear} - ${formData.graduation.endYear}

Post Graduation:
${formData.hasPostGraduation
                    ? `${formData.postGraduation.course} (${formData.postGraduation.startYear} - ${formData.postGraduation.endYear})`
                    : "Not Applicable"}

PhD:
${formData.hasPhd
                    ? `${formData.phd.course} (${formData.phd.startYear} - ${formData.phd.endYear})`
                    : "Not Applicable"}

Projects:
${formData.projects}

Experience:
${formData.experience}

Skills:
${formData.skills}
`;

            const res = await fetch(
                `${process.env.REACT_APP_API_URL}/generate`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ prompt, recaptchaToken })
                }
            );

            const data = await res.json();
            sessionStorage.setItem("aiOutput", data.result);
            navigate("/preview");

        } catch (err) {
            alert("AI generation failed");
        }
    };

    return (
        <div className="bg-dark text-white min-vh-100">
            <Navbar />

            <div className="container py-5">
                <form onSubmit={handleSubmit}>
                    {/* FORM CONTENT UNCHANGED */}
                    <button type="submit" className="btn btn-primary w-100 py-3">
                        Generate Resume
                    </button>
                </form>
            </div>
        </div>
    );
}
