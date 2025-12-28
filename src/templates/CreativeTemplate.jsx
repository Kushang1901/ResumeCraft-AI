import React from "react";

export default function CreativeTemplate({ resumeData, aiOutput }) {
    const skills = resumeData.skills
        ? resumeData.skills.split(",").map(s => s.trim())
        : [];

    return (
        <div className="p-5">
            {/* HEADER */}
            <div className="text-center mb-4">
                <h1 className="fw-bold">{resumeData.fullName}</h1>
                <p className="text-muted">
                    {resumeData.email} • {resumeData.phone}
                </p>
            </div>

            {/* SUMMARY */}
            <div className="card p-4 mb-3">
                <h5 className="fw-bold">About Me</h5>
                <p>
                    {aiOutput && aiOutput !== "undefined"
                        ? aiOutput
                        : resumeData.professionalSummary}
                </p>
            </div>

            {/* EDUCATION */}
            <div className="card p-4 mb-3">
                <h5 className="fw-bold">Education</h5>

                <p>
                    <strong>{resumeData.graduation.course}</strong><br />
                    {resumeData.graduation.startYear} – {resumeData.graduation.endYear}
                </p>

                {resumeData.hasPostGraduation && (
                    <p>
                        <strong>{resumeData.postGraduation.course}</strong><br />
                        {resumeData.postGraduation.startYear} – {resumeData.postGraduation.endYear}
                    </p>
                )}

                {resumeData.hasPhd && (
                    <p>
                        <strong>{resumeData.phd.course}</strong><br />
                        {resumeData.phd.startYear} – {resumeData.phd.endYear}
                    </p>
                )}
            </div>

            {/* EXPERIENCE */}
            {resumeData.experience && (
                <div className="card p-4 mb-3">
                    <h5 className="fw-bold">Experience</h5>
                    <p style={{ whiteSpace: "pre-line" }}>
                        {resumeData.experience}
                    </p>
                </div>
            )}

            {/* PROJECTS */}
            {resumeData.projects && (
                <div className="card p-4 mb-3">
                    <h5 className="fw-bold">Projects</h5>
                    <p style={{ whiteSpace: "pre-line" }}>
                        {resumeData.projects}
                    </p>
                </div>
            )}

            {/* SKILLS */}
            {skills.length > 0 && (
                <div className="card p-4">
                    <h5 className="fw-bold">Skills</h5>
                    <p>{skills.join(", ")}</p>
                </div>
            )}
        </div>
    );
}
