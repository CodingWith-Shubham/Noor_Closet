import { NextResponse } from "next/server";
import { appendOrderToSheet } from "@/lib/googleSheets";
import { sendOwnerOrderEmail } from "@/lib/email";
import {
  formatProductDetails,
  getTotalQuantity,
} from "@/lib/orderMessage";

export async function POST(req: Request) {
  try {
    const { customerDetails, cartItems, totalAmount } = await req.json();

    if (!customerDetails || !cartItems?.length || !totalAmount) {
      return NextResponse.json({ error: "Missing order details" }, { status: 400 });
    }

    const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    const orderId = `COD-${Date.now()}`;
    const paymentId = "N/A";
    const paymentStatus = "COD";
    const productDetails = formatProductDetails(cartItems);
    const totalQty = getTotalQuantity(cartItems);

    await appendOrderToSheet([
      timestamp,
      orderId,
      paymentId,
      customerDetails.fullName,
      customerDetails.phone,
      customerDetails.address,
      customerDetails.city,
      customerDetails.state,
      customerDetails.pincode,
      productDetails,
      totalQty,
      totalAmount,
      paymentStatus,
    ]);

    await sendOwnerOrderEmail({
      orderId,
      paymentId,
      customerDetails,
      cartItems,
      totalAmount,
      paymentStatus,
      orderTime: timestamp,
    });

    return NextResponse.json({ success: true, orderId });
  } catch (error) {
    console.error("COD Order Error:", error);
    return NextResponse.json({ error: "Server error while placing COD order" }, { status: 500 });
  }
}
