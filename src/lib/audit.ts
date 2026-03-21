import prisma from "@/lib/prisma";

type AuditAction = "CREATE" | "UPDATE" | "DELETE" | "INVITE" | "JOIN" | "LEAVE";
type EntityType = "PROJECT" | "MEMBER" | "ORGANIZATION";

interface AuditParams {
  orgId: string;
  userId: string;
  action: AuditAction;
  entityType: EntityType;
  entityId: string;
  details?: any;
}

/**
 * Global SaaS Audit Logger
 * 
 * Records an immutable entry of a business-critical action.
 */
export async function logActivity({
    orgId,
    userId,
    action,
    entityType,
    entityId,
    details = {},
}: AuditParams) {
    try {
        await prisma.auditLog.create({
            data: {
                organizationId: orgId,
                userId: userId,
                action: action,
                entityType: entityType,
                entityId: entityId,
                details: details,
            },
        });
    } catch (error) {
        console.error("🔥 [AUDIT_ERROR]: Failed to record activity log", error);
        // We typically don't fail the primary mutation if auditing fails,
        // but in high-compliance environments, you would throw here.
    }
}
