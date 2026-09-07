"use typescript"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try 
  {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) 
    {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique(
    {
      where: { id: userId },
    });

    if (!user) 
    {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const cart = await prisma.cart.findUnique(
    {
      where: { userId },
      include: 
      {
        items: 
        {
          include: { product: true },
        },
      },
    });

    if (!cart || cart.items.length === 0) 
    {
      return NextResponse.json({ error: "The basket is empty." }, { status: 400 });
    }

    for (const item of cart.items) 
    {
      if (item.quantity > item.product.stock) 
      {
        return NextResponse.json
        (
          {
            error: `"${item.product.name}"There is insufficient stock of the product. (existing: ${item.product.stock})`,
          },
          { status: 400 }
        );
      }
    }

    let totalPrice = 0;
    const orderItems: { productId: string; quantity: number; price: number }[] = [];

    for (const item of cart.items) 
    {
      const itemPrice = item.product.price * item.quantity;
      totalPrice += itemPrice;
      orderItems.push(
      {
        productId: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
      });
    }

    if (user.balance < totalPrice) 
    {
      return NextResponse.json(
        {
          error: `You do not have sufficient funds in your balance. What is needed: ₼${totalPrice.toFixed(2)}, existing: ₼${user.balance.toFixed(2)}`,
        },
        { status: 400 }
      );
    }

    const order = await prisma.$transaction(async (tx) => 
    {
      const newOrder = await tx.order.create({
        data: 
        {
          userId,
          totalPrice,
          status: "COMPLETED",
          items: 
          {
            create: orderItems,
          },
        },
        include: 
        {
          items: 
          {
            include: { product: true },
          },
        },
      });

      await tx.user.update(
      {
        where: { id: userId },
        data: { balance: { decrement: totalPrice } },
      });

      for (const item of cart.items) 
      {
        await tx.product.update(
        {
          where: { id: item.product.id },
          data: { stock: { decrement: item.quantity } },
        });
      }

      await tx.cartItem.deleteMany({ where: { cartId: cart.id } });

      return newOrder;
    });

    return NextResponse.json(order, { status: 201 });
  } 
  catch (error) 
  {
    console.error(error);

    return NextResponse.json
    (
      { error: "Failed to process checkout" },
      { status: 500 }
    );
  }
}