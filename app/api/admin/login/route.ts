import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  createAdminSessionToken,
  getSessionMaxAge,
  validateAdminCredentials,
} from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { username?: string; password?: string };
    const username = (body.username ?? "").trim();
    const password = body.password ?? "";

    if (!username || !password) {
      return NextResponse.json(
        { message: "Username and password are required." },
        { status: 400 },
      );
    }

    const isValid = validateAdminCredentials(username, password);
    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid admin credentials." },
        { status: 401 },
      );
    }

    const token = await createAdminSessionToken(username);
    const response = NextResponse.json({ message: "Login successful." }, { status: 200 });
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: getSessionMaxAge(),
    });

    return response;
  } catch (error) {
    console.error("[admin/login] error:", error);
    return NextResponse.json(
      { message: "Unable to log in right now." },
      { status: 500 },
    );
  }
}
