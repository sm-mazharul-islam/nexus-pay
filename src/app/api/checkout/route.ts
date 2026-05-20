import { prisma } from "@/components/lib/prisma";
import { NextResponse } from "next/server";

// রিকোয়েস্ট বডির জন্য টাইপ ইন্টারফেস
interface CheckoutRequest {
  amount: number | string;
  method?: string; // ঐচ্ছিক, প্রয়োজনে ব্যবহার করবেন
}

export async function POST(req: Request) {
  try {
    // ১. রিকোয়েস্ট থেকে বডি পার্স করা
    const body: CheckoutRequest = await req.json();
    const { amount, method } = body;

    // ২. অ্যামাউন্ট ভ্যালিডেশন (যদি অ্যামাউন্ট না থাকে বা জিরো হয়)
    if (!amount || parseFloat(amount.toString()) <= 0) {
      return NextResponse.json(
        { success: false, error: "Valid amount is required" },
        { status: 400 },
      );
    }

    // ৩. ডাটাবেসে অর্ডার ক্রিয়েট করা
    const order = await prisma.order.create({
      data: {
        userId: "user_01", // আপনি চাইলে এখান থেকে ডাইনামিক ইউজার আইডি নিতে পারেন
        amount: parseFloat(amount.toString()),
        status: "PAID",
        transactionId: `TXN_${Date.now()}`,
      },
    });

    // ৪. সফল রেসপন্স
    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error: unknown) {
    // ৫. এরর হ্যান্ডলিং (প্রোডাকশনের জন্য নিরাপদ)
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    console.error("API Error:", errorMessage);

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 },
    );
  }
}

// GET মেথড: ব্রাউজার বা অন্য কোনো সাইট থেকে রিকোয়েস্ট চেক করার জন্য
export async function GET() {
  return NextResponse.json({
    message: "Checkout API is active. Please use POST to create an order.",
    status: 200,
  });
}
