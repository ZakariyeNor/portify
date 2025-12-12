export interface Education {
    id: number;
    course: string;
    school: string;
    start_date: string;
    end_date: string;
    period: string;
}

export interface SkillCategories {
    id: number;
    title: string;
    skills: Skills[]
}

export interface Skills {
    id: number;
    name: string;
    category: string;
}

export interface Certificates {
    id: number;
    name: string;
    image: string;
    resume: string;
    about: string;
}

// Skill types
export interface SkillsData {
    education: Education[];
    skill_categories: SkillCategories[];
    skills: Skills[];
    certificates: Certificates[];
}