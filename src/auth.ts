import NextAuth, { type DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { authConfig } from "./auth.config";
import prisma from "./lib/prisma";
import GitHub from "next-auth/providers/github"; // Added GitHub import

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

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [GitHub], // Added GitHub provider
  ...authConfig,
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user, trigger, session }) {
      if (user) {
        // Initial sign in: Link to the user's primary organization
        const membership = await prisma.membership.findFirst({
          where: { userId: user.id },
          include: { organization: true },
        });

        token.id = user.id;
        token.orgId = membership?.organizationId;
        token.orgSlug = membership?.organization?.slug;
      }

      if (trigger === "update" && session?.orgId) {
        token.orgId = session.orgId;
        token.orgSlug = session.orgSlug;
      }

      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.orgId = token.orgId as string;
        session.user.orgSlug = token.orgSlug as string;
      }
      return session;
    },
  },
});
