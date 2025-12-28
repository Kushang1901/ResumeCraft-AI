export default function ModernTemplate({ resumeData }) {
    return (
        <div className="d-flex">
            {/* LEFT */}
            <div className="p-4 bg-primary text-white" style={{ width: "30%" }}>
                <h3>{resumeData.fullName}</h3>
                <p>{resumeData.email}</p>
                <p>{resumeData.phone}</p>

                <h5 className="mt-4">Skills</h5>
                <ul>
                    {resumeData.skills.split(",").map((s, i) => (
                        <li key={i}>{s.trim()}</li>
                    ))}
                </ul>
            </div>

            {/* RIGHT */}
            <div className="p-5" style={{ width: "70%" }}>
                <h4>Profile</h4>
                <p>{resumeData.professionalSummary}</p>

                <h4>Experience</h4>
                <p style={{ whiteSpace: "pre-line" }}>{resumeData.experience}</p>

                <h4>Projects</h4>
                <p style={{ whiteSpace: "pre-line" }}>{resumeData.projects}</p>
            </div>
        </div>
    );
}
