import NextAuth, { type DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { authConfig } from "./auth.config";
import prisma from "./lib/prisma";

// Extend Session and JWT types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      orgId?: string;
      orgSlug?: string;
    } & DefaultSession["user"]
  }
}

export const { 
  auth, 
  signIn, 
  signOut,
  handlers: { GET, POST } 
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" }, 
  callbacks: {
    ...authConfig.callbacks, // Include basic authorized check from edge config
    async jwt({ token, user }) {
      if (user) {
        // Find the user's primary organization mapping on first login
        const membership = await prisma.membership.findFirst({
          where: { userId: user.id },
          include: { organization: true },
        });
        
        if (membership) {
          token.orgId = membership.organizationId;
          token.orgSlug = membership.organization.slug;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
        session.user.orgId = token.orgId as string | undefined;
        session.user.orgSlug = token.orgSlug as string | undefined;
      }
      return session;
    },
  },
  ...authConfig,
  providers: authConfig.providers, // Ensure providers from edge config are present
});
