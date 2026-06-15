import { NextResponse } from "next/server";
import { appendOrderToSheet } from "@/lib/googleSheets";
import { sendOwnerOrderEmail } from "@/lib/email";
import { validateCustomerDetails, InvalidCustomerDetailsError } from "@/lib/customerDetails";
import { InvalidCartError, priceCart } from "@/lib/serverCart";
import {
  formatProductDetails,
  getTotalQuantity,
} from "@/lib/orderMessage";

export async function POST(req: Request) {
  try {
    const { customerDetails, cartItems } = await req.json();
    const validatedCustomer = validateCustomerDetails(customerDetails);
    const pricedCart = priceCart(cartItems);

    const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    const orderId = `COD-${Date.now()}`;
    const paymentId = "N/A";
    const paymentStatus = "COD";
    const productDetails = formatProductDetails(pricedCart.cartItems);
    const totalQty = getTotalQuantity(pricedCart.cartItems);

    await appendOrderToSheet([
      timestamp,
      orderId,
      paymentId,
      validatedCustomer.fullName,
      validatedCustomer.phone,
      validatedCustomer.address,
      validatedCustomer.city,
      validatedCustomer.state,
      validatedCustomer.pincode,
      productDetails,
      totalQty,
      pricedCart.totalAmount,
      paymentStatus,
    ]);

    await sendOwnerOrderEmail({
      orderId,
      paymentId,
      customerDetails: validatedCustomer,
      cartItems: pricedCart.cartItems,
      totalAmount: pricedCart.totalAmount,
      paymentStatus,
      orderTime: timestamp,
    });

    return NextResponse.json({ success: true, orderId });
  } catch (error) {
    console.error("COD Order Error:", error);
    if (error instanceof InvalidCartError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    if (error instanceof InvalidCustomerDetailsError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Server error while placing COD order" }, { status: 500 });
  }
}
