import { NextResponse } from "next/server";
import crypto from "crypto";
import { appendOrderToSheet, findOrderByPaymentId } from "@/lib/googleSheets";
import { sendOwnerOrderEmail } from "@/lib/email";
import { getRazorpayClient } from "@/lib/razorpay";
import {
  InvalidCheckoutTokenError,
  verifyCheckoutToken,
} from "@/lib/checkoutToken";
import { InvalidCartError, priceCart } from "@/lib/serverCart";
import {
  formatProductDetails,
  getTotalQuantity,
} from "@/lib/orderMessage";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      razorpay_payment_id,
      razorpay_signature,
      checkoutToken,
      customerDetails,
    } = body;

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      return NextResponse.json({ error: "Missing Razorpay secret" }, { status: 500 });
    }

    if (
      typeof razorpay_payment_id !== "string" ||
      typeof razorpay_signature !== "string"
    ) {
      return NextResponse.json({ error: "Invalid payment details" }, { status: 400 });
    }

    const existingOrder = await findOrderByPaymentId(razorpay_payment_id);
    if (existingOrder) {
      return NextResponse.json({
        success: true,
        orderId: existingOrder.orderId,
        amount: existingOrder.amount,
        alreadyProcessed: true,
      });
    }

    const checkout = verifyCheckoutToken(checkoutToken);
    const pricedCart = priceCart(checkout.cart);
    const razorpayOrderId = checkout.orderId;

    if (
      pricedCart.fingerprint !== checkout.fingerprint ||
      pricedCart.totalAmountPaise !== checkout.amountPaise
    ) {
      return NextResponse.json(
        { error: "Checkout session does not match the order" },
        { status: 400 }
      );
    }

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${razorpayOrderId}|${razorpay_payment_id}`)
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
      razorpay.orders.fetch(razorpayOrderId),
      razorpay.payments.fetch(razorpay_payment_id),
    ]);
    const orderFingerprint = String(order.notes?.cart_fingerprint ?? "");

    if (
      Number(order.amount) !== pricedCart.totalAmountPaise ||
      order.currency !== "INR" ||
      order.status !== "paid" ||
      orderFingerprint !== pricedCart.fingerprint ||
      payment.order_id !== razorpayOrderId ||
      Number(payment.amount) !== pricedCart.totalAmountPaise ||
      payment.currency !== "INR" ||
      payment.status !== "captured"
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
      razorpayOrderId,
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
      orderId: razorpayOrderId,
      paymentId: razorpay_payment_id,
      customerDetails,
      cartItems: pricedCart.cartItems,
      totalAmount: pricedCart.totalAmount,
      paymentStatus: "Paid",
      orderTime: timestamp,
    });

    return NextResponse.json({
      success: true,
      orderId: razorpayOrderId,
      amount: pricedCart.totalAmount,
    });
  } catch (error) {
    console.error("Verification Error:", error);
    if (error instanceof InvalidCartError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    if (error instanceof InvalidCheckoutTokenError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Server error during verification" }, { status: 500 });
  }
}
