import { Resend } from "resend";
import { CartItem, CustomerDetails } from "@/lib/types";

type OrderEmailInput = {
  orderId: string;
  paymentId: string;
  customerDetails: CustomerDetails;
  cartItems: CartItem[];
  totalAmount: number;
  paymentStatus: "Paid" | "COD";
  orderTime: string;
};

const resend = new Resend(process.env.RESEND_API_KEY);

function formatAddress(customerDetails: CustomerDetails) {
  return [
    customerDetails.address,
    customerDetails.city,
    customerDetails.state,
    customerDetails.pincode,
  ]
    .filter(Boolean)
    .join("\n");
}

function formatTextEmail({
  orderId,
  paymentId,
  customerDetails,
  cartItems,
  totalAmount,
  paymentStatus,
  orderTime,
}: OrderEmailInput) {
  const products = cartItems
    .map((item) => `${item.quantity} x ${item.name} (${item.size})`)
    .join("\n");

  return `New Order Received

Order ID: ${orderId}
Payment ID: ${paymentId}

Customer Details
----------------
Name: ${customerDetails.fullName}
Phone: ${customerDetails.phone}

Address:
${formatAddress(customerDetails)}

Products
---------
${products}

Total Amount: Rs. ${totalAmount}
Payment Status: ${paymentStatus}

Order Time:
${orderTime}`;
}

function escapeHtml(value: string | number) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatHtmlEmail({
  orderId,
  paymentId,
  customerDetails,
  cartItems,
  totalAmount,
  paymentStatus,
  orderTime,
}: OrderEmailInput) {
  const productRows = cartItems
    .map(
      (item) => `
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #f1e5d8;">
            <div style="font-weight: 700; color: #1a1a1a;">${escapeHtml(item.name)}</div>
            <div style="margin-top: 4px; color: #6b6b6b;">Size: ${escapeHtml(item.size)} &nbsp; Qty: ${escapeHtml(item.quantity)}</div>
          </td>
          <td style="padding: 12px 0; border-bottom: 1px solid #f1e5d8; text-align: right; color: #1a1a1a; font-weight: 700;">
            Rs. ${escapeHtml(item.price * item.quantity)}
          </td>
        </tr>`
    )
    .join("");

  const addressLines = formatAddress(customerDetails)
    .split("\n")
    .map((line) => escapeHtml(line))
    .join("<br />");

  return `
    <div style="margin: 0; padding: 0; background: #fff8f2; font-family: Arial, sans-serif; color: #1a1a1a;">
      <div style="max-width: 640px; margin: 0 auto; padding: 32px 16px;">
        <div style="background: #ffffff; border: 1px solid #f3e5d8; border-radius: 10px; overflow: hidden;">
          <div style="background: #1a1a1a; color: #ffffff; padding: 28px 32px; text-align: center;">
            <div style="font-size: 13px; letter-spacing: 4px; color: #c8a97e; font-weight: 700;">NOOR CLOSET</div>
            <h1 style="margin: 12px 0 0; font-size: 26px; line-height: 1.25;">New Order Received</h1>
          </div>

          <div style="padding: 28px 32px;">
            <div style="margin-bottom: 24px; padding: 16px; background: #faf3ec; border-radius: 8px;">
              <div style="font-size: 13px; color: #6b6b6b;">Order ID</div>
              <div style="margin-top: 4px; font-size: 18px; font-weight: 700;">${escapeHtml(orderId)}</div>
              <div style="margin-top: 12px; font-size: 13px; color: #6b6b6b;">Payment ID</div>
              <div style="margin-top: 4px; font-size: 14px;">${escapeHtml(paymentId)}</div>
            </div>

            <h2 style="font-size: 18px; margin: 0 0 12px;">Customer Information</h2>
            <p style="margin: 0 0 4px;"><strong>Name:</strong> ${escapeHtml(customerDetails.fullName)}</p>
            <p style="margin: 0 0 24px;"><strong>Phone:</strong> ${escapeHtml(customerDetails.phone)}</p>

            <h2 style="font-size: 18px; margin: 0 0 12px;">Order Items</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              ${productRows}
            </table>

            <div style="margin-bottom: 24px; padding: 16px; background: #faf3ec; border-radius: 8px;">
              <div style="display: flex; justify-content: space-between; gap: 16px;">
                <strong>Total Amount</strong>
                <strong style="color: #c8a97e;">Rs. ${escapeHtml(totalAmount)}</strong>
              </div>
              <div style="margin-top: 10px;">
                <strong>Payment Status:</strong> ${escapeHtml(paymentStatus)}
              </div>
            </div>

            <h2 style="font-size: 18px; margin: 0 0 12px;">Shipping Address</h2>
            <p style="margin: 0 0 24px; line-height: 1.7;">${addressLines}</p>

            <p style="margin: 0; color: #6b6b6b;"><strong>Order Time:</strong> ${escapeHtml(orderTime)}</p>
          </div>
        </div>
      </div>
    </div>`;
}

export async function sendOwnerOrderEmail(order: OrderEmailInput) {
  const to = process.env.OWNER_ORDER_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL || "NOOR Closet <onboarding@resend.dev>";

  if (!process.env.RESEND_API_KEY || !to) {
    console.error("Resend Email Error: Missing RESEND_API_KEY or OWNER_ORDER_EMAIL");
    return;
  }

  const { error } = await resend.emails.send({
    from,
    to,
    subject: `New Noor Closet Order #${order.orderId}`,
    text: formatTextEmail(order),
    html: formatHtmlEmail(order),
  });

  if (error) {
    console.error("Resend Email Error:", error);
  }
}
