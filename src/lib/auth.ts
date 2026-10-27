import crypto from "node:crypto";
import { cookies } from "next/headers";

const ADMIN_SECRET =
  process.env.ADMIN_SECRET || "default-chatfolio-secret-key-change-in-env";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin1234";

export function createSessionToken(): string {
  const timestamp = Date.now().toString();
  const hmac = crypto
    .createHmac("sha256", ADMIN_SECRET)
    .update(timestamp)
    .digest("hex");
  return `${timestamp}.${hmac}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [timestamp, hash] = parts;
  const tokenAge = Date.now() - Number(timestamp);
  // Token valid for 7 days
  if (Number.isNaN(tokenAge) || tokenAge > 7 * 24 * 60 * 60 * 1000) {
    return false;
  }

  const expectedHash = crypto
    .createHmac("sha256", ADMIN_SECRET)
    .update(timestamp)
    .digest("hex");

  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(expectedHash));
}

export async function verifyAdminRequest(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  return verifySessionToken(token);
}

export function verifyAdminPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}
