import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    console.log("Received DELETE request with ID:", id);

    if (!id || typeof id !== "string") {
      console.warn("Invalid ID:", id);
      return NextResponse.json(
        { error: "ID is required and must be a string." },
        { status: 400 }
      );
    }

    const deletedUser = await prisma.user.delete({
      where: { id },
    });

    console.log("Deleted user:", deletedUser);

    return NextResponse.json({ deletedUser }, { status: 200 });
  } catch (error) {
    console.error("Error during DELETE request:", error);
    return NextResponse.json(
      { error: "An error occurred while processing the delete request." },
      { status: 500 }
    );
  }
}
