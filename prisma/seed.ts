import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.product.deleteMany();
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
  console.log("✓ Admin created:", admin.email);

  const userPassword = await bcrypt.hash("User@12345", 10);
  const testUser = await prisma.user.create({
    data: {
      name: "Test User",
      email: "user@example.com",
      password: userPassword,
      role: "USER",
    },
  });
  console.log("✓ Test user created:", testUser.email);

  const product1 = await prisma.product.create({
    data: {
      name: "Classic Burger",
      description: "Delicious classic burger",
      price: 9.99,
      stock: 50,
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: "Cheese Burger",
      description: "Burger with melted cheese",
      price: 11.99,
      stock: 40,
    },
  });

  console.log("✓ Products created");

  const order1 = await prisma.order.create({
    data: {
      userId: testUser.id,
      totalPrice: 21.98,
      status: "PENDING",
      items: {
        create: [
          {
            productId: product1.id,
            quantity: 2,
            price: 9.99,
          },
        ],
      },
    },
  });

  const order2 = await prisma.order.create({
    data: {
      userId: testUser.id,
      totalPrice: 11.99,
      status: "COMPLETED",
      items: {
        create: [
          {
            productId: product2.id,
            quantity: 1,
            price: 11.99,
          },
        ],
      },
    },
  });

  console.log("✓ Orders created");

  const booking1 = await prisma.booking.create({
    data: {
      userId: testUser.id,
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      guests: 4,
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      time: "19:00",
      message: "Window seat preferred",
      status: "PENDING",
    },
  });

  const booking2 = await prisma.booking.create({
    data: {
      userId: testUser.id,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+0987654321",
      guests: 2,
      date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      time: "20:00",
      message: "Special occasion",
      status: "CONFIRMED",
    },
  });

  console.log("✓ Bookings created");
  console.log("\n✅ Seed completed successfully!");
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