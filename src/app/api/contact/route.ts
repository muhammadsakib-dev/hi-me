import { type NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { MessageModel } from "@/models/Message";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required." },
        { status: 400 },
      );
    }

    const conn = await connectToDatabase();

    if (conn) {
      const savedMessage = await MessageModel.create({
        name,
        email,
        subject: subject || "Portfolio Inquiry",
        message,
        read: false,
      });

      return NextResponse.json({
        success: true,
        message: "Message received and saved successfully!",
        id: savedMessage._id,
      });
    }

    // Local fallback when MongoDB is offline
    console.log("Contact form submission (local fallback):", {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Message received successfully (offline mode)!",
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { success: false, error: err.message || "Failed to process message." },
      { status: 500 },
    );
  }
}
