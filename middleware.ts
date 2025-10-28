import { headers } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export const config = {
  matcher: [
    "/dataset/:path*", // Protect dataset
    "/admin/:path*", // Protect admin pages
  ],
  runtime: "nodejs",
};

export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  const pathname = request.nextUrl.pathname;

  // Require email verification for /dataset access
  if (pathname.startsWith("/dataset") && !session.user.emailVerified) {
    return NextResponse.redirect(new URL("/auth/waiting-verification", request.url));
  }

  // Require admin role for admin pages
  if (pathname.startsWith("/admin") && session.user.role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
