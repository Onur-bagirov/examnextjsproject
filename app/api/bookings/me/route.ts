import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
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

    const bookings = await prisma.booking.findMany(
    {
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(bookings);
  } 
  catch (error) 
  {
    console.error("My bookings fetch error:", error);
    return NextResponse.json
    (
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}