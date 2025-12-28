export default function CreativeTemplate({ resumeData }) {
    return (
        <div className="p-5">
            <div className="text-center mb-4">
                <h1>{resumeData.fullName}</h1>
                <p>{resumeData.email} • {resumeData.phone}</p>
            </div>

            <div className="card p-4 mb-3">
                <h4>About Me</h4>
                <p>{resumeData.professionalSummary}</p>
            </div>

            <div className="card p-4 mb-3">
                <h4>Experience</h4>
                <p style={{ whiteSpace: "pre-line" }}>{resumeData.experience}</p>
            </div>

            <div className="card p-4">
                <h4>Skills</h4>
                <p>{resumeData.skills}</p>
            </div>
        </div>
    );
}
