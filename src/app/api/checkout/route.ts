import { prisma } from "@/components/lib/prisma";
import { NextResponse } from "next/server";

// রিকোয়েস্ট বডির জন্য ইন্টারফেস
interface CheckoutRequest {
  amount: number | string;
  method: string;
}

export async function POST(req: Request) {
  try {
    // বডি পার্সিং এবং টাইপ কাস্টিং
    const body: CheckoutRequest = await req.json();
    const { amount, method } = body;

    if (!amount || !method) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    const order = await prisma.order.create({
      data: {
        userId: "user_01",
        amount: typeof amount === "string" ? parseFloat(amount) : amount,
        status: "PENDING",
        transactionId: `TXN_${Date.now()}`,
      },
    });

    return NextResponse.json({ success: true, order });
  } catch (error: unknown) {
    // unknown টাইপ ব্যবহার করে এরর হ্যান্ডলিং
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    console.error("API Error:", errorMessage);

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Checkout API is active. Please use POST to create an order.",
  });
}
