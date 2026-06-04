import { CartItem } from "@/lib/types";

export function formatProductDetails(cartItems: CartItem[]) {
  return cartItems
    .map((item) => `${item.name} (Size: ${item.size}, Qty: ${item.quantity})`)
    .join(", ");
}

export function getTotalQuantity(cartItems: CartItem[]) {
  return cartItems.reduce((sum, item) => sum + item.quantity, 0);
}
