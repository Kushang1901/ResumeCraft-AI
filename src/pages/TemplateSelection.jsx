import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const templates = [
    { id: "classic", name: "Classic" },
    { id: "modern", name: "Modern" },
    { id: "creative", name: "Creative" }
];

export default function TemplateSelection() {
    const navigate = useNavigate();

    const selectTemplate = (id) => {
        sessionStorage.setItem("selectedTemplate", id);
        navigate("/builder");
    };

    return (
        <div className="bg-dark text-white min-vh-100">
            <Navbar />
            <div className="container py-5 text-center">
                <h1 className="mb-4">Choose Your Resume Template</h1>

                <div className="row justify-content-center">
                    {templates.map(t => (
                        <div className="col-md-4 mb-4" key={t.id}>
                            <div
                                className="bg-black border border-secondary p-4"
                                style={{ cursor: "pointer", borderRadius: "12px" }}
                                onClick={() => selectTemplate(t.id)}
                            >
                                <div className="bg-secondary mb-3" style={{ height: "200px" }}>
                                    <p className="pt-5">Template Preview</p>
                                </div>
                                <h5>{t.name}</h5>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
