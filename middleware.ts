// root/middleware.ts


import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "junixo_admin_session";
// Simple token: base64 of credentials — checked server-side only (httpOnly cookie)
export const VALID_TOKEN = btoa("shubhadipdev:Shubhadipdev@721629");

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only intercept /admin/* routes
  if (!pathname.startsWith("/admin")) return NextResponse.next();

  // Let the login page through always
  if (pathname === "/admin/login") return NextResponse.next();

  // Check session cookie
  const session = request.cookies.get(SESSION_COOKIE);

  if (!session || session.value !== VALID_TOKEN) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};