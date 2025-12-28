import React from "react";

export default function CreativeTemplate({ data }) {
    return (
        <div className="p-5">
            {/* HEADER */}
            <div className="text-center mb-4">
                {data.basics.photo && (
                    <img
                        src={data.basics.photo}
                        alt="Profile"
                        style={{
                            width: "130px",
                            height: "130px",
                            objectFit: "cover",
                            borderRadius: "20px",
                            marginBottom: "15px",
                            border: "3px solid #333"
                        }}
                    />
                )}

                <h1 className="fw-bold">{data.basics.name}</h1>
                <p className="text-muted">
                    {data.basics.email} • {data.basics.phone}
                </p>
            </div>

            {/* SUMMARY */}
            <div className="card p-4 mb-3">
                <h5 className="fw-bold">About Me</h5>
                <p>{data.summary}</p>
            </div>

            {/* EDUCATION */}
            <div className="card p-4 mb-3">
                <h5 className="fw-bold">Education</h5>
                {data.education.map((edu, i) => (
                    <p key={i}>
                        <strong>{edu.course}</strong><br />
                        {edu.start} – {edu.end}
                    </p>
                ))}
            </div>

            {/* EXPERIENCE */}
            {data.experience && (
                <div className="card p-4 mb-3">
                    <h5 className="fw-bold">Experience</h5>
                    <p style={{ whiteSpace: "pre-line" }}>{data.experience}</p>
                </div>
            )}

            {/* PROJECTS */}
            {data.projects && (
                <div className="card p-4 mb-3">
                    <h5 className="fw-bold">Projects</h5>
                    <p style={{ whiteSpace: "pre-line" }}>{data.projects}</p>
                </div>
            )}

            {/* SKILLS */}
            {data.skills.length > 0 && (
                <div className="card p-4">
                    <h5 className="fw-bold">Skills</h5>
                    <p>{data.skills.join(", ")}</p>
                </div>
            )}

            {/* ACHIEVEMENTS / CERTIFICATIONS */}
            {data.achievements && (
                <div className="card p-4 mb-3">
                    <h5 className="fw-bold">Achievements & Certifications</h5>
                    <p style={{ whiteSpace: "pre-line" }}>
                        {data.achievements}
                    </p>
                </div>
            )}

        </div>
    );
}
