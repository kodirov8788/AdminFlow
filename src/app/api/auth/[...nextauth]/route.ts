import { handlers } from "@/auth";

export const runtime = "nodejs"; // Prisma 7 PG Adapter requires full nodejs runtime, not edge
export const { GET, POST } = handlers;
