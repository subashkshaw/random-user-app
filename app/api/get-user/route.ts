import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { parse } from "url";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { query } = parse(req.url, true);

    const sortBy: any = query.sortBy;
    const sortOrder: any = query.sortOrder;

    const allUsers = await prisma.user.findMany({
      orderBy: {
        [sortBy]: sortOrder,
      },
    });

    return NextResponse.json({ allUsers }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing the get request." },
      { status: 500 }
    );
  }
}
