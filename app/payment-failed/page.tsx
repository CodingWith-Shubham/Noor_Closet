import { XCircle } from "lucide-react";
import Link from "next/link";

export default function PaymentFailedPage() {
  return (
    <div className="min-h-screen bg-[#FFF8F2] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border-t-4 border-red-500">
        <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
          <XCircle className="w-12 h-12 text-red-600" />
        </div>
        <h1 className="text-3xl font-serif text-[#1A1A1A] mb-4">Payment Failed</h1>
        <p className="text-[#6B6B6B] mb-8">
          We could not process your payment. Your order has not been placed and no money was deducted.
        </p>
        <Link href="/checkout" className="inline-block w-full bg-[#1A1A1A] text-white py-3 rounded-md hover:bg-[#C8A97E] transition-colors font-medium">
          Try Again
        </Link>
      </div>
    </div>
  );
}
