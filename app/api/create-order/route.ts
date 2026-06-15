import { NextResponse } from "next/server";
import { getRazorpayClient } from "@/lib/razorpay";
import { createCheckoutToken } from "@/lib/checkoutToken";
import { InvalidCartError, priceCart } from "@/lib/serverCart";

export async function POST(req: Request) {
  try {
    const { cartItems } = await req.json();
    const pricedCart = priceCart(cartItems);
    const razorpay = getRazorpayClient();

    const options = {
      amount: pricedCart.totalAmountPaise,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        cart_fingerprint: pricedCart.fingerprint,
      },
    };

    const order = await razorpay.orders.create(options);
    const checkoutToken = createCheckoutToken({
      orderId: order.id,
      cart: pricedCart.cartItems.map(({ id, quantity, size }) => ({
        id,
        quantity,
        size,
      })),
      fingerprint: pricedCart.fingerprint,
      amountPaise: pricedCart.totalAmountPaise,
    });

    return NextResponse.json(
      {
        orderId: order.id,
        amount: pricedCart.totalAmountPaise,
        currency: order.currency,
        checkoutToken,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Create Order Error:", error);
    if (error instanceof InvalidCartError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Error creating order" }, { status: 500 });
  }
}
