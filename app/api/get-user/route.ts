import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { parse } from "url";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { query } = parse(req.url, true);
    console.log(query, "Query");

    const sortBy: any = query.sortBy || "firstName";
    const sortOrder: any = query.sortOrder || "asc";

    const allUsers = await prisma.user.findMany({
      orderBy: {
        [sortBy]: sortOrder,
      },
    });
    console.log(allUsers, "All User");

    return NextResponse.json({ allUsers }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing the get request." },
      { status: 500 }
    );
  }
}
