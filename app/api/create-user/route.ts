import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { data } = await axios.get("https://randomuser.me/api");
    console.log("Fetched data:", data);

    const result = data.results[0];
    if (!result || !result.name || !result.dob) {
      throw new Error("Invalid data format");
    }

    const {
      name: { first, last },
      dob: { age },
    } = result;

    console.log("User info:", first, last, age);

    const newUser = await prisma.user.create({
      data: {
        firstName: first.toString(),
        lastName: last.toString(),
        age: parseInt(age, 10),
      },
    });

    return NextResponse.json({ test: data, newUser }, { status: 200 });
  } catch (error) {
    console.error("Error occurred while creating user:", error);
    return NextResponse.json(
      { error: "An error occurred while processing the create request." },
      { status: 500 }
    );
  }
}
