import crypto from "crypto";

const TOKEN_TTL_MS = 30 * 60 * 1000;

export type CheckoutCartSelection = {
  id: string;
  quantity: number;
  size: string;
};

export type CheckoutTokenPayload = {
  orderId: string;
  cart: CheckoutCartSelection[];
  fingerprint: string;
  amountPaise: number;
  exp: number;
};

export class InvalidCheckoutTokenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidCheckoutTokenError";
  }
}

function getSigningSecret(): string {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) {
    throw new Error("Missing Razorpay secret");
  }
  return secret;
}

export function createCheckoutToken(
  payload: Omit<CheckoutTokenPayload, "exp">
): string {
  const data: CheckoutTokenPayload = {
    ...payload,
    exp: Date.now() + TOKEN_TTL_MS,
  };
  const body = Buffer.from(JSON.stringify(data)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", getSigningSecret())
    .update(body)
    .digest("base64url");

  return `${body}.${signature}`;
}

export function verifyCheckoutToken(token: unknown): CheckoutTokenPayload {
  if (typeof token !== "string" || !token.includes(".")) {
    throw new InvalidCheckoutTokenError("Invalid checkout token");
  }

  const [body, signature] = token.split(".");
  if (!body || !signature) {
    throw new InvalidCheckoutTokenError("Invalid checkout token");
  }

  const expectedSignature = crypto
    .createHmac("sha256", getSigningSecret())
    .update(body)
    .digest("base64url");

  const expectedBuffer = Buffer.from(expectedSignature);
  const receivedBuffer = Buffer.from(signature);

  if (
    expectedBuffer.length !== receivedBuffer.length ||
    !crypto.timingSafeEqual(expectedBuffer, receivedBuffer)
  ) {
    throw new InvalidCheckoutTokenError("Invalid checkout token");
  }

  let payload: CheckoutTokenPayload;
  try {
    payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
  } catch {
    throw new InvalidCheckoutTokenError("Invalid checkout token");
  }

  if (
    typeof payload.orderId !== "string" ||
    !Array.isArray(payload.cart) ||
    typeof payload.fingerprint !== "string" ||
    typeof payload.amountPaise !== "number" ||
    typeof payload.exp !== "number"
  ) {
    throw new InvalidCheckoutTokenError("Invalid checkout token");
  }

  if (Date.now() > payload.exp) {
    throw new InvalidCheckoutTokenError("Checkout session expired");
  }

  return payload;
}
