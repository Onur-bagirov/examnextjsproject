import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

const VALID_STATUSES = ["PENDING", "CONFIRMED", "CANCELLED"];

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) 
{
  try 
  {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) 
    {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const booking = await prisma.booking.findUnique({ where: { id } });

    if (!booking) 
    {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    const isAdmin = session.user.role === "ADMIN";
    const isOwner = booking.userId === session.user.id;

    if (!isAdmin && !isOwner) 
    {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { status } = body;

    if (!status || !VALID_STATUSES.includes(status)) 
    {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    if (!isAdmin && status !== "CANCELLED") 
    {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const updated = await prisma.booking.update(
    {
      where: { id },
      data: { status },
    });

    return NextResponse.json(updated);
  } 
  catch (error) 
  {
    console.error("Booking update error:", error);
    return NextResponse.json(
      { error: "Failed to update booking" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try 
  {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) 
    {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role !== "ADMIN") 
    {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const booking = await prisma.booking.findUnique({ where: { id } });

    if (!booking) 
    {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    await prisma.booking.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } 
  catch (error) 
  {
    console.error("Booking delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete booking" },
      { status: 500 }
    );
  }
}