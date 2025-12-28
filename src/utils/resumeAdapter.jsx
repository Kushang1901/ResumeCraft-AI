export function normalizeResumeData(raw) {
    return {
        basics: {
            name: raw.fullName || "",
            email: raw.email || "",
            phone: raw.phone || "",
            photo: raw.profilePhoto || ""
        },

        summary: raw.professionalSummary || "",

        education: [
            raw.graduation && {
                level: "Graduation",
                course: raw.graduation.course,
                start: raw.graduation.startYear,
                end: raw.graduation.endYear
            },
            raw.hasPostGraduation && {
                level: "Post Graduation",
                course: raw.postGraduation.course,
                start: raw.postGraduation.startYear,
                end: raw.postGraduation.endYear
            },
            raw.hasPhd && {
                level: "PhD",
                course: raw.phd.course,
                start: raw.phd.startYear,
                end: raw.phd.endYear
            }
        ].filter(Boolean),

        experience: raw.experience || "",
        projects: raw.projects || "",

        skills: raw.skills
            ? raw.skills.split(",").map(s => s.trim())
            : []
    };
}
