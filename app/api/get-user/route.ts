import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const query = url.searchParams;

    const sortBy = query.get("sortBy") || "firstName";
    const sortOrder = query.get("sortOrder") || "asc";

    // Validate sort parameters
    const validSortFields = ["firstName", "lastName", "age"]; // Example valid fields
    if (
      !validSortFields.includes(sortBy) ||
      !["asc", "desc"].includes(sortOrder)
    ) {
      return NextResponse.json(
        { error: "Invalid sort parameters" },
        { status: 400 }
      );
    }

    const allUsers = await prisma.user.findMany({
      orderBy: {
        [sortBy]: sortOrder,
      },
    });

    return NextResponse.json(
      { allUsers, query: Object.fromEntries(query.entries()) },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing the get request." },
      { status: 500 }
    );
  }
}
