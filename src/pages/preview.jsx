import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../components/Navbar";

export default function Preview() {
    const [resumeData, setResumeData] = useState(null);
    const [aiOutput, setAiOutput] = useState(null);

    useEffect(() => {
        const savedData = sessionStorage.getItem('resumeData');
        const savedAiOutput = sessionStorage.getItem('aiOutput');

        if (savedData) {
            setResumeData(JSON.parse(savedData));
        }

        if (savedAiOutput) {
            setAiOutput(savedAiOutput);
        }
    }, []);

    const handleEdit = () => {
        window.location.href = '/builder';
    };

    const handleDownload = () => {
        window.print();
    };

    if (!resumeData) {
        return (
            <div className="bg-dark text-white min-vh-100 d-flex align-items-center justify-content-center">
                <Navbar />
                <div className="text-center">
                    <h2 className="display-6 mb-4">No resume data available.</h2>
                    <button
                        onClick={handleEdit}
                        className="btn btn-primary btn-lg px-5 py-3"
                        style={{
                            borderRadius: '8px',
                            boxShadow: '0 4px 15px rgba(13, 110, 253, 0.4)'
                        }}
                    >
                        Go to Builder
                    </button>
                </div>
            </div>
        );
    }

    const skillsArray = resumeData.skills ? resumeData.skills.split(',').map(s => s.trim()) : [];

    return (
        <div className="bg-dark text-white min-vh-100">
            <Navbar />

            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <div className="d-flex justify-content-end mb-4 gap-3 no-print">
                            <button
                                onClick={handleEdit}
                                className="btn btn-outline-light px-4 py-2"
                                style={{ borderRadius: '8px' }}
                            >
                                ← Edit Resume
                            </button>
                            <button
                                onClick={handleDownload}
                                className="btn btn-primary px-4 py-2"
                                style={{
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 15px rgba(13, 110, 253, 0.4)'
                                }}
                            >
                                📄 Download PDF
                            </button>
                        </div>

                        <div className="bg-white text-dark p-5" style={{
                            borderRadius: '12px',
                            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
                            minHeight: '1000px'
                        }}>
                            {/* HEADER */}
                            <div className="text-center mb-4 pb-4" style={{ borderBottom: '3px solid #0d6efd' }}>
                                <h1 className="display-4 fw-bold mb-3" style={{
                                    color: '#212529',
                                    letterSpacing: '-0.5px'
                                }}>
                                    {resumeData.fullName}
                                </h1>
                                <div className="d-flex justify-content-center gap-4 flex-wrap">
                                    <span className="text-muted">
                                        ✉️ {resumeData.email}
                                    </span>
                                    <span className="text-muted">
                                        📱 {resumeData.phone}
                                    </span>
                                </div>
                            </div>

                            {/* AI GENERATED OUTPUT OR SECTIONS */}
                            {aiOutput ? (
                                <div style={{
                                    whiteSpace: 'pre-wrap',
                                    lineHeight: '1.8',
                                    fontSize: '1rem'
                                }}>
                                    {aiOutput}
                                </div>
                            ) : (
                                <>
                                    {/* PROFESSIONAL SUMMARY */}
                                    {resumeData.professionalSummary && (
                                        <div className="mb-5">
                                            <h2 className="h4 fw-bold mb-3" style={{
                                                color: '#0d6efd',
                                                borderBottom: '2px solid #0d6efd',
                                                paddingBottom: '8px',
                                                display: 'inline-block'
                                            }}>
                                                PROFESSIONAL SUMMARY
                                            </h2>
                                            <p className="mt-3" style={{ lineHeight: '1.8', textAlign: 'justify' }}>
                                                {resumeData.professionalSummary}
                                            </p>
                                        </div>
                                    )}

                                    {/* EDUCATION */}
                                    <div className="mb-5">
                                        <h2 className="h4 fw-bold mb-3" style={{
                                            color: '#0d6efd',
                                            borderBottom: '2px solid #0d6efd',
                                            paddingBottom: '8px',
                                            display: 'inline-block'
                                        }}>
                                            EDUCATION
                                        </h2>

                                        <div className="mt-3">
                                            {/* Graduation */}
                                            <div className="mb-4">
                                                <div className="d-flex justify-content-between align-items-start mb-2">
                                                    <h5 className="fw-bold mb-1">{resumeData.graduation.course}</h5>
                                                    <span className="badge bg-secondary">
                                                        {resumeData.graduation.startYear} - {resumeData.graduation.endYear}
                                                    </span>
                                                </div>
                                                <p className="text-muted mb-0">Graduation</p>
                                            </div>

                                            {/* Post Graduation */}
                                            {resumeData.hasPostGraduation && resumeData.postGraduation.course && (
                                                <div className="mb-4">
                                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                                        <h5 className="fw-bold mb-1">{resumeData.postGraduation.course}</h5>
                                                        <span className="badge bg-secondary">
                                                            {resumeData.postGraduation.startYear} - {resumeData.postGraduation.endYear}
                                                        </span>
                                                    </div>
                                                    <p className="text-muted mb-0">Post Graduation</p>
                                                </div>
                                            )}

                                            {/* PhD */}
                                            {resumeData.hasPhd && resumeData.phd.course && (
                                                <div className="mb-4">
                                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                                        <h5 className="fw-bold mb-1">{resumeData.phd.course}</h5>
                                                        <span className="badge bg-secondary">
                                                            {resumeData.phd.startYear} - {resumeData.phd.endYear}
                                                        </span>
                                                    </div>
                                                    <p className="text-muted mb-0">PhD</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* PROJECTS */}
                                    {resumeData.projects && (
                                        <div className="mb-5">
                                            <h2 className="h4 fw-bold mb-3" style={{
                                                color: '#0d6efd',
                                                borderBottom: '2px solid #0d6efd',
                                                paddingBottom: '8px',
                                                display: 'inline-block'
                                            }}>
                                                PROJECTS
                                            </h2>
                                            <div className="mt-3" style={{
                                                whiteSpace: 'pre-line',
                                                lineHeight: '1.8'
                                            }}>
                                                {resumeData.projects}
                                            </div>
                                        </div>
                                    )}

                                    {/* EXPERIENCE */}
                                    {resumeData.experience && (
                                        <div className="mb-5">
                                            <h2 className="h4 fw-bold mb-3" style={{
                                                color: '#0d6efd',
                                                borderBottom: '2px solid #0d6efd',
                                                paddingBottom: '8px',
                                                display: 'inline-block'
                                            }}>
                                                EXPERIENCE
                                            </h2>
                                            <div className="mt-3" style={{
                                                whiteSpace: 'pre-line',
                                                lineHeight: '1.8'
                                            }}>
                                                {resumeData.experience}
                                            </div>
                                        </div>
                                    )}

                                    {/* SKILLS */}
                                    {resumeData.skills && (
                                        <div className="mb-4">
                                            <h2 className="h4 fw-bold mb-3" style={{
                                                color: '#0d6efd',
                                                borderBottom: '2px solid #0d6efd',
                                                paddingBottom: '8px',
                                                display: 'inline-block'
                                            }}>
                                                SKILLS
                                            </h2>
                                            <div className="mt-3">
                                                <div className="d-flex flex-wrap gap-2">
                                                    {skillsArray.map((skill, index) => (
                                                        <span
                                                            key={index}
                                                            className="badge bg-primary px-3 py-2"
                                                            style={{
                                                                fontSize: '0.9rem',
                                                                fontWeight: '500',
                                                                borderRadius: '6px'
                                                            }}
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>

                        <div className="text-center mt-5 no-print">
                            <button
                                onClick={handleDownload}
                                className="btn btn-primary btn-lg px-5 py-3 fw-semibold me-3"
                                style={{
                                    fontSize: '1.1rem',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 15px rgba(13, 110, 253, 0.4)'
                                }}
                            >
                                📄 Download as PDF
                            </button>
                            <button
                                onClick={handleEdit}
                                className="btn btn-outline-light btn-lg px-5 py-3 fw-semibold"
                                style={{
                                    fontSize: '1.1rem',
                                    borderRadius: '8px'
                                }}
                            >
                                ✏️ Edit Resume
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="bg-black border-top border-secondary py-4 mt-5 no-print">
                <div className="container">
                    <div className="text-center text-white-50">
                        <p className="mb-0">&copy; 2024 ResumeCraft AI. All rights reserved.</p>
                    </div>
                </div>
            </footer>

            <style>{`
                @media print {
                    .no-print {
                        display: none !important;
                    }
                    body {
                        background: white !important;
                    }
                    .bg-dark {
                        background: white !important;
                    }
                }
            `}</style>
        </div>
    );
}