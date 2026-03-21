import { PrismaClient, Role } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });


async function main() {
  const email = "admin@adminflow.com";
  const orgName = "Acme Inc";
  const slug = "acme-inc";

  console.log("🌱 Seeding SaaS database...");

  // 1. Create User
  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name: "Admin User",
    },
  });

  // 2. Create Organization
  const org = await prisma.organization.upsert({
    where: { slug },
    update: {},
    create: {
      name: orgName,
      slug,
    },
  });

  // 3. Create Membership (OWNER)
  await prisma.membership.upsert({
    where: {
      organizationId_userId: {
        organizationId: org.id,
        userId: user.id,
      },
    },
    update: {},
    create: {
      role: Role.OWNER,
      organizationId: org.id,
      userId: user.id,
    },
  });

  // 4. Create Initial Projects
  const projectData = [
    { name: "Global Expansion", description: "Market entry strategy for APAC region.", status: "IN_PROGRESS" },
    { name: "Core Infrastructure", description: "Upgrading to Prisma 7 and Next.js 15.", status: "COMPLETED" },
    { name: "User Research", description: "Interviewing top 20 SaaS customers.", status: "ACTIVE" },
  ];

  for (const p of projectData) {
    await prisma.project.create({
      data: {
        ...p,
        organizationId: org.id,
      },
    });
  }

  console.log("✅ Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
