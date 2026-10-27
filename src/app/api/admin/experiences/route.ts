import { type NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { ExperienceModel } from "@/models/Experience";

export async function POST(req: NextRequest) {
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
    const newExp = await ExperienceModel.create({
      role: body.role,
      company: body.company,
      period: body.period,
      location: body.location || "Remote",
      description: body.description,
      achievements: Array.isArray(body.achievements)
        ? body.achievements
        : typeof body.achievements === "string"
          ? body.achievements.split("\n").filter(Boolean)
          : [],
      technologies: Array.isArray(body.technologies)
        ? body.technologies
        : typeof body.technologies === "string"
          ? body.technologies.split(",").map((t: string) => t.trim())
          : [],
      order: Number(body.order) || 0,
    });

    return NextResponse.json({ success: true, experience: newExp });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}
