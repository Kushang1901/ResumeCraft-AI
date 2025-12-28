import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function TemplateSelection() {
    const navigate = useNavigate();

    const selectTemplate = (id) => {
        sessionStorage.setItem("selectedTemplate", id);
        navigate("/builder");
    };

    return (
        <div className="bg-dark text-white min-vh-100">
            <Navbar />

            <div className="container py-5">
                <h1 className="text-center mb-5">Choose Your Resume Template</h1>

                <div className="row justify-content-center g-4">

                    {/* CLASSIC TEMPLATE */}
                    <div className="col-md-4">
                        <div
                            className="bg-black border border-secondary p-3 h-100"
                            style={{ borderRadius: "12px", cursor: "pointer" }}
                            onClick={() => selectTemplate("classic")}
                        >
                            <div className="bg-white text-dark p-3 mb-3" style={{ minHeight: "220px" }}>
                                <h6 className="fw-bold text-center">John Doe</h6>
                                <p className="text-center small mb-2">john@email.com | 9999999999</p>
                                <hr />
                                <p className="small mb-1"><strong>Summary</strong></p>
                                <p className="small">Clean single-column resume layout.</p>
                                <p className="small mb-1"><strong>Skills</strong></p>
                                <p className="small">JavaScript, React, Node</p>
                            </div>
                            <h5 className="text-center">Classic</h5>
                            <p className="text-center text-white-50 small">
                                Simple • ATS Friendly
                            </p>
                        </div>
                    </div>

                    {/* MODERN TEMPLATE */}
                    <div className="col-md-4">
                        <div
                            className="bg-black border border-secondary p-3 h-100"
                            style={{ borderRadius: "12px", cursor: "pointer" }}
                            onClick={() => selectTemplate("modern")}
                        >
                            <div className="bg-white text-dark d-flex mb-3" style={{ minHeight: "220px" }}>
                                <div className="bg-primary text-white p-2" style={{ width: "30%" }}>
                                    <p className="small fw-bold">John</p>
                                    <p className="small">Skills</p>
                                    <ul className="small ps-3">
                                        <li>React</li>
                                        <li>Node</li>
                                    </ul>
                                </div>
                                <div className="p-2" style={{ width: "70%" }}>
                                    <p className="small fw-bold mb-1">Profile</p>
                                    <p className="small">Modern sidebar-based layout.</p>
                                    <p className="small fw-bold mb-1">Experience</p>
                                    <p className="small">Company Name</p>
                                </div>
                            </div>
                            <h5 className="text-center">Modern</h5>
                            <p className="text-center text-white-50 small">
                                Professional • Corporate
                            </p>
                        </div>
                    </div>

                    {/* CREATIVE TEMPLATE */}
                    <div className="col-md-4">
                        <div
                            className="bg-black border border-secondary p-3 h-100"
                            style={{ borderRadius: "12px", cursor: "pointer" }}
                            onClick={() => selectTemplate("creative")}
                        >
                            <div className="bg-white text-dark p-3 mb-3" style={{ minHeight: "220px" }}>
                                <div className="border rounded p-2 mb-2">
                                    <p className="small fw-bold mb-1">About Me</p>
                                    <p className="small">Creative card-based design.</p>
                                </div>
                                <div className="border rounded p-2 mb-2">
                                    <p className="small fw-bold mb-1">Projects</p>
                                    <p className="small">E-commerce App</p>
                                </div>
                                <div className="border rounded p-2">
                                    <p className="small fw-bold mb-1">Skills</p>
                                    <p className="small">UI / UX</p>
                                </div>
                            </div>
                            <h5 className="text-center">Creative</h5>
                            <p className="text-center text-white-50 small">
                                Stylish • Visual
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
