import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try 
  {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) 
    {
      return NextResponse.json
      (
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique(
    {
      where: { email },
    });

    if (existingUser) 
    {
      return NextResponse.json
      (
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: 
      {
        name,
        email,
        password: hashedPassword,
        role: "USER",
      },
    });

    return NextResponse.json(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      { status: 201 }
    );
  } 
  catch (error) 
  {
    console.error("User creation error:", error);

    return NextResponse.json
    (
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try 
  {
    const users = await prisma.user.findMany(
    {
      select: 
      {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json(users, { status: 200 });
  } 
  catch (error) 
  {
    console.error("Failed to fetch users:", error);

    return NextResponse.json
    (
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}