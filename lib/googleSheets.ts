import { google } from "googleapis";

export async function appendOrderToSheet(data: any[]) {
  try {
    // Format private key to handle literal \n characters from env file
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: privateKey,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

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