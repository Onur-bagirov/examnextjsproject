import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() 
{
  try 
  {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) 
    {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const cart = await prisma.cart.findUnique(
    {
      where: { userId: session.user.id },
      include: 
      {
        items: 
        {
          include: { product: true },
          orderBy: { createdAt: "asc" },
        },
      },
    });

    return NextResponse.json(cart || { id: null, items: [] });
  } 
  catch (error) 
  {
    console.error("Cart fetch error:", error);
    return NextResponse.json
    (
      { error: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) 
    {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { productId, quantity } = body;
    const qty = Number(quantity) > 0 ? Math.floor(Number(quantity)) : 1;

    if (!productId) 
    {
      return NextResponse.json
      (
        { error: "productId is required" },
        { status: 400 }
      );
    }

    const product = await prisma.product.findUnique({ where: { id: productId } });

    if (!product) 
    {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const cart = await prisma.cart.upsert(
    {
      where: { userId: session.user.id },
      update: {},
      create: { userId: session.user.id },
    });

    const existingItem = await prisma.cartItem.findUnique(
    {
      where: { cartId_productId: { cartId: cart.id, productId } },
    });

    if (existingItem) 
    {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + qty },
      });
    } 
    else 
    {
      await prisma.cartItem.create(
      {
        data: { cartId: cart.id, productId, quantity: qty },
      });
    }

    const updatedCart = await prisma.cart.findUnique(
    {
      where: { id: cart.id },
      include: 
      {
        items: 
        {
          include: { product: true },
          orderBy: { createdAt: "asc" },
        },
      },
    });

    return NextResponse.json(updatedCart, { status: 201 });
  } 
  catch (error) 
  {
    console.error("Cart add error:", error);
    return NextResponse.json(
      { error: "Failed to add item to cart" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try 
  {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) 
    {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { cartItemId } = body;

    if (!cartItemId) 
    {
      return NextResponse.json
      (
        { error: "cartItemId is required" },
        { status: 400 }
      );
    }

    const item = await prisma.cartItem.findUnique(
    {
      where: { id: cartItemId },
      include: { cart: true },
    });

    if (!item || item.cart.userId !== session.user.id) 
    {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    await prisma.cartItem.delete({ where: { id: cartItemId } });

    return NextResponse.json({ success: true });
  } 
  catch (error) 
  {
    console.error("Cart delete error:", error);
    return NextResponse.json
    (
      { error: "Failed to remove item" },
      { status: 500 }
    );
  }
}