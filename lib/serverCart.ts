import crypto from "crypto";
import { products } from "@/lib/data";
import { CartItem } from "@/lib/types";

const MAX_CART_ITEMS = 20;
const MAX_QUANTITY_PER_ITEM = 10;

type CartSelection = {
  id?: unknown;
  quantity?: unknown;
  size?: unknown;
};

export type PricedCart = {
  cartItems: CartItem[];
  totalAmount: number;
  totalAmountPaise: number;
  fingerprint: string;
};

export class InvalidCartError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidCartError";
  }
}

export function priceCart(input: unknown): PricedCart {
  if (!Array.isArray(input) || input.length === 0 || input.length > MAX_CART_ITEMS) {
    throw new InvalidCartError("Invalid cart");
  }

  const cartItems = input.map((selection: CartSelection) => {
    const productId = Number(selection?.id);
    const quantity = Number(selection?.quantity);
    const size = typeof selection?.size === "string" ? selection.size.trim() : "";
    const product = products.find((item) => item.id === productId);

    if (!product) {
      throw new InvalidCartError("Cart contains an unknown product");
    }

    if (
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > MAX_QUANTITY_PER_ITEM
    ) {
      throw new InvalidCartError("Cart contains an invalid quantity");
    }

    if (!size || !product.details.sizes.includes(size)) {
      throw new InvalidCartError("Cart contains an invalid size");
    }

    return {
      id: String(product.id),
      name: product.name,
      price: product.price,
      quantity,
      size,
      image: product.image,
    };
  });

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const totalAmountPaise = totalAmount * 100;
  const canonicalCart = cartItems
    .map(({ id, quantity, size }) => ({ id, quantity, size }))
    .sort((a, b) => `${a.id}:${a.size}`.localeCompare(`${b.id}:${b.size}`));
  const fingerprint = crypto
    .createHash("sha256")
    .update(JSON.stringify(canonicalCart))
    .digest("hex");

  return { cartItems, totalAmount, totalAmountPaise, fingerprint };
}
