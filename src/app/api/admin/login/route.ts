import { type NextRequest, NextResponse } from "next/server";
import { createSessionToken, verifyAdminPassword } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (!password || !verifyAdminPassword(password)) {
      return NextResponse.json(
        { success: false, error: "Invalid admin password" },
        { status: 401 },
      );
    }

    const token = createSessionToken();
    const response = NextResponse.json({
      success: true,
      message: "Admin authentication successful",
    });

    response.cookies.set({
      name: "admin_session",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}
