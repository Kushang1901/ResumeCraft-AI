export const normalizeResumeData = (raw) => {
    return {
        basics: {
            name: raw.fullName || "",
            role: raw.role || "",
            email: raw.email || "",
            phone: raw.phone || "",
            photo: raw.profilePhoto || "",
            links: {
                portfolio: raw.portfolio || "",
                linkedin: raw.linkedin || "",
                github: raw.github || ""
            }
        },

        summary: raw.professionalSummary || "",

        education: [
            raw.graduation
                ? {
                    level: "Graduation",
                    course: raw.graduation.course,
                    start: raw.graduation.startYear,
                    end: raw.graduation.endYear
                }
                : null,

            raw.hasPostGraduation
                ? {
                    level: "Post Graduation",
                    course: raw.postGraduation.course,
                    start: raw.postGraduation.startYear,
                    end: raw.postGraduation.endYear
                }
                : null,

            raw.hasPhd
                ? {
                    level: "PhD",
                    course: raw.phd.course,
                    start: raw.phd.startYear,
                    end: raw.phd.endYear
                }
                : null
        ].filter(Boolean),

        experience: raw.experience || "",
        projects: raw.projects || "",
        achievements: raw.achievements || "",

        skills: raw.skills
            ? raw.skills.split(",").map((s) => s.trim())
            : []
    };
};
