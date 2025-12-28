import React from "react";

export default function ClassicTemplate({ resumeData, aiOutput }) {
    const skills = resumeData.skills
        ? resumeData.skills.split(",").map(s => s.trim())
        : [];

    return (
        <div className="p-5">
            {/* HEADER */}
            <div className="text-center mb-4">
                <h1 className="fw-bold">{resumeData.fullName}</h1>
                <p className="text-muted">
                    {resumeData.email} | {resumeData.phone}
                </p>
            </div>

            {/* SUMMARY / AI OUTPUT */}
            <section className="mb-4">
                <h5 className="fw-bold">PROFESSIONAL SUMMARY</h5>
                <p>
                    {aiOutput && aiOutput !== "undefined"
                        ? aiOutput
                        : resumeData.professionalSummary}
                </p>
            </section>

            {/* EDUCATION */}
            <section className="mb-4">
                <h5 className="fw-bold">EDUCATION</h5>

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
            </section>

            {/* EXPERIENCE */}
            {resumeData.experience && (
                <section className="mb-4">
                    <h5 className="fw-bold">EXPERIENCE</h5>
                    <p style={{ whiteSpace: "pre-line" }}>
                        {resumeData.experience}
                    </p>
                </section>
            )}

            {/* PROJECTS */}
            {resumeData.projects && (
                <section className="mb-4">
                    <h5 className="fw-bold">PROJECTS</h5>
                    <p style={{ whiteSpace: "pre-line" }}>
                        {resumeData.projects}
                    </p>
                </section>
            )}

            {/* SKILLS */}
            {skills.length > 0 && (
                <section>
                    <h5 className="fw-bold">SKILLS</h5>
                    <p>{skills.join(", ")}</p>
                </section>
            )}
        </div>
    );
}
