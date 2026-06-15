import { google } from "googleapis";

function getSheetsClient() {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: privateKey,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
}

export async function findOrderByPaymentId(
  paymentId: string
): Promise<{ orderId: string; amount: number } | null> {
  try {
    const sheets = getSheetsClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Orders!B:L",
    });

    for (const row of response.data.values ?? []) {
      const [orderId, storedPaymentId, , , , , , , , amount] = row;

      if (storedPaymentId === paymentId && orderId) {
        return {
          orderId,
          amount: Number(amount),
        };
      }
    }

    return null;
  } catch (error) {
    console.error("Google Sheets lookup error:", error);
    throw new Error("Failed to look up order");
  }
}

export async function appendOrderToSheet(data: any[]) {
  try {
    const sheets = getSheetsClient();

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Orders!A:M", // Ensure your sheet is named "Orders"
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [data],
      },
    });
  } catch (error) {
    console.error("Google Sheets Error:", error);
    throw new Error("Failed to save order to sheets");
  }
}