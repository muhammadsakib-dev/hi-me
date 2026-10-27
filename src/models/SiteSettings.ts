import mongoose, { type Document, type Model, Schema } from "mongoose";

export interface ISiteSettings extends Document {
  owner: {
    name: string;
    title: string;
    tagline: string;
    bio: string;
    avatarUrl: string;
    location: string;
    email: string;
    status: string;
    social: {
      github: string;
      linkedin: string;
      twitter: string;
    };
  };
  fontFamily: string;
  fontSizeScale: "compact" | "standard" | "large";
  stats: {
    experienceYears: number;
    projectsCompleted: number;
    satisfiedClients: number;
    githubContributions: number;
  };
}

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    owner: {
      name: { type: String, default: "Md Sakib" },
      title: {
        type: String,
        default: "Full-Stack Engineer & AI UI Architect",
      },
      tagline: {
        type: String,
        default:
          "Building high-performance web systems, AI workflows, and minimalist interactive experiences.",
      },
      bio: {
        type: String,
        default:
          "I am a passionate software engineer specializing in modern React ecosystems, distributed backend architectures, and high-conversion UX design.",
      },
      avatarUrl: {
        type: String,
        default: "https://ik.imagekit.io/muhammadsakib/dd.JPG",
      },
      location: { type: String, default: "Dhaka, Bangladesh" },
      email: { type: String, default: "contact@sakib.dev" },
      status: { type: String, default: "Online • Active Now" },
      social: {
        github: { type: String, default: "https://github.com" },
        linkedin: { type: String, default: "https://linkedin.com" },
        twitter: { type: String, default: "https://twitter.com" },
      },
    },
    fontFamily: { type: String, default: "Space Grotesk" },
    fontSizeScale: {
      type: String,
      enum: ["compact", "standard", "large"],
      default: "standard",
    },
    stats: {
      experienceYears: { type: Number, default: 4 },
      projectsCompleted: { type: Number, default: 28 },
      satisfiedClients: { type: Number, default: 19 },
      githubContributions: { type: Number, default: 1420 },
    },
  },
  { timestamps: true },
);

export const SiteSettingsModel: Model<ISiteSettings> =
  mongoose.models.SiteSettings ||
  mongoose.model<ISiteSettings>("SiteSettings", SiteSettingsSchema);
