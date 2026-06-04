"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");
  const name = searchParams.get("name");

  return (
    <div className="min-h-screen bg-[#FFF8F2] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border-t-4 border-[#C8A97E]">
        <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="text-3xl font-serif text-[#1A1A1A] mb-2">Payment Successful!</h1>
        <p className="text-[#6B6B6B] mb-8">
          Thank you for your order, {name}. Embrace your Noor.
        </p>

        <div className="bg-[#FAF3EC] rounded-lg p-4 text-left mb-8 space-y-2">
          <p className="text-sm text-[#6B6B6B]">Order ID</p>
          <p className="font-medium font-mono text-[#1A1A1A] break-all">{orderId}</p>
          <div className="h-px bg-[#F3E5D8] my-3"></div>
          <p className="text-sm text-[#6B6B6B]">Amount Paid</p>
          <p className="font-bold text-lg text-[#C8A97E]">Rs. {amount}</p>
        </div>

        <Link href="/" className="inline-block w-full bg-[#1A1A1A] text-white py-3 rounded-md hover:bg-[#C8A97E] transition-colors font-medium">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={null}>
      <OrderSuccessContent />
    </Suspense>
  );
}
