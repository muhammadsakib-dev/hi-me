import { NextResponse } from "next/server";
import {
  EXPERIENCE_DATA,
  PORTFOLIO_OWNER,
  PROJECTS_DATA,
} from "@/data/portfolioData";
import { verifyAdminRequest } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { ExperienceModel } from "@/models/Experience";
import { MessageModel } from "@/models/Message";
import { ProjectModel } from "@/models/Project";
import { SiteSettingsModel } from "@/models/SiteSettings";

export async function GET() {
  const isAuthorized = await verifyAdminRequest();
  if (!isAuthorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const conn = await connectToDatabase();

    const fallbackSettings = {
      owner: {
        name: PORTFOLIO_OWNER.name,
        title: PORTFOLIO_OWNER.title,
        tagline: PORTFOLIO_OWNER.roleTagline,
        bio: PORTFOLIO_OWNER.quote,
        avatarUrl: PORTFOLIO_OWNER.avatarUrl,
        location: PORTFOLIO_OWNER.location,
        email: PORTFOLIO_OWNER.email,
        status: PORTFOLIO_OWNER.status,
        social: {
          github: PORTFOLIO_OWNER.github,
          linkedin: PORTFOLIO_OWNER.linkedin,
          twitter: PORTFOLIO_OWNER.twitter,
        },
      },
      fontFamily: "Space Grotesk",
      fontSizeScale: "standard",
      stats: {
        experienceYears: 4,
        projectsCompleted: 28,
        satisfiedClients: 19,
        githubContributions: 1420,
      },
    };

    if (!conn) {
      return NextResponse.json({
        success: true,
        connected: false,
        projects: PROJECTS_DATA.map((p, idx) => ({
          _id: p.id,
          projectId: p.id,
          title: p.title,
          category: p.category,
          shortDesc: p.description,
          fullDesc: p.longDescription || p.description,
          image: p.image,
          tags: p.tags,
          demoUrl: p.liveUrl || "#",
          githubUrl: p.githubUrl || "#",
          featured: p.featured ?? false,
          order: idx,
        })),
        experiences: EXPERIENCE_DATA.map((exp, idx) => ({
          _id: exp.id,
          role: exp.role,
          company: exp.company,
          period: exp.period,
          location: exp.location,
          description: exp.description,
          achievements: exp.achievements,
          technologies: exp.technologies,
          order: idx,
        })),
        messages: [],
        settings: fallbackSettings,
      });
    }

    const projects = await ProjectModel.find()
      .sort({ order: 1, createdAt: -1 })
      .lean();
    const experiences = await ExperienceModel.find()
      .sort({ order: 1, createdAt: -1 })
      .lean();
    const messages = await MessageModel.find().sort({ createdAt: -1 }).lean();
    const settings = await SiteSettingsModel.findOne().lean();

    return NextResponse.json({
      success: true,
      connected: true,
      projects,
      experiences,
      messages,
      settings: settings || fallbackSettings,
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}
