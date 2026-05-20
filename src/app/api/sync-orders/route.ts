import { prisma } from "@/components/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // অন্য ওয়েবসাইট থেকে আসা ডাটা সেভ করা
    const newOrder = await prisma.order.create({
      data: {
        userId: data.userId || "guest_user",
        amount: parseFloat(data.amount),
        status: "PENDING",
        transactionId: `SYNC_${Date.now()}`,
      },
    });

    return NextResponse.json({ success: true, order: newOrder });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Sync Failed" },
      { status: 500 },
    );
  }
}
