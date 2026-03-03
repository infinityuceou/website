const { google } = require("googleapis");
console.log("🔥 GOOGLE SHEETS NEW VERSION ACTIVE 🔥");
let sheetsClient = null;

async function getSheetsClient() {
  if (sheetsClient) return sheetsClient;

  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;

  if (!raw) {
    console.error("[Sheets] GOOGLE_SERVICE_ACCOUNT_JSON not defined");
    throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON not defined");
  }

  let credentials;

  try {
    credentials = JSON.parse(raw);

    // Fix private key newline issue (VERY IMPORTANT FOR RENDER)
    if (credentials.private_key) {
      credentials.private_key = credentials.private_key.replace(/\\n/g, "\n");
    }

  } catch (err) {
    console.error("[Sheets] Failed to parse service account JSON:", err.message);
    throw new Error("Invalid GOOGLE_SERVICE_ACCOUNT_JSON");
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const authClient = await auth.getClient();

    sheetsClient = google.sheets({
      version: "v4",
      auth: authClient,
    });

    console.log("[Sheets] Client initialized successfully");
    return sheetsClient;

  } catch (err) {
    console.error("[Sheets] Auth initialization failed:", err.message);
    throw err;
  }
}

/**
 * Append a registration row
 */
async function appendRegistration(reg) {
  const sheetId = process.env.GOOGLE_SHEET_ID;

  if (!sheetId) {
    console.error("[Sheets] GOOGLE_SHEET_ID not defined");
    throw new Error("GOOGLE_SHEET_ID not defined");
  }

  const sheets = await getSheetsClient();

  const row = [
    reg.registrationId,
    reg.teamName,
    reg.teamSize,
    reg.members?.[0]?.name || "",
    reg.members?.[0]?.phone || "",
    reg.members?.[0]?.email || "",
    reg.members?.[0]?.college || "",
    reg.members?.[0]?.year || "",
    reg.members?.[0]?.branch || "",
    reg.members?.[1]?.name || "",
    reg.members?.[2]?.name || "",
    reg.amount || reg.payment?.amount || 1000,
    reg.payment?.status || "Pending Verification",
    reg.payment?.screenshotUrl || "",
    new Date().toISOString()
  ];

  console.log("[Sheets] Appending row:", row);

  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: "Sheet1!A1",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [row],
      },
    });

    console.log("[Sheets] Row appended successfully");

    const updatedRange = response.data.updates?.updatedRange;
    const match = updatedRange?.match(/:(?:[A-Z]+)(\d+)/);
    const rowNumber = match ? parseInt(match[1], 10) : null;

    return rowNumber;

  } catch (error) {
    console.error("[Sheets] Append error:", error.response?.data || error.message);
    throw error;
  }
}

/**
 * Update payment status + screenshot link
 */
async function updatePaymentStatus(registrationId, status, screenshotLink, rowNumber) {
  const sheetId = process.env.GOOGLE_SHEET_ID;

  if (!sheetId) {
    console.error("[Sheets] GOOGLE_SHEET_ID not defined");
    throw new Error("GOOGLE_SHEET_ID not defined");
  }

  const sheets = await getSheetsClient();
  let r = rowNumber;

  try {
    if (!r) {
      const lookup = await sheets.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: "A:A",
      });

      const rows = lookup.data.values || [];
      const idx = rows.findIndex(row => row[0] === registrationId);

      if (idx === -1) {
        console.warn("[Sheets] registrationId not found:", registrationId);
        return;
      }

      r = idx + 1;
    }

    const range = `M${r}:N${r}`;
    const values = [[status, screenshotLink || ""]];

    console.log("[Sheets] Updating payment status:", {
      registrationId,
      range,
      status,
    });

    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range,
      valueInputOption: "USER_ENTERED",
      requestBody: { values },
    });

    console.log("[Sheets] Payment status updated successfully");

  } catch (error) {
    console.error("[Sheets] Update error:", error.response?.data || error.message);
    throw error;
  }
}

module.exports = {
  appendRegistration,
  updatePaymentStatus,
};