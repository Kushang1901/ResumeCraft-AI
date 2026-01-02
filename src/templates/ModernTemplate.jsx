import React from "react";

export default function ModernTemplate({ data }) {
    return (
        <div className="d-flex" style={{ minHeight: "100%" }}>
            {/* LEFT SIDEBAR */}
            <div
                className="p-4 text-white"
                style={{ width: "30%", background: "#0d6efd" }}
            >
                {data.basics.photo && (
                    <img
                        src={data.basics.photo}
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

                <h3 className="fw-bold">{data.basics.name}</h3>
                <p>{data.basics.email}</p>
                <p>{data.basics.phone}</p>
                {data.basics.role && (
                    <p className="fw-semibold mt-2">
                        {data.basics.role}
                    </p>
                )}

                <div className="d-flex gap-3 mt-3">
                    {data.basics.links.github && (
                        <a href={data.basics.links.github} target="_blank" rel="noreferrer">
                            <i className="fab fa-github fa-lg"></i>
                        </a>
                    )}

                    {data.basics.links.linkedin && (
                        <a href={data.basics.links.linkedin} target="_blank" rel="noreferrer">
                            <i className="fab fa-linkedin fa-lg"></i>
                        </a>
                    )}

                    {data.basics.links.portfolio && (
                        <a href={data.basics.links.portfolio} target="_blank" rel="noreferrer">
                            <i className="fa-solid fa-globe fa-lg"></i>
                        </a>
                    )}
                </div>

                <hr />

                <h6 className="fw-bold">SKILLS</h6>
                <ul>
                    {data.skills.map((skill, i) => (
                        <li key={i}>{skill}</li>
                    ))}
                </ul>
            </div>

            {/* RIGHT CONTENT */}
            <div className="p-5" style={{ width: "70%" }}>
                {/* SUMMARY */}
                <section className="mb-4">
                    <h5 className="fw-bold">PROFILE</h5>
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
                    <section>
                        <h5 className="fw-bold">PROJECTS</h5>
                        <p style={{ whiteSpace: "pre-line" }}>{data.projects}</p>
                    </section>
                )}

                {/* ACHIEVEMENTS / CERTIFICATIONS */}
                {data.achievements && (
                    <section className="mb-4">
                        <h5 className="fw-bold">ACHIEVEMENTS</h5>
                        <p style={{ whiteSpace: "pre-line" }}>
                            {data.achievements}
                        </p>
                    </section>
                )}

            </div>
        </div>
    );
}
