import mongoose, { type Document, type Model, Schema } from "mongoose";

export interface IExperience extends Document {
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
  order: number;
}

const ExperienceSchema = new Schema<IExperience>(
  {
    role: { type: String, required: true },
    company: { type: String, required: true },
    period: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    achievements: [{ type: String }],
    technologies: [{ type: String }],
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const ExperienceModel: Model<IExperience> =
  mongoose.models.Experience ||
  mongoose.model<IExperience>("Experience", ExperienceSchema);
