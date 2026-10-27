import { type NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { MessageModel } from "@/models/Message";

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
    const updated = await MessageModel.findByIdAndUpdate(
      id,
      { read: Boolean(body.read) },
      { new: true },
    );

    return NextResponse.json({ success: true, message: updated });
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

    await MessageModel.findByIdAndDelete(id);
    return NextResponse.json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}
