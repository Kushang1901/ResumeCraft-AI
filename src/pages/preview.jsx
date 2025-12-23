import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Preview() {
    const [resumeData, setResumeData] = useState(null);
    const [aiOutput, setAiOutput] = useState("");

    useEffect(() => {
        const savedData = sessionStorage.getItem("resumeData");
        const savedAI = sessionStorage.getItem("aiOutput");

        if (savedData) {
            setResumeData(JSON.parse(savedData));
        }
        if (savedAI) {
            setAiOutput(savedAI);
        }
    }, []);

    const handleEdit = () => {
        window.location.href = "/builder";
    };

    const handleDownload = async () => {
        const resumeSection = document.getElementById("resume-preview");
        if (!resumeSection) return;

        const canvas = await html2canvas(resumeSection, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("Resume.pdf");
    };
    const userSummary = resumeData?.professionalSummary;


    if (!resumeData) {
        return (
            <div className="bg-dark text-white min-vh-100 d-flex align-items-center justify-content-center">
                <div className="text-center">
                    <h2>No resume data available</h2>
                    <button onClick={handleEdit} className="btn btn-primary mt-3">
                        Go to Builder
                    </button>
                </div>
            </div>
        );
    }

    const skillsArray = resumeData.skills
        ? resumeData.skills.split(",").map(skill => skill.trim())
        : [];

    return (
        <div className="bg-dark text-white min-vh-100">
            <Navbar />

            <div className="container py-5">

                {/* ACTION BUTTONS */}
                <div className="d-flex justify-content-end gap-3 mb-4">
                    <button className="btn btn-outline-light" onClick={handleEdit}>
                        Edit Resume
                    </button>
                    <button className="btn btn-primary" onClick={handleDownload}>
                        Download PDF
                    </button>
                </div>

                {/* RESUME PREVIEW */}
                <div
                    id="resume-preview"
                    className="bg-white text-dark p-5 rounded shadow"
                >

                    {/* HEADER */}
                    <div className="mb-4 border-bottom pb-3 text-center">
                        <h1 className="fw-bold">{resumeData.fullName}</h1>
                        <p className="mb-0">
                            {resumeData.email} | {resumeData.phone}
                        </p>
                    </div>

                    {/* PROFESSIONAL SUMMARY */}
                    {(aiOutput || userSummary) && (
                        <div className="mb-4">
                            <h3 className="fw-bold border-bottom pb-2">
                                Professional Summary
                            </h3>

                            <p style={{ whiteSpace: "pre-line" }}>
                                {aiOutput && aiOutput !== "undefined"
                                    ? aiOutput
                                    : userSummary}
                            </p>
                        </div>
                    )}


                    {/* EDUCATION */}
                    <div className="mb-4">
                        <h3 className="fw-bold border-bottom pb-2">Education</h3>

                        <h5 className="mt-3">Graduation</h5>
                        <p className="mb-1">
                            {resumeData.graduation?.course}
                        </p>
                        <p className="text-muted">
                            {resumeData.graduation?.startYear} – {resumeData.graduation?.endYear}
                        </p>

                        {resumeData.hasPostGraduation && (
                            <>
                                <h5 className="mt-3">Post Graduation</h5>
                                <p className="mb-1">
                                    {resumeData.postGraduation?.course}
                                </p>
                                <p className="text-muted">
                                    {resumeData.postGraduation?.startYear} – {resumeData.postGraduation?.endYear}
                                </p>
                            </>
                        )}
                    </div>

                    {/* PROJECTS */}
                    {resumeData.projects && (
                        <div className="mb-4">
                            <h3 className="fw-bold border-bottom pb-2">Projects</h3>
                            <p style={{ whiteSpace: "pre-line" }}>
                                {resumeData.projects}
                            </p>
                        </div>
                    )}

                    {/* EXPERIENCE */}
                    <div className="mb-4">
                        <h3 className="fw-bold border-bottom pb-2">Experience</h3>
                        <p style={{ whiteSpace: "pre-line" }}>
                            {resumeData.experience}
                        </p>
                    </div>

                    {/* SKILLS */}
                    <div className="mb-3">
                        <h3 className="fw-bold border-bottom pb-2">Skills</h3>
                        <div className="d-flex flex-wrap gap-2">
                            {skillsArray.map((skill, index) => (
                                <span
                                    key={index}
                                    className="badge bg-primary px-3 py-2"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <footer className="bg-black border-top border-secondary py-4">
                <div className="container text-center text-white-50">
                    <p className="mb-1">&copy; 2025 ResumeCraft AI</p>
                    <p className="mb-0">
                        Designed &amp; Developed by{" "}
                        <a
                            href="https://kushangacharya.vercel.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-info text-decoration-none fw-semibold"
                        >
                            Kushang Acharya
                        </a>
                    </p>
                </div>
            </footer>
        </div>
    );
}
