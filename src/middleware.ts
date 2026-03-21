import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  // Protect all routes except (api, _next/static, _next/image, favicon, login, logo)
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login|next.svg|vercel.svg).*)'],
};
