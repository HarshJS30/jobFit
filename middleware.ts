// middleware.ts
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnDashboard = req.nextUrl.pathname.startsWith("/dashboard");
  const isOnUpload = req.nextUrl.pathname.startsWith("/upload");
  const isOnResume = req.nextUrl.pathname.startsWith("/resume");
  const isOnProtectedAPI = req.nextUrl.pathname.startsWith("/api/upload");

  const isOnProtectedRoute = isOnDashboard || isOnUpload || isOnResume || isOnProtectedAPI;

  if (isOnProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth", req.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/(dashboard|upload|resume)/:path*",
    "/api/upload/:path*"
  ],
};