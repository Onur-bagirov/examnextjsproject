import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  try 
  {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) 
    {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique(
    {
      where: { email: session.user.email },
      select: 
      {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
      },
    });

    if (!user) 
    {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } 
  catch (error) 
  {
    console.error("Verify error:", error);

    return NextResponse.json
    (
      { error: "Verification failed" },
      { status: 500 }
    );
  }
}