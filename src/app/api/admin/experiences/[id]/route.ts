import { type NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { ExperienceModel } from "@/models/Experience";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const isAuthorized = await verifyAdminRequest();
  if (!isAuthorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json(
        { error: "MongoDB not connected" },
        { status: 503 },
      );
    }

    const body = await req.json();
    const updated = await ExperienceModel.findByIdAndUpdate(
      id,
      {
        role: body.role,
        company: body.company,
        period: body.period,
        location: body.location,
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
      },
      { new: true },
    );

    return NextResponse.json({ success: true, experience: updated });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const isAuthorized = await verifyAdminRequest();
  if (!isAuthorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json(
        { error: "MongoDB not connected" },
        { status: 503 },
      );
    }

    await ExperienceModel.findByIdAndDelete(id);
    return NextResponse.json({
      success: true,
      message: "Experience deleted successfully",
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}
