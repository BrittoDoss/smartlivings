import { timingSafeEqual } from "crypto";
import { SignJWT, jwtVerify } from "jose";

export const ADMIN_COOKIE_NAME = "smartlivings_admin_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

function getSessionSecretKey() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("Missing ADMIN_SESSION_SECRET.");
  }
  return new TextEncoder().encode(secret);
}

function safeEquals(a: string, b: string): boolean {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);

  if (aBuffer.length !== bBuffer.length) {
    return false;
  }

  return timingSafeEqual(aBuffer, bBuffer);
}

export function validateAdminCredentials(username: string, password: string): boolean {
  const expectedUsername = process.env.ADMIN_USERNAME;
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (!expectedUsername || !expectedPassword) {
    throw new Error("Missing ADMIN_USERNAME or ADMIN_PASSWORD.");
  }

  return safeEquals(username, expectedUsername) && safeEquals(password, expectedPassword);
}

export async function createAdminSessionToken(username: string): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(username)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE_SECONDS}s`)
    .sign(getSessionSecretKey());
}

export async function verifyAdminSessionToken(token: string): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(token, getSessionSecretKey(), {
      algorithms: ["HS256"],
    });

    return payload.role === "admin";
  } catch {
    return false;
  }
}

export function getSessionMaxAge(): number {
  return SESSION_MAX_AGE_SECONDS;
}
