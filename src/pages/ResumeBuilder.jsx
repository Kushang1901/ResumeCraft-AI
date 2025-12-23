import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function ResumeBuilder() {
    const navigate = useNavigate();

    /* ---------- YEARS LIST ---------- */
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let y = currentYear; y >= 1980; y--) {
        years.push(y);
    }

    /* ---------- FORM STATE ---------- */
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",

        professionalSummary: "",   // ✅ ADD THIS

        graduation: {
            course: "",
            startYear: "",
            endYear: ""
        },

        hasPostGraduation: false,

        postGraduation: {
            course: "",
            startYear: "",
            endYear: ""
        },

        projects: "",
        experience: "",
        skills: ""
    });


    /* ---------- BASIC HANDLER ---------- */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    
   


    /* ---------- SUBMIT ---------- */
    const handleSubmit = (e) => {
        

        e.preventDefault();

        // Save resume data for preview
        sessionStorage.setItem("resumeData", JSON.stringify(formData));

        const prompt = `
Create a professional resume.

Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}

Professional Summary (user input):
${formData.professionalSummary || "Generate a strong professional summary"}

Graduation:
${formData.graduation.course}
${formData.graduation.startYear} - ${formData.graduation.endYear}

Post Graduation:
${formData.hasPostGraduation
                ? `${formData.postGraduation.course} (${formData.postGraduation.startYear} - ${formData.postGraduation.endYear})`
                : "Not Applicable"
            }

Projects:
${formData.projects}

Experience:
${formData.experience}

Skills:
${formData.skills}
`;

        fetch("http://localhost:5000/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt })
        })
            .then(res => res.json())
            .then(data => {
                sessionStorage.setItem("aiOutput", data.result);
                navigate("/preview");
            })
            .catch(() => alert("AI generation failed"));
    };



    return (
        
        <div className="bg-dark text-white min-vh-100">
            <Navbar />

            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-lg-9">

                        <div className="bg-black border border-secondary p-5 rounded shadow">
                            <h1 className="fw-bold text-center mb-4">
                                Build Your Resume
                            </h1>

                            <form onSubmit={handleSubmit}>

                                {/* FULL NAME */}
                                <div className="mb-4">
                                    <label className="form-label">Full Name</label>
                                    <input
                                        className="form-control bg-dark text-white border-secondary"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* EMAIL & PHONE */}
                                <div className="row mb-4">
                                    <div className="col-md-6">
                                        <label className="form-label">Email</label>
                                        <input
                                            type="email"
                                            className="form-control bg-dark text-white border-secondary"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Phone</label>
                                        <input
                                            className="form-control bg-dark text-white border-secondary"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* PROFESSIONAL SUMMARY */}
                                <div className="mb-4">
                                    <label className="form-label fw-semibold">
                                        Professional Summary
                                    </label>

                                    <textarea
                                        className="form-control bg-dark text-white border-secondary"
                                        rows="4"
                                        name="professionalSummary"
                                        value={formData.professionalSummary}
                                        onChange={handleChange}
                                        placeholder="Brief summary about yourself, career goals, strengths, or let AI improve it"
                                    />

                                    <small className="text-white-50">
                                        Optional — AI will enhance this summary in the resume
                                    </small>
                                </div>


                                {/* GRADUATION */}
                                <h5 className="mt-4 mb-3">Graduation (Required)</h5>

                                <input
                                    className="form-control bg-dark text-white border-secondary mb-3"
                                    placeholder="Course (e.g. B.Sc Computer Science)"
                                    value={formData.graduation.course}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            graduation: { ...formData.graduation, course: e.target.value }
                                        })
                                    }
                                    required
                                />

                                <div className="row mb-4">
                                    <div className="col-md-6">
                                        <select
                                            className="form-select bg-dark text-white border-secondary"
                                            value={formData.graduation.startYear}
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
                                    </div>
                                    <div className="col-md-6">
                                        <select
                                            className="form-select bg-dark text-white border-secondary"
                                            value={formData.graduation.endYear}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    graduation: { ...formData.graduation, endYear: e.target.value }
                                                })
                                            }
                                            required
                                        >
                                            <option value="">Completed Year</option>
                                            {years.map(y => <option key={y}>{y}</option>)}
                                        </select>
                                    </div>
                                </div>

                                {/* POST GRADUATION TOGGLE */}
                                <div className="form-check mb-3">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={formData.hasPostGraduation}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                hasPostGraduation: e.target.checked
                                            })
                                        }
                                    />
                                    <label className="form-check-label">
                                        I have Post-Graduation
                                    </label>
                                </div>

                                {/* POST GRADUATION (OPTIONAL) */}
                                {formData.hasPostGraduation && (
                                    <>
                                        <input
                                            className="form-control bg-dark text-white border-secondary mb-3"
                                            placeholder="PG Course (e.g. M.Sc Computer Science)"
                                            value={formData.postGraduation.course}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    postGraduation: {
                                                        ...formData.postGraduation,
                                                        course: e.target.value
                                                    }
                                                })
                                            }
                                        />

                                        <div className="row mb-4">
                                            <div className="col-md-6">
                                                <select
                                                    className="form-select bg-dark text-white border-secondary"
                                                    value={formData.postGraduation.startYear}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            postGraduation: {
                                                                ...formData.postGraduation,
                                                                startYear: e.target.value
                                                            }
                                                        })
                                                    }
                                                >
                                                    <option value="">Opted Year</option>
                                                    {years.map(y => <option key={y}>{y}</option>)}
                                                </select>
                                            </div>
                                            <div className="col-md-6">
                                                <select
                                                    className="form-select bg-dark text-white border-secondary"
                                                    value={formData.postGraduation.endYear}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            postGraduation: {
                                                                ...formData.postGraduation,
                                                                endYear: e.target.value
                                                            }
                                                        })
                                                    }
                                                >
                                                    <option value="">Completed Year</option>
                                                    {years.map(y => <option key={y}>{y}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {/* PROJECTS */}
                                <div className="mb-4">
                                    <label className="form-label">Projects</label>
                                    <textarea
                                        className="form-control bg-dark text-white border-secondary"
                                        rows="4"
                                        name="projects"
                                        value={formData.projects}
                                        onChange={handleChange}
                                        placeholder="Project name – short description"
                                    />
                                </div>

                                {/* EXPERIENCE */}
                                <div className="mb-4">
                                    <label className="form-label">Experience</label>
                                    <textarea
                                        className="form-control bg-dark text-white border-secondary"
                                        rows="4"
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* SKILLS */}
                                <div className="mb-5">
                                    <label className="form-label">Skills</label>
                                    <input
                                        className="form-control bg-dark text-white border-secondary"
                                        name="skills"
                                        value={formData.skills}
                                        onChange={handleChange}
                                        placeholder="JavaScript, React, Node.js"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 py-3 fw-semibold"
                                >
                                    Generate Resume
                                </button>

                            </form>
                        </div>

                    </div>
                </div>
            </div>
            </div>
       
    );
}
