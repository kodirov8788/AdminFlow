"use server";

import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";

export async function createTenant(name: string, email: string) {
  try {
    const slug = name.toLowerCase().replace(/ /g, "-");

    const result = await prisma.$transaction(async (tx) => {
      // 1. Create the User (if doesn't exist)
      const user = await tx.user.upsert({
        where: { email },
        update: {},
        create: { email, name: email.split("@")[0] },
      });

      // 2. Create the Organization
      const org = await tx.organization.create({
        data: {
          name,
          slug,
        },
      });

      // 3. Create the Membership (OWNER)
      const membership = await tx.membership.create({
        data: {
          role: Role.OWNER,
          organization: { connect: { id: org.id } },
          user: { connect: { id: user.id } },
        },
      });

      // 4. Create Audit Log
      await tx.auditLog.create({
        data: {
          action: "INITIAL_TENANT_CREATE",
          entityType: "ORGANIZATION",
          entityId: org.id,
          organizationId: org.id,
          userId: user.id,
          details: {
            orgName: name,
            ownerEmail: email,
          },
        },
      });

      return { org, user, membership };
    });

    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to create tenant:", error);
    return { success: false, error: "Database transaction failed." };
  }
}
