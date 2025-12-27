import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faUserPlus } from '@fortawesome/free-solid-svg-icons'; 




export default function Preview() {
    const [resumeData, setResumeData] = useState(null);
    const [aiOutput, setAiOutput] = useState("");

    useEffect(() => {
        const savedData = sessionStorage.getItem("resumeData");
        const savedAI = sessionStorage.getItem("aiOutput");

        if (savedData) setResumeData(JSON.parse(savedData));
        if (savedAI && savedAI !== "undefined") setAiOutput(savedAI);
    }, []);

    const handleEdit = () => {
        window.location.href = "/builder";
    };

    const handleDownload = async () => {
        const resume = document.getElementById("resume-preview");
        if (!resume) return;

        const canvas = await html2canvas(resume, {
            scale: 2,
            useCORS: true
        });

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("Resume.pdf");
    };

    if (!resumeData) {
        return (
            <div className="bg-dark text-white min-vh-100 d-flex align-items-center justify-content-center">
                <Navbar />
                <h3>No resume data found</h3>
            </div>
        );
    }

    const skillsArray = resumeData.skills
        ? resumeData.skills.split(",").map(s => s.trim())
        : [];

    return (
        <div className="bg-dark text-white min-vh-100">
            <Navbar />

            <div className="container py-5">
                <div className="d-flex justify-content-end gap-3 mb-4 no-print">
                    <button onClick={handleEdit} className="btn btn-outline-light">
                        ✏️ Edit
                    </button>
                    <button onClick={handleDownload} className="btn btn-primary">
                        📄 Download PDF
                    </button>
                </div>

                <div
                    id="resume-preview"
                    className="bg-white text-dark p-5"
                    style={{
                        borderRadius: "12px",
                        boxShadow: "0 8px 30px rgba(0,0,0,0.5)"
                    }}
                >
                    {/* HEADER */}
                    <div className="text-center mb-4 pb-4" style={{ borderBottom: "3px solid #0d6efd" }}>
                        <h1 className="fw-bold">{resumeData.fullName}</h1>
                        <p className="text-muted">
                            <FontAwesomeIcon icon={faUserPlus} /> {resumeData.email}
                            &nbsp; | &nbsp;
                            <FontAwesomeIcon icon={faUserPlus} /> {resumeData.phone}
                        </p>

                    </div>

                    {/* AI OUTPUT */}
                    {aiOutput && aiOutput !== "undefined" ? (
                        <div style={{ whiteSpace: "pre-line", lineHeight: "1.8" }}>
                            {aiOutput}
                        </div>
                    ) : (
                        <>
                            {/* PROFESSIONAL SUMMARY */}
                            {resumeData.professionalSummary && (
                                <section className="mb-4">
                                    <h5 className="fw-bold text-primary">PROFESSIONAL SUMMARY</h5>
                                    <p>{resumeData.professionalSummary}</p>
                                </section>
                            )}

                            {/* EDUCATION */}
                            <section className="mb-4">
                                <h5 className="fw-bold text-primary">EDUCATION</h5>
                                <p>
                                    <strong>{resumeData.graduation.course}</strong><br />
                                    {resumeData.graduation.startYear} - {resumeData.graduation.endYear}
                                </p>

                                {resumeData.hasPostGraduation && (
                                    <p>
                                        <strong>{resumeData.postGraduation.course}</strong><br />
                                        {resumeData.postGraduation.startYear} - {resumeData.postGraduation.endYear}
                                    </p>
                                )}

                                {resumeData.hasPhd && (
                                    <p>
                                        <strong>{resumeData.phd.course}</strong><br />
                                        {resumeData.phd.startYear} - {resumeData.phd.endYear}
                                    </p>
                                )}
                            </section>

                            {/* PROJECTS */}
                            {resumeData.projects && (
                                <section className="mb-4">
                                    <h5 className="fw-bold text-primary">PROJECTS</h5>
                                    <p style={{ whiteSpace: "pre-line" }}>{resumeData.projects}</p>
                                </section>
                            )}

                            {/* EXPERIENCE */}
                            {resumeData.experience && (
                                <section className="mb-4">
                                    <h5 className="fw-bold text-primary">EXPERIENCE</h5>
                                    <p style={{ whiteSpace: "pre-line" }}>{resumeData.experience}</p>
                                </section>
                            )}

                            {/* SKILLS */}
                            {skillsArray.length > 0 && (
                                <section>
                                    <h5 className="fw-bold text-primary">SKILLS</h5>
                                    <div className="d-flex flex-wrap gap-2">
                                        {skillsArray.map((skill, i) => (
                                            <span key={i} className="badge bg-primary">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </>
                    )}
                </div>
            </div>

            <style>{`
                @media print {
                    .no-print {
                        display: none !important;
                    }
                }
            `}</style>
        </div>
    );
}
