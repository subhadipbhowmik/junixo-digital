// root/app/api/admin/login/route.ts


import { NextRequest, NextResponse } from "next/server";

const USERNAME = process.env.ADMIN_USERNAME;
const PASSWORD = process.env.ADMIN_PASSWORD;
const SESSION_COOKIE = "junixo_admin_session";
const VALID_TOKEN = btoa(`${USERNAME}:${PASSWORD}`);

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (username === USERNAME && password === PASSWORD) {
      const response = NextResponse.json({ success: true });
      response.cookies.set(SESSION_COOKIE, VALID_TOKEN, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });
      return response;
    }

    return NextResponse.json(
      { success: false, error: "Invalid username or password." },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Bad request." },
      { status: 400 }
    );
  }
}