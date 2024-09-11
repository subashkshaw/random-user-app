import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { parse } from "url";

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest) {
  try {
    const { query } = parse(req.url, true);
    const { id } = query;

    if (typeof id !== "string") {
      return NextResponse.json(
        { error: "Invalid parameters" },
        { status: 400 }
      );
    }
    const allUsers = await prisma.user.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json(allUsers, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing the request." },
      { status: 500 }
    );
  }
}
