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

    let userRole = session.user?.role;
    console.log("Orders API - User Role from session:", userRole, "User ID:", session.user.id);

    if (!userRole) 
    {
      const dbUser = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { role: true }
      });
      userRole = dbUser?.role;
      console.log("Orders API - User Role from DB:", userRole);
    }

    if (userRole !== "ADMIN") 
    {
      console.log("Access denied - Role is:", userRole);
      return NextResponse.json({ error: "Forbidden - Admin access required" }, { status: 403 });
    }

    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      select: 
      {
        id: true,
        totalPrice: true,
        status: true,
        createdAt: true,
        user: 
        {
          select: { id: true, name: true, email: true },
        },
        items: 
        {
          select: 
          {
            id: true,
            quantity: true,
            price: true,
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