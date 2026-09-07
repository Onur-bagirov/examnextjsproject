import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  try 
  {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) 
    {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role !== "ADMIN") 
    {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: 
      {
        user: 
        {
          select: { id: true, name: true, email: true },
        },
        items: 
        {
          include: 
          {
            product: 
            {
              select: { id: true, name: true },
            },
          },
        },
      },
    });

    return NextResponse.json(orders);
  } 
  catch (error) 
  {
    console.error("Orders fetch error:", error);
    return NextResponse.json
    (
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}