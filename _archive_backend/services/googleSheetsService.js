const { google } = require('googleapis');

let sheetsClient;

async function initSheets() {
  if (sheetsClient) return sheetsClient;
  const credsRaw = process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS;
  if (!credsRaw) throw new Error('GOOGLE_SERVICE_ACCOUNT_CREDENTIALS is not defined');

  let creds;
  if (credsRaw.trim().startsWith('{')) {
    try {
      creds = JSON.parse(credsRaw);
    } catch (err) {
      throw new Error('Failed to parse GOOGLE_SERVICE_ACCOUNT_CREDENTIALS as JSON');
    }
  } else {
    try {
      creds = JSON.parse(require('fs').readFileSync(credsRaw, 'utf-8'));
    } catch (err) {
      throw new Error('Could not load credentials from path in GOOGLE_SERVICE_ACCOUNT_CREDENTIALS: ' + err.message);
    }
  }

  const auth = new google.auth.GoogleAuth({
    credentials: creds,
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
  });
  sheetsClient = google.sheets({ version: 'v4', auth });
  return sheetsClient;
}

/**
 * Append a registration row to the spreadsheet.
 * Returns the 1-based row number that was written.
 */
async function appendRegistration(reg) {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!sheetId) throw new Error('GOOGLE_SHEET_ID is not defined');

  const sheets = await initSheets();
  const row = [
    reg.registrationId,
    reg.teamName,
    reg.teamSize,
    reg.members[0]?.name || '',
    reg.members[0]?.phone || '',
    reg.members[0]?.email || '',
    reg.members[0]?.college || '',
    reg.members[0]?.year || '',
    reg.members[0]?.branch || '',
    reg.members[1]?.name || '',
    reg.members[2]?.name || '',
    reg.amount || reg.payment?.amount || 1000,
    reg.payment?.status || 'Pending Verification',
    reg.payment?.screenshotUrl || '',
    new Date().toISOString()
  ];

  const res = await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: 'A:O',
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    resource: { values: [row] }
  });

  const updatedRange = res.data.updates?.updatedRange || '';
  const match = updatedRange.match(/:(?:[A-Z]+)(\d+)/);
  const rowNum = match ? parseInt(match[1], 10) : null;
  return rowNum;
}

/**
 * Update payment status and screenshot link on an existing row.
 * If row number is not provided the sheet will be searched for the registrationId.
 */
async function updatePaymentStatus(registrationId, status, screenshotLink, rowNumber) {
  // ensure caller handles missing sheet gracefully
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!sheetId) throw new Error('GOOGLE_SHEET_ID is not defined');

  const sheets = await initSheets();
  let r = rowNumber;

  if (!r) {
    const lookup = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: 'A:A'
    });
    const rows = lookup.data.values || [];
    const idx = rows.findIndex(r => r[0] === registrationId);
    if (idx === -1) {
      console.warn('[Sheets] registrationId not found, will skip update:', registrationId);
      return; // nothing to update
    }
    r = idx + 1;
  }

  const range = `M${r}:N${r}`; // Payment Status (M) and Screenshot Link (N)
  const values = [[status, screenshotLink || '']];
  await sheets.spreadsheets.values.update({
    spreadsheetId: sheetId,
    range,
    valueInputOption: 'USER_ENTERED',
    resource: { values }
  });
}

module.exports = { appendRegistration, updatePaymentStatus };
