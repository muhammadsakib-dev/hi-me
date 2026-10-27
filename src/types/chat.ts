export type ThemeMode = "dark" | "light";

export type CommandType =
  | "about"
  | "skills"
  | "projects"
  | "clients"
  | "contact"
  | "hobbies"
  | "age"
  | "cv"
  | "education"
  | "experience"
  | "awards"
  | "help"
  | "clear"
  | "custom";

export interface FollowUpChip {
  label: string;
  command: CommandType | string;
  icon?: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text?: string;
  commandType?: CommandType;
  timestamp: string;
  payload?: unknown;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  image: string;
  category: "Full Stack" | "AI & ML" | "Mobile & Web" | "Design Engineering";
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  metrics: { label: string; value: string }[];
}

export interface SkillItem {
  name: string;
  level: number; // 0 to 100
  years: string;
  icon?: string;
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: SkillItem[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  rating: number;
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  grade?: string;
  highlights: string[];
}

export interface AwardItem {
  id: string;
  title: string;
  organization: string;
  year: string;
  description: string;
  badge?: string;
}

export interface HobbyItem {
  id: string;
  name: string;
  category: string;
  icon: string;
  description: string;
  stats: string;
}
