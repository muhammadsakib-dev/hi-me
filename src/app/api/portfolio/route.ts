import { NextResponse } from "next/server";
import {
  EXPERIENCE_DATA,
  PORTFOLIO_OWNER,
  PROJECTS_DATA,
} from "@/data/portfolioData";
import { connectToDatabase } from "@/lib/mongodb";
import { ExperienceModel } from "@/models/Experience";
import { ProjectModel } from "@/models/Project";
import { SiteSettingsModel } from "@/models/SiteSettings";

export async function GET() {
  try {
    const conn = await connectToDatabase();

    if (!conn) {
      // Graceful fallback to static portfolio data if MongoDB is not connected
      return NextResponse.json({
        success: true,
        connected: false,
        source: "local-fallback",
        owner: PORTFOLIO_OWNER,
        projects: PROJECTS_DATA,
        experiences: EXPERIENCE_DATA,
        settings: {
          fontFamily: "Space Grotesk",
          fontSizeScale: "standard",
        },
      });
    }

    // Connected to MongoDB - fetch dynamic data
    const settings = await SiteSettingsModel.findOne().lean();
    const projects = await ProjectModel.find()
      .sort({ order: 1, createdAt: -1 })
      .lean();
    const experiences = await ExperienceModel.find()
      .sort({ order: 1, createdAt: -1 })
      .lean();

    // If database is empty, seed or return fallback
    if (!settings && projects.length === 0) {
      return NextResponse.json({
        success: true,
        connected: true,
        source: "local-fallback-empty-db",
        owner: PORTFOLIO_OWNER,
        projects: PROJECTS_DATA,
        experiences: EXPERIENCE_DATA,
        settings: {
          fontFamily: "Space Grotesk",
          fontSizeScale: "standard",
        },
      });
    }

    const formattedProjects =
      projects.length > 0
        ? projects.map((p) => ({
            id: p.projectId || String(p._id),
            title: p.title,
            category: p.category,
            tagline: p.shortDesc,
            description: p.shortDesc,
            longDescription: p.fullDesc,
            image: p.image,
            tags: p.tags || [],
            liveUrl: p.demoUrl,
            githubUrl: p.githubUrl,
            metrics: p.metrics
              ? [
                  ...(p.metrics.stars
                    ? [{ label: "GitHub Stars", value: p.metrics.stars }]
                    : []),
                  ...(p.metrics.users
                    ? [{ label: "Active Users", value: p.metrics.users }]
                    : []),
                  ...(p.metrics.performance
                    ? [{ label: "Performance", value: p.metrics.performance }]
                    : []),
                ]
              : [],
            featured: p.featured ?? false,
          }))
        : PROJECTS_DATA;

    const formattedExperiences =
      experiences.length > 0
        ? experiences.map((exp) => ({
            id: String(exp._id),
            role: exp.role,
            company: exp.company,
            period: exp.period,
            location: exp.location,
            description: exp.description,
            achievements: exp.achievements || [],
            technologies: exp.technologies || [],
          }))
        : EXPERIENCE_DATA;

    const formattedOwner = settings?.owner
      ? {
          name: settings.owner.name,
          shortName: settings.owner.name.split(" ")[0] || "Sakib",
          title: settings.owner.title,
          roleTagline: settings.owner.title,
          status: settings.owner.status,
          location: settings.owner.location,
          email: settings.owner.email,
          phone: "+880 1700 000000",
          github: settings.owner.social?.github || "https://github.com",
          linkedin: settings.owner.social?.linkedin || "https://linkedin.com",
          twitter: settings.owner.social?.twitter || "https://x.com",
          experienceYears: `${settings.stats?.experienceYears || 4}+`,
          projectsCompleted: `${settings.stats?.projectsCompleted || 30}+`,
          clientsSatisfied: "99%",
          avatarUrl: settings.owner.avatarUrl || PORTFOLIO_OWNER.avatarUrl,
          quote: settings.owner.bio || PORTFOLIO_OWNER.quote,
        }
      : PORTFOLIO_OWNER;

    return NextResponse.json({
      success: true,
      connected: true,
      source: "mongodb",
      owner: formattedOwner,
      projects: formattedProjects,
      experiences: formattedExperiences,
      settings: {
        fontFamily: settings?.fontFamily || "Space Grotesk",
        fontSizeScale: settings?.fontSizeScale || "standard",
      },
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({
      success: true,
      connected: false,
      source: "local-fallback-error",
      error: err.message,
      owner: PORTFOLIO_OWNER,
      projects: PROJECTS_DATA,
      experiences: EXPERIENCE_DATA,
      settings: {
        fontFamily: "Space Grotesk",
        fontSizeScale: "standard",
      },
    });
  }
}
