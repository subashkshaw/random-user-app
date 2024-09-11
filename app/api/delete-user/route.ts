import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const query = url.searchParams;
    const id = query.get("id");

    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { error: "ID is required and must be a string." },
        { status: 400 }
      );
    }

    const deletedUser = await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({ deletedUser }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing the delete request." },
      { status: 500 }
    );
  }
}
