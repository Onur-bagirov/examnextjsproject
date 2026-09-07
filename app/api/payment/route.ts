import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try 
  {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) 
    {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { cardNumber, cardName, expiryMonth, expiryYear, cvv, amount } = body;

    if (!cardNumber || !cardName || !expiryMonth || !expiryYear || !cvv || !amount)
    {
      return NextResponse.json
      (
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (amount <= 0) 
    {
      return NextResponse.json
      (
        { error: "Amount must be greater than 0" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique(
    {
      where: { email: session.user.email },
    });

    if (!user) 
    {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updatedUser = await prisma.user.update(
    {
      where: { email: session.user.email },
      data: 
      {
        balance: 
        {
          increment: amount,
        },
      },
    });

    return NextResponse.json(
    {
      success: true,
      message: "Payment processed successfully",
      newBalance: updatedUser,
    });
  } 
  catch (error) 
  {
    console.error("Payment error:", error);

    return NextResponse.json
    (
      { error: "Payment processing failed" },
      { status: 500 }
    );
  }
}