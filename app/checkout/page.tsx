"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import CheckoutForm from "@/components/CheckoutForm";
import OrderSummary from "@/components/OrderSummary";
import { products } from "@/lib/data";
import { CartItem } from "@/lib/types";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const productId = Number(searchParams.get("productId"));
  const product = products.find((item) => item.id === productId) ?? products[0];
  const availableSizes = product.details.sizes ?? ["Free Size"];
  const [selectedSize, setSelectedSize] = useState(availableSizes[0]);
  const [quantity, setQuantity] = useState(1);

  const cartItem: CartItem = useMemo(
    () => ({
      id: String(product.id),
      name: product.name,
      price: product.price,
      quantity,
      size: selectedSize,
      image: product.image,
    }),
    [product, quantity, selectedSize]
  );

  const totalAmount = cartItem.price * cartItem.quantity;
  const cartItems = [cartItem];

  return (
    <div className="min-h-screen bg-[#FFF8F2] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        <OrderSummary
          cartItems={cartItems}
          totalAmount={totalAmount}
          availableSizes={availableSizes}
          selectedSize={selectedSize}
          quantity={quantity}
          onSizeChange={setSelectedSize}
          onQuantityChange={(value) => setQuantity(Math.max(1, Math.min(10, value || 1)))}
        />
        <CheckoutForm cartItems={cartItems} totalAmount={totalAmount} />
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={null}>
      <CheckoutContent />
    </Suspense>
  );
}
