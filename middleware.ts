export { auth as middleware } from "@/auth";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/upload/:path*",
    "/resume/:path*",
    "/api/upload/:path*"
  ],
};
