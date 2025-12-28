export default function ClassicTemplate({ resumeData }) {
    return (
        <div className="p-5">
            <h1 className="text-center">{resumeData.fullName}</h1>
            <p className="text-center">
                {resumeData.email} | {resumeData.phone}
            </p>

            <hr />

            <h4>Summary</h4>
            <p>{resumeData.professionalSummary}</p>

            <h4>Education</h4>
            <p>{resumeData.graduation.course}</p>

            <h4>Experience</h4>
            <p style={{ whiteSpace: "pre-line" }}>{resumeData.experience}</p>

            <h4>Skills</h4>
            <p>{resumeData.skills}</p>
        </div>
    );
}
