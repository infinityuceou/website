#!/usr/bin/env node

/**
 * INFINITY 2K26 Hackathon Registration - Quick Setup Wizard
 *
 * This script makes it easy to:
 * 1. Collect Cloudinary credentials
 * 2. Extract sheet ID from Google Sheets link
 * 3. Generate a `.env` file automatically
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise(resolve => rl.question(prompt, resolve));
}


function extractSheetId(link) {
  const match = link.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  return match ? match[1] : null;
}

async function main() {
  console.log('\n🚀 INFINITY 2K26 Hackathon Registration - Setup Wizard\n');
  console.log('This wizard will help you configure Cloudinary & Sheets integration.\n');

  // Step 1: Service Account Credentials
  console.log('📋 STEP 1: Service Account Credentials');
  console.log('You need a service account JSON file.');
  console.log('See: https://cloud.google.com/docs/authentication/getting-started\n');

  const credsPath = await question('Enter path to service account JSON file (e.g., ./sa-key.json): ');
  if (!fs.existsSync(credsPath.trim())) {
    console.error('❌ File not found. Exiting.');
    process.exit(1);
  }

  let credsContent;
  try {
    credsContent = fs.readFileSync(credsPath.trim(), 'utf-8');
    JSON.parse(credsContent); // validate JSON
  } catch (err) {
    console.error('❌ Invalid JSON file. Exiting.');
    process.exit(1);
  }

  // Step 2: Google Drive Folder
  console.log('\n📂 STEP 2: Cloudinary Setup');
  console.log('Ensure you have a Cloudinary account and have created');
  console.log('a folder path like "infinity2k26/payments".');
  console.log('You will need your cloud name, API key and secret.\n');

  const cloudName = await question('Cloudinary Cloud Name: ');
  const apiKey = await question('Cloudinary API Key: ');
  const apiSecret = await question('Cloudinary API Secret: ');

  if (!cloudName || !apiKey || !apiSecret) {
    console.error('❌ Cloudinary credentials required. Exiting.');
    process.exit(1);
  }

  console.log('✅ Cloudinary credentials captured');
  // store them in .env as part of final output below
  process.env._cloudinary_info = { cloudName, apiKey, apiSecret };

  // Step 3: Google Sheet
  console.log('\n📊 STEP 3: Google Sheets');
  console.log('Create a sheet named "INFINITY 2K26 Registrations".');
  console.log('Share it with your service account email.');
  console.log('Add column headers in row 1 (see documentation).');
  console.log('Copy the sheet link from the address bar.\n');

  const sheetLink = await question('Paste the Sheets link: ');
  const sheetId = extractSheetId(sheetLink.trim());

  if (!sheetId) {
    console.error('❌ Could not extract sheet ID. Make sure you copied the full link.');
    process.exit(1);
  }

  console.log(`✅ Extracted sheet ID: ${sheetId}`);

  // Step 4: Other config
  console.log('\n⚙️  STEP 4: Other Configuration');

  const mongoUri = await question('MongoDB URI [mongodb://localhost:27017/eventDB]: ');
  const port = await question('Backend port [5000]: ');
  const smtpHost = await question('SMTP host [smtp.gmail.com]: ');
  const smtpPort = await question('SMTP port [465]: ');
  const emailUser = await question('Email address (for sending confirmations): ');
  const emailPass = await question('Email password or app password: ');
  const adminEmail = await question('Admin email (for notifications) [skip]: ');
  const upiId = await question('UPI ID (e.g., infinity@upi) [infinity@upi]: ');

  // Step 5: Generate .env
  console.log('\n✏️  Generating .env file...\n');

  const envContent = `# MongoDB
MONGO_URI=${mongoUri || 'mongodb://localhost:27017/eventDB'}
PORT=${port || 5000}
JWT_SECRET=${require('crypto').randomBytes(16).toString('hex')}

# Email configuration
SMTP_HOST=${smtpHost || 'smtp.gmail.com'}
SMTP_PORT=${smtpPort || 465}
EMAIL_USER=${emailUser}
EMAIL_PASS=${emailPass}

# Admin notifications (optional)
${adminEmail ? `ADMIN_EMAIL=${adminEmail}` : '# ADMIN_EMAIL=admin@infinity.com'}

# UPI details
UPI_ID=${upiId || 'infinity@upi'}

# Cloudinary configuration
CLOUDINARY_CLOUD_NAME=${cloudName}
CLOUDINARY_API_KEY=${apiKey}
CLOUDINARY_API_SECRET=${apiSecret}

# Google API Configuration (Sheets only)
# NOTE: On production (Render), prefer setting GOOGLE_SERVICE_ACCOUNT_JSON directly
#       in the dashboard instead of using a file path.
GOOGLE_SERVICE_ACCOUNT_JSON=${credsContent.replace(/\n/g, '\\n')}
GOOGLE_SHEET_ID=${sheetId}
`;

  const envPath = path.join(__dirname, '..', '.env');
  fs.writeFileSync(envPath, envContent);

  console.log(`✅ .env file created at: ${envPath}\n`);
  console.log('📄 Contents:');
  console.log('─'.repeat(50));
  console.log(envContent);
  console.log('─'.repeat(50));

  console.log('\n🎉 Setup complete!\n');
  console.log('Next steps:');
  console.log('1. Verify the .env file looks correct (especially credentials path)');
  console.log('2. Run: npm install');
  console.log('3. Run: node server.js\n');

  rl.close();
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
