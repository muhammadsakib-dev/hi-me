import { NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/auth";

export async function GET() {
  const isAuthorized = await verifyAdminRequest();

  if (!isAuthorized) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({ authenticated: true });
}
