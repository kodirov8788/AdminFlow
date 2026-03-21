import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";

/**
 * SaaS Multi-tenancy Context Helper
 * 
 * Retrieves the current user's active organization ID from the Auth.js session.
 * Automatically handles the redirection to Onboarding if no organization is found.
 */
export async function getTenantContext() {
  const session = await auth();

  // 1. Force Authentication
  if (!session?.user?.id) {
    redirect("/login");
  }

  // 2. Resolve Membership and Role (Cached in DB for the Org)
  // If the session has the orgId, we just verify membership.
  const orgId = session.user.orgId;
  const userId = session.user.id;

  if (!orgId) {
    // No active organization, redirect to onboarding
    redirect("/onboarding");
  }

  const membership = await prisma.membership.findUnique({
    where: {
      organizationId_userId: {
        organizationId: orgId,
        userId: userId,
      },
    },
    include: { organization: true },
  });

  if (!membership) {
    // If membership doesn't exist anymore, redirect to onboarding to re-initialize
    redirect("/onboarding");
  }

  return {
    orgId: membership.organizationId,
    orgSlug: membership.organization.slug,
    userId: membership.userId,
    role: membership.role,
    user: session.user,
  };
}

/**
 * Enforce RBAC (OWNER only)
 */
export async function requireOwner() {
  const context = await getTenantContext();
  if (context.role !== Role.OWNER) {
    throw new Error("UNAUTHORIZED: OWNER role required.");
  }
  return context;
}
