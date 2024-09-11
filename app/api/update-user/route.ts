import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { parse } from "url";

const prisma = new PrismaClient();

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, firstName, lastName, age } = body;

    if (
      typeof id !== "string" ||
      typeof firstName !== "string" ||
      typeof lastName !== "string" ||
      typeof age !== "number"
    ) {
      return NextResponse.json(
        { error: "Invalid parameters" },
        { status: 400 }
      );
    }

    const ageInt = parseInt(age as any, 10);

    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        firstName: firstName,
        lastName: lastName,
        age: ageInt,
      },
    });
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing the update request." },
      { status: 500 }
    );
  }
}
