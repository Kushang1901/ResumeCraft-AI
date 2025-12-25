import React from "react";

export default function t1({ data, aiOutput }) {
    return (
        <div style={{
            maxWidth: "850px",
            margin: "0 auto",
            padding: "40px 20px",
            backgroundColor: "white",
            fontFamily: "Arial, sans-serif",
            color: "#000"
        }}>

            {/* Header */}
            <div style={{
                textAlign: "center",
                paddingBottom: "15px",
                marginBottom: "25px",
                borderBottom: "3px solid #0d6efd"
            }}>
                <h1 style={{
                    fontSize: "36px",
                    fontWeight: "bold",
                    marginBottom: "8px"
                }}>
                    {data.fullName}
                </h1>

                <p style={{ fontSize: "14px", color: "#333" }}>
                    {data.email} | {data.phone}
                </p>
            </div>

            {/* Professional Summary */}
            <div style={{ marginBottom: "25px" }}>
                <h2 style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#0d6efd",
                    marginBottom: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px"
                }}>
                    Professional Summary
                </h2>

                <p style={{ fontSize: "14px", lineHeight: "1.6", textAlign: "justify" }}>
                    {aiOutput || data.professionalSummary}
                </p>
            </div>

            {/* Education */}
            <div style={{ marginBottom: "25px" }}>
                <h2 style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#0d6efd",
                    marginBottom: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px"
                }}>
                    Education
                </h2>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <p style={{ fontSize: "15px", fontWeight: "bold" }}>
                        {data.graduation.course}
                    </p>
                    <p style={{ fontSize: "14px", color: "#555" }}>
                        {data.graduation.startYear} – {data.graduation.endYear}
                    </p>
                </div>
            </div>

            {/* Projects */}
            <div style={{ marginBottom: "25px" }}>
                <h2 style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#0d6efd",
                    marginBottom: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px"
                }}>
                    Projects
                </h2>

                <p style={{ fontSize: "14px", color: "#333", whiteSpace: "pre-line" }}>
                    {data.projects}
                </p>
            </div>

            {/* Experience */}
            <div style={{ marginBottom: "25px" }}>
                <h2 style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#0d6efd",
                    marginBottom: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px"
                }}>
                    Experience
                </h2>

                <p style={{ fontSize: "14px", color: "#333", whiteSpace: "pre-line" }}>
                    {data.experience}
                </p>
            </div>

            {/* Skills */}
            <div style={{ marginBottom: "20px" }}>
                <h2 style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#0d6efd",
                    marginBottom: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px"
                }}>
                    Skills
                </h2>

                <p style={{ fontSize: "14px", lineHeight: "1.7", color: "#333" }}>
                    {data.skills}
                </p>
            </div>

        </div>
    );
}
