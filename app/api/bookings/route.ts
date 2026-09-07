import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
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
    console.log("Bookings API - User Role from session:", userRole, "User ID:", session.user.id);

    if (!userRole) 
    {
      const dbUser = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { role: true }
      });
      userRole = dbUser?.role;
      console.log("Bookings API - User Role from DB:", userRole);
    }

    if (userRole !== "ADMIN") 
    {
      console.log("Access denied - Role is:", userRole);
      return NextResponse.json({ error: "Forbidden - Admin access required" }, { status: 403 });
    }

    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
      select: 
      {
        id: true,
        name: true,
        email: true,
        phone: true,
        guests: true,
        date: true,
        time: true,
        message: true,
        status: true,
        createdAt: true,
        user: 
        {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return NextResponse.json(bookings);
  } 
  catch (error) 
  {
    console.error("Bookings fetch error:", error);
    return NextResponse.json
    (
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try 
  {
    const session = await getServerSession(authOptions);
    const body = await request.json();

    const { name, email, phone, guests, date, time, message } = body;

    if (!guests || !date || !time) 
    {
      return NextResponse.json
      (
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const guestsNumber = parseInt(guests, 10);

    if (Number.isNaN(guestsNumber) || guestsNumber < 1)
    {
      return NextResponse.json
      (
        { error: "Invalid guest count" },
        { status: 400 }
      );
    }

    const bookingDate = new Date(date);

    if (Number.isNaN(bookingDate.getTime())) 
    {
      return NextResponse.json({ error: "Invalid date" }, { status: 400 });
    }

    if (!session?.user?.id && !name) 
    {
      return NextResponse.json
      (
        { error: "Name is required" },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.create(
    {
      data: 
      {
        userId: session?.user?.id || null,
        name: name || session?.user?.name || "Guest",
        email: email || session?.user?.email || null,
        phone: phone || null,
        guests: guestsNumber,
        date: bookingDate,
        time,
        message: message || null,
        status: "PENDING",
      },
    });

    return NextResponse.json(booking, { status: 201 });
  } 
  catch (error) 
  {
    console.error("Booking creation error:", error);

    return NextResponse.json
    (
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}