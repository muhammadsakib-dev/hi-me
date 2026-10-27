import mongoose, { type Document, type Model, Schema } from "mongoose";

export interface IProject extends Document {
  projectId: string;
  title: string;
  category: "Full-Stack" | "AI & ML" | "Frontend" | "Mobile";
  shortDesc: string;
  fullDesc: string;
  image: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
  metrics?: {
    stars?: string;
    users?: string;
    performance?: string;
  };
  featured: boolean;
  order: number;
}

const ProjectSchema = new Schema<IProject>(
  {
    projectId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ["Full-Stack", "AI & ML", "Frontend", "Mobile"],
      default: "Full-Stack",
    },
    shortDesc: { type: String, required: true },
    fullDesc: { type: String, required: true },
    image: { type: String, required: true },
    tags: [{ type: String }],
    demoUrl: { type: String, default: "#" },
    githubUrl: { type: String, default: "#" },
    metrics: {
      stars: { type: String },
      users: { type: String },
      performance: { type: String },
    },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const ProjectModel: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
