import { CustomerDetails } from "@/lib/types";

export class InvalidCustomerDetailsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidCustomerDetailsError";
  }
}

const PHONE_PATTERN = /^[0-9]{10}$/;
const PINCODE_PATTERN = /^[0-9]{6}$/;

function requireTrimmedString(value: unknown, field: string): string {
  if (typeof value !== "string") {
    throw new InvalidCustomerDetailsError(`Invalid ${field}`);
  }

  const trimmed = value.trim();
  if (!trimmed) {
    throw new InvalidCustomerDetailsError(`Invalid ${field}`);
  }

  return trimmed;
}

export function validateCustomerDetails(input: unknown): CustomerDetails {
  if (!input || typeof input !== "object") {
    throw new InvalidCustomerDetailsError("Missing customer details");
  }

  const details = input as Record<string, unknown>;
  const fullName = requireTrimmedString(details.fullName, "full name");
  const phone = requireTrimmedString(details.phone, "phone number");
  const address = requireTrimmedString(details.address, "address");
  const city = requireTrimmedString(details.city, "city");
  const state = requireTrimmedString(details.state, "state");
  const pincode = requireTrimmedString(details.pincode, "pincode");

  if (!PHONE_PATTERN.test(phone)) {
    throw new InvalidCustomerDetailsError("Phone number must be 10 digits");
  }

  if (!PINCODE_PATTERN.test(pincode)) {
    throw new InvalidCustomerDetailsError("Pincode must be 6 digits");
  }

  return { fullName, phone, address, city, state, pincode };
}
