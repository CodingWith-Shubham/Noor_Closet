import { NextResponse } from "next/server";
import crypto from "crypto";
import { appendOrderToSheet } from "@/lib/googleSheets";
import { sendOwnerOrderEmail } from "@/lib/email";
import { getRazorpayClient } from "@/lib/razorpay";
import { InvalidCartError, priceCart } from "@/lib/serverCart";
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
    } = body;

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      return NextResponse.json({ error: "Missing Razorpay secret" }, { status: 500 });
    }

    if (
      typeof razorpay_order_id !== "string" ||
      typeof razorpay_payment_id !== "string" ||
      typeof razorpay_signature !== "string"
    ) {
      return NextResponse.json({ error: "Invalid payment details" }, { status: 400 });
    }

    const pricedCart = priceCart(cartItems);
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");
    const expectedBuffer = Buffer.from(expectedSignature, "hex");
    const receivedBuffer = Buffer.from(razorpay_signature, "hex");

    if (
      expectedBuffer.length !== receivedBuffer.length ||
      !crypto.timingSafeEqual(expectedBuffer, receivedBuffer)
    ) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    const razorpay = getRazorpayClient();
    const [order, payment] = await Promise.all([
      razorpay.orders.fetch(razorpay_order_id),
      razorpay.payments.fetch(razorpay_payment_id),
    ]);
    const orderFingerprint = String(order.notes?.cart_fingerprint ?? "");

    if (
      Number(order.amount) !== pricedCart.totalAmountPaise ||
      order.currency !== "INR" ||
      orderFingerprint !== pricedCart.fingerprint ||
      payment.order_id !== razorpay_order_id ||
      Number(payment.amount) !== pricedCart.totalAmountPaise ||
      payment.currency !== "INR"
    ) {
      return NextResponse.json(
        { error: "Payment does not match the order" },
        { status: 400 }
      );
    }

    const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    const productDetails = formatProductDetails(pricedCart.cartItems);
    const totalQty = getTotalQuantity(pricedCart.cartItems);

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
      pricedCart.totalAmount,
      "Paid",
    ];
    await appendOrderToSheet(sheetData);

    await sendOwnerOrderEmail({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      customerDetails,
      cartItems: pricedCart.cartItems,
      totalAmount: pricedCart.totalAmount,
      paymentStatus: "Paid",
      orderTime: timestamp,
    });

    return NextResponse.json({
      success: true,
      orderId: razorpay_order_id,
      amount: pricedCart.totalAmount,
    });
  } catch (error) {
    console.error("Verification Error:", error);
    if (error instanceof InvalidCartError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Server error during verification" }, { status: 500 });
  }
}
