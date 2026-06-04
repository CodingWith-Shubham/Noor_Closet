import { NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay";

export async function POST(req: Request) {
  try {
    const { amount } = await req.json();

    const options = {
      amount: amount * 100, // Razorpay works in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({ orderId: order.id }, { status: 200 });
  } catch (error) {
    console.error("Create Order Error:", error);
    return NextResponse.json({ error: "Error creating order" }, { status: 500 });
  }
}