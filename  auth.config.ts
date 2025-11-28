// auth.config.ts
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: '/auth',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnProtectedRoute = 
        nextUrl.pathname.startsWith('/dashboard') ||
        nextUrl.pathname.startsWith('/upload') ||
        nextUrl.pathname.startsWith('/resume') ||
        nextUrl.pathname.startsWith('/api/upload');
      
      if (isOnProtectedRoute && !isLoggedIn) {
        return false; 
      }
      
      return true;
    },
  },
  providers: [], 
} satisfies NextAuthConfig;