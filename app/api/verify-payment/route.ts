import { NextResponse } from "next/server";
import crypto from "crypto";
import { appendOrderToSheet } from "@/lib/googleSheets";
import { sendOwnerOrderEmail } from "@/lib/email";
import {
  formatProductDetails,
  getTotalQuantity,
} from "@/lib/orderMessage";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      customerDetails,
      cartItems,
      totalAmount,
    } = body;

    // 1. Verify Signature
    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      return NextResponse.json({ error: "Missing Razorpay secret" }, { status: 500 });
    }

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    // 2. Format Data
    const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    const productDetails = formatProductDetails(cartItems);
    const totalQty = getTotalQuantity(cartItems);

    // 3. Save to Google Sheets
    const sheetData = [
      timestamp,
      razorpay_order_id,
      razorpay_payment_id,
      customerDetails.fullName,
      customerDetails.phone,
      customerDetails.address,
      customerDetails.city,
      customerDetails.state,
      customerDetails.pincode,
      productDetails,
      totalQty,
      totalAmount,
      "Paid",
    ];
    await appendOrderToSheet(sheetData);

    // 4. Send owner email notification
    await sendOwnerOrderEmail({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      customerDetails,
      cartItems,
      totalAmount,
      paymentStatus: "Paid",
      orderTime: timestamp,
    });

    return NextResponse.json({ success: true, orderId: razorpay_order_id });
  } catch (error) {
    console.error("Verification Error:", error);
    return NextResponse.json({ error: "Server error during verification" }, { status: 500 });
  }
}
