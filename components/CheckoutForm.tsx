"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CustomerDetails, CartItem } from "@/lib/types";

type PaymentMode = "online" | "cod";

type CheckoutFormProps = {
  cartItems: CartItem[];
  totalAmount: number;
};

export default function CheckoutForm({ cartItems, totalAmount }: CheckoutFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [paymentMode, setPaymentMode] = useState<PaymentMode>("online");
  const [formData, setFormData] = useState<CustomerDetails>({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const redirectToSuccess = (orderId: string, paidAmount = totalAmount) => {
    const name = encodeURIComponent(formData.fullName);
    router.push(`/order-success?orderId=${orderId}&amount=${paidAmount}&name=${name}`);
  };

  const placeCodOrder = async () => {
    const codRes = await fetch("/api/place-cod-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerDetails: formData,
        cartItems,
        totalAmount,
      }),
    });

    const codData = await codRes.json();

    if (!codRes.ok || !codData.success) {
      throw new Error(codData.error || "Could not place COD order");
    }

    toast.success("COD order placed successfully");
    redirectToSuccess(codData.orderId);
  };

  const payOnline = async () => {
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      throw new Error("Razorpay SDK failed to load");
    }

    const orderRes = await fetch("/api/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cartItems: cartItems.map(({ id, quantity, size }) => ({
          id,
          quantity,
          size,
        })),
      }),
    });
    const orderData = await orderRes.json();

    if (!orderRes.ok) {
      throw new Error(orderData.error || "Could not create order");
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: orderData.amount,
      currency: orderData.currency,
      name: "NOOR Closet",
      description: "Premium Ethnic Wear",
      order_id: orderData.orderId,
      handler: async function (response: any) {
        toast.loading("Verifying payment...", { id: "verify" });

        const verifyRes = await fetch("/api/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            checkoutToken: orderData.checkoutToken,
            customerDetails: formData,
          }),
        });

        const verifyData = await verifyRes.json();
        if (verifyRes.ok && verifyData.success) {
          toast.success("Payment successful", { id: "verify" });
          redirectToSuccess(verifyData.orderId, verifyData.amount);
        } else {
          toast.error("Verification failed", { id: "verify" });
          router.push("/payment-failed");
        }
      },
      prefill: {
        name: formData.fullName,
        contact: formData.phone,
      },
      theme: { color: "#C8A97E" },
    };

    const paymentObject = new (window as any).Razorpay(options);

    paymentObject.on("payment.failed", function () {
      toast.error("Payment failed or cancelled");
      router.push("/payment-failed");
    });

    paymentObject.open();
  };

  const handlePayment = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (paymentMode === "cod") {
        await placeCodOrder();
      } else {
        await payOnline();
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handlePayment} className="space-y-5 max-w-lg mx-auto bg-white p-6 rounded-xl shadow-sm border border-champagne">
      <h2 className="text-2xl font-serif text-primary mb-6 border-b border-champagne pb-2">Shipping Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input required name="fullName" placeholder="Full Name" onChange={handleInputChange} className="col-span-2 border p-3 rounded-md w-full focus:ring-1 focus:ring-gold-accent outline-none" />
        <input required name="phone" placeholder="Phone Number" pattern="[0-9]{10}" onChange={handleInputChange} className="col-span-2 border p-3 rounded-md w-full focus:ring-1 focus:ring-gold-accent outline-none" />
        <input required name="address" placeholder="Complete Address" onChange={handleInputChange} className="col-span-2 border p-3 rounded-md w-full focus:ring-1 focus:ring-gold-accent outline-none" />
        <input required name="city" placeholder="City" onChange={handleInputChange} className="border p-3 rounded-md w-full focus:ring-1 focus:ring-gold-accent outline-none" />
        <input required name="state" placeholder="State" onChange={handleInputChange} className="border p-3 rounded-md w-full focus:ring-1 focus:ring-gold-accent outline-none" />
        <input required name="pincode" placeholder="Pincode" pattern="[0-9]{6}" onChange={handleInputChange} className="col-span-2 md:col-span-1 border p-3 rounded-md w-full focus:ring-1 focus:ring-gold-accent outline-none" />
      </div>

      <div className="space-y-3 border-t border-champagne pt-5">
        <h3 className="font-serif text-xl text-primary">Payment Method</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="flex cursor-pointer items-center gap-3 rounded-md border border-champagne p-4">
            <input
              type="radio"
              name="paymentMode"
              value="online"
              checked={paymentMode === "online"}
              onChange={() => setPaymentMode("online")}
              className="accent-[#C8A97E]"
            />
            <span className="font-medium text-primary">Online Payment</span>
          </label>
          <label className="flex cursor-pointer items-center gap-3 rounded-md border border-champagne p-4">
            <input
              type="radio"
              name="paymentMode"
              value="cod"
              checked={paymentMode === "cod"}
              onChange={() => setPaymentMode("cod")}
              className="accent-[#C8A97E]"
            />
            <span className="font-medium text-primary">Cash on Delivery</span>
          </label>
        </div>
      </div>

      <button disabled={loading} type="submit" className="w-full mt-6 bg-[#1A1A1A] hover:bg-[#C8A97E] transition-colors text-white py-4 rounded-md font-medium text-lg disabled:opacity-70">
        {loading
          ? "Processing..."
          : paymentMode === "cod"
            ? `Place COD Order - Rs. ${totalAmount}`
            : `Pay Rs. ${totalAmount}`}
      </button>
    </form>
  );
}
