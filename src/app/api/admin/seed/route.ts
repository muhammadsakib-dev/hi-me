import { NextResponse } from "next/server";
import {
  EXPERIENCE_DATA,
  PORTFOLIO_OWNER,
  PROJECTS_DATA,
} from "@/data/portfolioData";
import { verifyAdminRequest } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { ExperienceModel } from "@/models/Experience";
import { ProjectModel } from "@/models/Project";
import { SiteSettingsModel } from "@/models/SiteSettings";

export async function POST() {
  const isAuthorized = await verifyAdminRequest();
  if (!isAuthorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json(
        {
          success: false,
          error:
            "MongoDB is not connected. Please verify your MONGODB_URI in .env",
        },
        { status: 503 },
      );
    }

    // Clear existing or seed freshly
    await ProjectModel.deleteMany({});
    await ExperienceModel.deleteMany({});
    await SiteSettingsModel.deleteMany({});

    // Seed Projects
    const projectsToInsert = PROJECTS_DATA.map((p, idx) => ({
      projectId: p.id,
      title: p.title,
      category:
        p.category === "Full Stack"
          ? "Full-Stack"
          : p.category === "AI & ML"
            ? "AI & ML"
            : p.category === "Design Engineering"
              ? "Frontend"
              : "Full-Stack",
      shortDesc: p.description,
      fullDesc: p.longDescription || p.description,
      image: p.image,
      tags: p.tags,
      demoUrl: p.liveUrl || "#",
      githubUrl: p.githubUrl || "#",
      metrics: {
        stars: p.metrics?.[2]?.value || "2.8k",
        users: p.metrics?.[0]?.value || "120k",
        performance: "100%",
      },
      featured: p.featured ?? false,
      order: idx,
    }));
    await ProjectModel.insertMany(projectsToInsert);

    // Seed Experiences
    const experiencesToInsert = EXPERIENCE_DATA.map((exp, idx) => ({
      role: exp.role,
      company: exp.company,
      period: exp.period,
      location: exp.location,
      description: exp.description,
      achievements: exp.achievements,
      technologies: exp.technologies,
      order: idx,
    }));
    await ExperienceModel.insertMany(experiencesToInsert);

    // Seed SiteSettings
    await SiteSettingsModel.create({
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
        experienceYears: 5,
        projectsCompleted: 40,
        satisfiedClients: 24,
        githubContributions: 1850,
      },
    });

    return NextResponse.json({
      success: true,
      message:
        "Database successfully seeded with portfolio data, projects, and experiences!",
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}
