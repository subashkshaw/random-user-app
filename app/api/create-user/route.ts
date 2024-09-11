import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { data } = await axios.get("https://randomuser.me/api");
    console.log(data, "User Data");

    const {
      name: { first, last },
      dob: { age },
    } = data.results[0];
    console.log(first, last, age, "User info");

    const newUser = await prisma.user.create({
      data: {
        firstName: first.toString(),
        lastName: last.toString(),
        age: parseInt(age),
      },
    });

    return NextResponse.json({ test: data, newUser }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing the create request." },
      { status: 500 }
    );
  }
}
