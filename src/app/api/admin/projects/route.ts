import { type NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { ProjectModel } from "@/models/Project";

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
    const projectId =
      body.projectId ||
      body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const newProject = await ProjectModel.create({
      projectId,
      title: body.title,
      category: body.category || "Full-Stack",
      shortDesc: body.shortDesc,
      fullDesc: body.fullDesc || body.shortDesc,
      image:
        body.image ||
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop",
      tags: Array.isArray(body.tags)
        ? body.tags
        : typeof body.tags === "string"
          ? body.tags.split(",").map((t: string) => t.trim())
          : [],
      demoUrl: body.demoUrl || "#",
      githubUrl: body.githubUrl || "#",
      metrics: body.metrics || { stars: "0", users: "0", performance: "100%" },
      featured: Boolean(body.featured),
      order: Number(body.order) || 0,
    });

    return NextResponse.json({ success: true, project: newProject });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}
