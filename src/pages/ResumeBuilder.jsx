import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getRecaptchaToken } from "../utils/recaptcha";

export default function ResumeBuilder() {
    const navigate = useNavigate();

    /* ================= YEARS ================= */
    const MAX_YEAR = 2028;
    const MIN_YEAR = 1980;

    const getYears = (startFrom = MAX_YEAR) =>
        Array.from(
            { length: startFrom - MIN_YEAR + 1 },
            (_, i) => startFrom - i
        );

    /* ================= STATE ================= */
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        professionalSummary: "",

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

        hasPhd: false,
        phd: {
            course: "",
            startYear: "",
            endYear: ""
        },

        projects: "",
        experience: "",
        skills: ""
    });

    /* ================= HANDLERS ================= */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNestedChange = (section, field, value) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    /* ================= SUBMIT ================= */
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
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

    /* ================= UI ================= */
    return (
        <div className="bg-dark text-white min-vh-100">
            <Navbar />

            <div className="container py-5">
                <h2 className="mb-4">Build Your Resume</h2>

                <form onSubmit={handleSubmit} className="row g-4">

                    {/* BASIC INFO */}
                    <input className="form-control" placeholder="Full Name"
                        value={formData.fullName}
                        onChange={e => handleChange({ target: { name: "fullName", value: e.target.value } })}
                        required />

                    <input className="form-control" placeholder="Email"
                        value={formData.email}
                        onChange={e => handleChange({ target: { name: "email", value: e.target.value } })}
                        required />

                    <input className="form-control" placeholder="Phone"
                        value={formData.phone}
                        onChange={e => handleChange({ target: { name: "phone", value: e.target.value } })}
                        required />

                    <textarea className="form-control"
                        placeholder="Professional Summary"
                        rows="3"
                        value={formData.professionalSummary}
                        onChange={e => handleChange({ target: { name: "professionalSummary", value: e.target.value } })} />

                    {/* GRADUATION */}
                    <h4>Graduation</h4>
                    <input className="form-control" placeholder="Course"
                        value={formData.graduation.course}
                        onChange={e => handleNestedChange("graduation", "course", e.target.value)}
                        required />

                    <select className="form-select"
                        value={formData.graduation.startYear}
                        onChange={e => handleNestedChange("graduation", "startYear", e.target.value)}
                        required>
                        <option value="">Opted Year</option>
                        {getYears().map(y => <option key={y}>{y}</option>)}
                    </select>

                    <select className="form-select"
                        value={formData.graduation.endYear}
                        onChange={e => handleNestedChange("graduation", "endYear", e.target.value)}
                        required>
                        <option value="">Completed Year</option>
                        {formData.graduation.startYear &&
                            getYears(MAX_YEAR).filter(y => y > formData.graduation.startYear)
                                .map(y => <option key={y}>{y}</option>)}
                    </select>

                    {/* POST GRADUATION */}
                    <label>
                        <input type="checkbox"
                            checked={formData.hasPostGraduation}
                            onChange={e => setFormData(p => ({ ...p, hasPostGraduation: e.target.checked }))} /> Post Graduation
                    </label>

                    {formData.hasPostGraduation && (
                        <>
                            <input className="form-control" placeholder="PG Course"
                                value={formData.postGraduation.course}
                                onChange={e => handleNestedChange("postGraduation", "course", e.target.value)} />

                            <select className="form-select"
                                value={formData.postGraduation.startYear}
                                onChange={e => handleNestedChange("postGraduation", "startYear", e.target.value)}>
                                <option value="">Opted Year</option>
                                {getYears().map(y => <option key={y}>{y}</option>)}
                            </select>

                            <select className="form-select"
                                value={formData.postGraduation.endYear}
                                onChange={e => handleNestedChange("postGraduation", "endYear", e.target.value)}>
                                <option value="">Completed Year</option>
                                {formData.postGraduation.startYear &&
                                    getYears(MAX_YEAR).filter(y => y > formData.postGraduation.startYear)
                                        .map(y => <option key={y}>{y}</option>)}
                            </select>
                        </>
                    )}

                    {/* PHD */}
                    <label>
                        <input type="checkbox"
                            checked={formData.hasPhd}
                            onChange={e => setFormData(p => ({ ...p, hasPhd: e.target.checked }))} /> PhD
                    </label>

                    {formData.hasPhd && (
                        <>
                            <input className="form-control" placeholder="PhD Field"
                                value={formData.phd.course}
                                onChange={e => handleNestedChange("phd", "course", e.target.value)} />

                            <select className="form-select"
                                value={formData.phd.startYear}
                                onChange={e => handleNestedChange("phd", "startYear", e.target.value)}>
                                <option value="">Opted Year</option>
                                {getYears().map(y => <option key={y}>{y}</option>)}
                            </select>

                            <select className="form-select"
                                value={formData.phd.endYear}
                                onChange={e => handleNestedChange("phd", "endYear", e.target.value)}>
                                <option value="">Completed Year</option>
                                {formData.phd.startYear &&
                                    getYears(MAX_YEAR).filter(y => y > formData.phd.startYear)
                                        .map(y => <option key={y}>{y}</option>)}
                            </select>
                        </>
                    )}

                    {/* OTHER SECTIONS */}
                    <textarea className="form-control" placeholder="Projects" rows="3"
                        value={formData.projects}
                        onChange={e => handleChange({ target: { name: "projects", value: e.target.value } })} />

                    <textarea className="form-control" placeholder="Experience" rows="3"
                        value={formData.experience}
                        onChange={e => handleChange({ target: { name: "experience", value: e.target.value } })} />

                    <textarea className="form-control" placeholder="Skills (comma separated)"
                        value={formData.skills}
                        onChange={e => handleChange({ target: { name: "skills", value: e.target.value } })} />

                    <button type="submit" className="btn btn-primary py-3 mt-3">
                        Generate Resume
                    </button>
                </form>
            </div>
        </div>
    );
}
