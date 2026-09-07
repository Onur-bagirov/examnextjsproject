"use typescript"
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // User ID header-dən al
    const userId = request.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // User-i al
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Səbəti al
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Cəmi qiymətini hesabla
    let totalPrice = 0;
    const orderItems = [];

    for (const item of cart.items) {
      const itemPrice = item.product.price * item.quantity;
      totalPrice += itemPrice;
      orderItems.push({
        productId: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
      });

      // Stock-dan çıxart
      await prisma.product.update({
        where: { id: item.product.id },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    }

    // Balance kontrol
    if (user.balance < totalPrice) {
      return NextResponse.json(
        { error: "Insufficient balance" },
        { status: 400 }
      );
    }

    // Order yaratdır
    const order = await prisma.order.create({
      data: {
        userId,
        totalPrice,
        status: "COMPLETED",
        items: {
          create: orderItems,
        },
      },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    // User-in balansından çıxart
    await prisma.user.update({
      where: { id: userId },
      data: {
        balance: {
          decrement: totalPrice,
        },
      },
    });

    // Səbəti boşalt
    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to process checkout" },
      { status: 500 }
    );
  }
}