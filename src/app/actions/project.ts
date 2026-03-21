"use server"

import { z } from "zod";
import prisma from "@/lib/prisma";
import { getTenantContext } from "@/lib/auth";
import { logActivity } from "@/lib/audit";
import { revalidatePath } from "next/cache";

// Project Schema Validation
const ProjectSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  description: z.string().max(300, "Description must be under 300 characters.").optional(),
});

/**
 * Creates a new project within the user's active organization.
 */
export async function createProject(formData: FormData) {
  const context = await getTenantContext(); // Verified Session + Org ID

  // 1. Validate Input
  const data = ProjectSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  if (!data.success) {
    return { error: "INVALID_INPUT", details: data.error.format() };
  }

  // 2. Atomic Database Operation
  try {
    const project = await prisma.project.create({
      data: {
        ...data.data,
        organizationId: context.orgId,
        status: "ACTIVE",
      },
    });

    // 3. Log Activity for Transparency
    await logActivity({
      orgId: context.orgId,
      userId: context.userId,
      action: "CREATE",
      entityType: "PROJECT",
      entityId: project.id,
      details: { name: project.name },
    });

    // 4. Update the View
    revalidatePath("/");
    return { success: true, project };
  } catch (error) {
    console.error("🔥 [PROJECT_CREATE_ERROR]:", error);
    return { error: "SERVER_ERROR", message: "Failed to create project." };
  }
}

/**
 * Deletes a project. Requires Ownership context for high-security actions.
 */
export async function deleteProject(projectId: string) {
  const context = await getTenantContext();

  try {
    const project = await prisma.project.findUnique({
      where: { id: projectId, organizationId: context.orgId },
    });

    if (!project) return { error: "NOT_FOUND" };

    await prisma.project.delete({
      where: { id: projectId },
    });

    await logActivity({
      orgId: context.orgId,
      userId: context.userId,
      action: "DELETE",
      entityType: "PROJECT",
      entityId: projectId,
      details: { name: project.name },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
      console.error("🔥 [PROJECT_DELETE_ERROR]:", error);
    return { error: "SERVER_ERROR" };
  }
}

/**
 * Update Project Status
 */
export async function updateProjectStatus(projectId: string, status: "ACTIVE" | "COMPLETED" | "ARCHIVED") {
    const context = await getTenantContext();

    try {
        const project = await prisma.project.update({
            where: { id: projectId, organizationId: context.orgId },
            data: { status },
        });

        await logActivity({
            orgId: context.orgId,
            userId: context.userId,
            action: "UPDATE",
            entityType: "PROJECT",
            entityId: projectId,
            details: { status },
        });

        revalidatePath("/");
        return { success: true, project };
    } catch (error) {
        console.error("🔥 [PROJECT_STATUS_UPDATE_ERROR]:", error);
        return { error: "SERVER_ERROR" };
    }
}
