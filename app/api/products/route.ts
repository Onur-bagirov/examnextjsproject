"use typescript"
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// GET - Bütün burgerləri al
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST - Yeni burger yaratdır
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const stock = parseInt(formData.get("stock") as string);
    const imageFile = formData.get("image") as File;

    // Validasyon
    if (!name || !price || !stock) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Şəkil upload
    let imagePath = null;
    if (imageFile) {
      const buffer = await imageFile.arrayBuffer();
      const filename = `${Date.now()}-${imageFile.name}`;
      imagePath = `/uploads/${filename}`;

      const fs = require("fs").promises;
      const path = require("path");
      const uploadDir = path.join(process.cwd(), "public/uploads");

      await fs.writeFile(
        path.join(uploadDir, filename),
        Buffer.from(buffer)
      );
    }

    // Database-ə yazılır
    const product = await prisma.product.create({
      data: {
        name,
        description: description || null,
        price,
        stock,
        image: imagePath,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}