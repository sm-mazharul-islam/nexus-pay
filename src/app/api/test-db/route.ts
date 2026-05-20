import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // ডাটাবেসে কানেক্ট করার চেষ্টা করা হচ্ছে
    await prisma.$connect();
    return NextResponse.json({ message: "Database Connected Successfully!" });
  } catch (error) {
    return NextResponse.json(
      { error: "Database Connection Failed" },
      { status: 500 },
    );
  }
}
