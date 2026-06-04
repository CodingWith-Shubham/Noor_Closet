"use client";

import Image from "next/image";
import { CartItem } from "@/lib/types";

type OrderSummaryProps = {
  cartItems: CartItem[];
  totalAmount: number;
  availableSizes?: string[];
  selectedSize?: string;
  quantity?: number;
  onSizeChange?: (size: string) => void;
  onQuantityChange?: (quantity: number) => void;
};

export default function OrderSummary({
  cartItems,
  totalAmount,
  availableSizes = [],
  selectedSize,
  quantity = 1,
  onSizeChange,
  onQuantityChange,
}: OrderSummaryProps) {
  return (
    <aside className="bg-white p-6 rounded-xl shadow-sm border border-champagne">
      <h2 className="text-2xl font-serif text-primary mb-6 border-b border-champagne pb-2">
        Order Summary
      </h2>

      <div className="space-y-5">
        {cartItems.map((item) => (
          <div key={`${item.id}-${item.size}`} className="flex gap-4">
            <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-md bg-cream-light">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="80px"
                className="object-cover"
                unoptimized
              />
            </div>

            <div className="flex flex-1 justify-between gap-4">
              <div>
                <h3 className="font-medium text-primary">{item.name}</h3>
                <p className="mt-1 text-sm text-muted">
                  Size {item.size} / Qty {item.quantity}
                </p>
              </div>
              <p className="whitespace-nowrap font-medium text-primary">
                Rs. {item.price * item.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>
      {(availableSizes.length > 0 || onQuantityChange) && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-champagne pt-5">
          {availableSizes.length > 0 && selectedSize && onSizeChange && (
            <label className="space-y-2 text-sm font-medium text-primary">
              <span>Size</span>
              <select
                value={selectedSize}
                onChange={(event) => onSizeChange(event.target.value)}
                className="w-full rounded-md border border-champagne bg-white p-3 outline-none focus:ring-1 focus:ring-gold-accent"
              >
                {availableSizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </label>
          )}

          {onQuantityChange && (
            <label className="space-y-2 text-sm font-medium text-primary">
              <span>Quantity</span>
              <input
                min={1}
                max={10}
                type="number"
                value={quantity}
                onChange={(event) => onQuantityChange(Number(event.target.value))}
                className="w-full rounded-md border border-champagne bg-white p-3 outline-none focus:ring-1 focus:ring-gold-accent"
              />
            </label>
          )}
        </div>
      )}

      <div className="mt-6 border-t border-champagne pt-5">
        <div className="flex items-center justify-between text-lg font-semibold text-primary">
          <span>Total</span>
          <span>Rs. {totalAmount}</span>
        </div>
      </div>
    </aside>
  );
}
