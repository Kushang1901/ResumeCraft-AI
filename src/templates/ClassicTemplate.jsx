import React from "react";

export default function ClassicTemplate({ data }) {

    const links = data?.basics?.links || {};
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
            {/*Links and Portfolio */}
            {data.basics.role && (
                <p className="fw-semibold text-primary">{data.basics.role}</p>
            )}

            <div className="d-flex gap-3 mt-3">
                {links.github && (
                    <a href={links.github} target="_blank" rel="noreferrer">
                        <i className="fab fa-github fa-lg"></i>
                    </a>
                )}

                {links.linkedin && (
                    <a href={links.linkedin} target="_blank" rel="noreferrer">
                        <i className="fab fa-linkedin fa-lg"></i>
                    </a>
                )}

                {links.portfolio && (
                    <a href={links.portfolio} target="_blank" rel="noreferrer">
                        <i className="fa-solid fa-globe fa-lg"></i>
                    </a>
                )}
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
            {/* ACHIEVEMENTS / CERTIFICATIONS */}
            {data.achievements && (
                <section className="mb-4">
                    <h5 className="fw-bold">ACHIEVEMENTS & CERTIFICATIONS</h5>
                    <p style={{ whiteSpace: "pre-line" }}>
                        {data.achievements}
                    </p>
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
