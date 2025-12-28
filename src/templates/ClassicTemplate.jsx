import React from "react";

export default function ClassicTemplate({ data }) {
    return (
        <div className="p-5">
            {/* HEADER */}
            <div className="text-center mb-4">
                {data.basics.photo && (
                    <img
                        src={data.basics.photo}
                        alt="Profile"
                        style={{
                            width: "120px",
                            height: "120px",
                            objectFit: "cover",
                            borderRadius: "50%",
                            marginBottom: "12px",
                            border: "2px solid #0d6efd"
                        }}
                    />
                )}

                <h1 className="fw-bold">{data.basics.name}</h1>
                <p className="text-muted">
                    {data.basics.email} | {data.basics.phone}
                </p>
            </div>

            {/* SUMMARY */}
            <section className="mb-4">
                <h5 className="fw-bold">PROFESSIONAL SUMMARY</h5>
                <p>{data.summary}</p>
            </section>

            {/* EDUCATION */}
            <section className="mb-4">
                <h5 className="fw-bold">EDUCATION</h5>
                {data.education.map((edu, i) => (
                    <p key={i}>
                        <strong>{edu.course}</strong><br />
                        {edu.start} – {edu.end}
                    </p>
                ))}
            </section>

            {/* EXPERIENCE */}
            {data.experience && (
                <section className="mb-4">
                    <h5 className="fw-bold">EXPERIENCE</h5>
                    <p style={{ whiteSpace: "pre-line" }}>{data.experience}</p>
                </section>
            )}

            {/* PROJECTS */}
            {data.projects && (
                <section className="mb-4">
                    <h5 className="fw-bold">PROJECTS</h5>
                    <p style={{ whiteSpace: "pre-line" }}>{data.projects}</p>
                </section>
            )}

            {/* SKILLS */}
            {data.skills.length > 0 && (
                <section>
                    <h5 className="fw-bold">SKILLS</h5>
                    <p>{data.skills.join(", ")}</p>
                </section>
            )}
        </div>
    );
}
