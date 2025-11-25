export { auth as proxy } from "@/auth";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/upload/:path*",
    "/resume/:path*",
    "/api/upload/:path*"
  ],
};