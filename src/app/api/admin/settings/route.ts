import { type NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { SiteSettingsModel } from "@/models/SiteSettings";

export async function PUT(req: NextRequest) {
  const isAuthorized = await verifyAdminRequest();
  if (!isAuthorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json(
        { error: "MongoDB not connected" },
        { status: 503 },
      );
    }

    const body = await req.json();

    let settings = await SiteSettingsModel.findOne();
    if (!settings) {
      settings = new SiteSettingsModel();
    }

    if (body.owner) {
      settings.owner = {
        name: body.owner.name ?? settings.owner.name,
        title: body.owner.title ?? settings.owner.title,
        tagline: body.owner.tagline ?? settings.owner.tagline,
        bio: body.owner.bio ?? settings.owner.bio,
        avatarUrl: body.owner.avatarUrl ?? settings.owner.avatarUrl,
        location: body.owner.location ?? settings.owner.location,
        email: body.owner.email ?? settings.owner.email,
        status: body.owner.status ?? settings.owner.status,
        social: {
          github: body.owner.social?.github ?? settings.owner.social.github,
          linkedin:
            body.owner.social?.linkedin ?? settings.owner.social.linkedin,
          twitter: body.owner.social?.twitter ?? settings.owner.social.twitter,
        },
      };
    }

    if (body.fontFamily) {
      settings.fontFamily = body.fontFamily;
    }

    if (body.fontSizeScale) {
      settings.fontSizeScale = body.fontSizeScale;
    }

    if (body.stats) {
      settings.stats = {
        experienceYears: Number(body.stats.experienceYears) || 0,
        projectsCompleted: Number(body.stats.projectsCompleted) || 0,
        satisfiedClients: Number(body.stats.satisfiedClients) || 0,
        githubContributions: Number(body.stats.githubContributions) || 0,
      };
    }

    await settings.save();

    return NextResponse.json({
      success: true,
      message: "Settings updated successfully",
      settings,
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}
