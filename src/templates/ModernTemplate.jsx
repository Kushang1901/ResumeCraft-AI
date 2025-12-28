import React from "react";

export default function ModernTemplate({ resumeData, aiOutput }) {
    const skills = resumeData.skills
        ? resumeData.skills.split(",").map(s => s.trim())
        : [];

    return (
        <div className="d-flex" style={{ minHeight: "100%" }}>
            {/* LEFT SIDEBAR */}
            <div className="p-4 text-white" style={{ width: "30%", background: "#0d6efd" }}>
                {resumeData.profilePhoto && (
                    <img
                        src={resumeData.profilePhoto}
                        alt="Profile"
                        style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                            borderRadius: "50%",
                            marginBottom: "15px",
                            border: "2px solid white"
                        }}
                    />
                )}

                <h3 className="fw-bold">{resumeData.fullName}</h3>
                <p>{resumeData.email}</p>
                <p>{resumeData.phone}</p>

                <hr />

                <h6 className="fw-bold">SKILLS</h6>
                <ul>
                    {skills.map((skill, i) => (
                        <li key={i}>{skill}</li>
                    ))}
                </ul>
            </div>

            {/* RIGHT CONTENT */}
            <div className="p-5" style={{ width: "70%" }}>
                {/* SUMMARY */}
                <section className="mb-4">
                    <h5 className="fw-bold">PROFILE</h5>
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
                    <section>
                        <h5 className="fw-bold">PROJECTS</h5>
                        <p style={{ whiteSpace: "pre-line" }}>
                            {resumeData.projects}
                        </p>
                    </section>
                )}
            </div>
        </div>
    );
}
