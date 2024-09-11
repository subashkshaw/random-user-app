import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { parse } from "url";

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest) {
  try {
    const { query } = parse(req.url, true);
    const id = query.id || "";

    const deletedUser = await prisma.user.delete({
      where: { id: id.toString() },
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
