import { type NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { ProjectModel } from "@/models/Project";

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
    const updated = await ProjectModel.findByIdAndUpdate(
      id,
      {
        title: body.title,
        category: body.category,
        shortDesc: body.shortDesc,
        fullDesc: body.fullDesc,
        image: body.image,
        tags: Array.isArray(body.tags)
          ? body.tags
          : typeof body.tags === "string"
            ? body.tags.split(",").map((t: string) => t.trim())
            : [],
        demoUrl: body.demoUrl,
        githubUrl: body.githubUrl,
        metrics: body.metrics,
        featured: Boolean(body.featured),
        order: Number(body.order) || 0,
      },
      { new: true },
    );

    return NextResponse.json({ success: true, project: updated });
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

    await ProjectModel.findByIdAndDelete(id);
    return NextResponse.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}
