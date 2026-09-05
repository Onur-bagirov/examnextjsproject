import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();

  const adminPassword = await bcrypt.hash("Admin@12345", 10);
  const admin = await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@example.com",
      password: adminPassword,
      role: "ADMIN",
    },
  });
  console.log("✓ Admin created:", admin);

  const userPassword = await bcrypt.hash("User@12345", 10);
  const testUser = await prisma.user.create({
    data: {
      name: "Test User",
      email: "user@example.com",
      password: userPassword,
      role: "USER",
    },
  });
  console.log("✓ Test user created:", testUser);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });