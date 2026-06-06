import { NextResponse } from "next/server";
import { sendNewsletterSignupEmail } from "@/lib/email";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (typeof email !== "string" || !emailPattern.test(email)) {
      return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 });
    }

    await sendNewsletterSignupEmail(email);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter Signup Error:", error);
    return NextResponse.json({ error: "Could not subscribe right now" }, { status: 500 });
  }
}
