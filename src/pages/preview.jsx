import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getRecaptchaToken } from "../utils/recaptcha";

export default function ResumeBuilder() {
    const navigate = useNavigate();

    const maxYear = 2028;
    const minYear = 1980;

    const years = [];
    for (let y = maxYear; y >= minYear; y--) years.push(y);

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

    // ✅ FIXED: async function
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // ✅ reCAPTCHA correctly used
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

            const res = await fetch(`${process.env.REACT_APP_API_URL}/generate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt, recaptchaToken })
            });

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
                <div className="bg-black border border-secondary p-5 rounded">

                    <h2 className="text-center mb-4">Build Your Resume</h2>

                    <form onSubmit={handleSubmit}>

                        <input
                            className="form-control mb-3"
                            placeholder="Full Name"
                            name="fullName"
                            onChange={handleChange}
                            required
                        />

                        <input
                            className="form-control mb-3"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                            required
                        />

                        <input
                            className="form-control mb-3"
                            placeholder="Phone"
                            name="phone"
                            onChange={handleChange}
                            required
                        />

                        <textarea
                            className="form-control mb-3"
                            rows="3"
                            name="professionalSummary"
                            placeholder="Professional Summary (optional)"
                            onChange={handleChange}
                        />

                        {/* GRADUATION */}
                        <h5>Graduation</h5>
                        <input
                            className="form-control mb-2"
                            placeholder="Course"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    graduation: { ...formData.graduation, course: e.target.value }
                                })
                            }
                            required
                        />

                        <select
                            className="form-select mb-3"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    graduation: { ...formData.graduation, startYear: e.target.value }
                                })
                            }
                            required
                        >
                            <option value="">Opted Year</option>
                            {years.map(y => <option key={y}>{y}</option>)}
                        </select>

                        <select
                            className="form-select mb-3"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    graduation: { ...formData.graduation, endYear: e.target.value }
                                })
                            }
                            required
                        >
                            <option value="">Completed Year</option>
                            {years
                                .filter(y => y > formData.graduation.startYear)
                                .map(y => <option key={y}>{y}</option>)}
                        </select>

                        <button className="btn btn-primary w-100 py-3">
                            Generate Resume
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
}
