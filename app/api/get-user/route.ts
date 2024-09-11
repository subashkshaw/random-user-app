import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { parse } from "url";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { query } = parse(req.url, true);

    const sortBy = (query.sortBy as string) || "firstName";
    const sortOrder = (query.sortOrder as string) || "asc";

    const allUsers = await prisma.user.findMany({
      orderBy: {
        [sortBy]: sortOrder,
      },
    });

    return NextResponse.json({ allUsers, query }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing the request." },
      { status: 500 }
    );
  }
}
