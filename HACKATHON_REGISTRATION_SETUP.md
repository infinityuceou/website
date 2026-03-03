# INFINITY 2K26 Hackathon Registration System - Implementation Guide

## ✅ COMPLETED IMPLEMENTATION

### Frontend (React + Vite + TailwindCSS)

#### New WIP.jsx - Complete Registration Page
Location: `infinity/src/Pages/WIP.jsx`

**Features:**
- ✅ Toggle between Team & Individual Registration (pill-style buttons)
- ✅ 3-Step Registration Flow (Details → Payment → Confirmation)
- ✅ Progress Bar with animated gradient fill
- ✅ Input validation with red highlights for errors
- ✅ Email format & 10-digit phone validation
- ✅ Glassmorphism card design matching INFINITY theme
- ✅ Blue → Purple gradient buttons with hover scale effects
- ✅ Fade animations on step transitions
- ✅ QR Code display on payment step
- ✅ Drag & drop file upload for payment screenshots
- ✅ Success confirmation screen with animated checkmark
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Clean Tailwind utility classes
- ✅ Dark space theme with transparent overlays

**Step 1: Details**
- Team Name (if team mode)
- Team Leader info (Name, Email, Phone, College, Year, Branch)
- Up to 2 additional members (optional fields)

**Step 2: Payment**
- QR Code (dynamically generated from backend)
- Registration ID display
- Amount: ₹299
- UPI ID display
- Drag & drop payment screenshot upload
- File preview after selection

**Step 3: Confirmation**
- Success animation
- Registration ID
- "Awaiting Payment Verification" message
- Link back to home

---

### Backend (Node.js + Express + MongoDB)

#### 1. Registration Model
Location: `_archive_backend/models/Registration.js`

```javascript
{
  registrationId: String (unique, indexed),
  teamName: String,
  leader: {
    name: String,
    email: String,
    phone: String,
    college: String
  },
  members: [{
    name: String,
    email: String,
    phone: String,
    college: String
  }],
  amount: Number (default: 299),
  qrPath: String,
  paymentScreenshot: String,
  paymentStatus: Enum ['Not Paid', 'Pending Verification', 'Verified'],
  createdAt: Date
}
```

#### 2. Registration Controller
Location: `_archive_backend/controllers/registrationController.js`

**Endpoints:**

##### POST `/api/register`
- Generates UUID-based registration ID (INFY-XXXXXX format)
- Generates QR code with UPI payment link
- Saves QR to `/uploads/qrcodes`
- Stores registration in MongoDB
- Sends email with QR code attached
- Returns: { registrationId, qrPath }

##### POST `/api/upload-payment`
- Accepts payment screenshot (multipart form data)
- Saves to `/uploads/payments`
- Updates registration with screenshot path
- Sets status to "Pending Verification"
- Notifies admin email (if configured)
- Returns: { message: "Uploaded and pending verification" }

##### GET `/api/admin/registrations`
- Returns all registrations sorted by creation date (newest first)
- No authentication required (add if needed)

#### 3. Enhanced Multer Config
Location: `_archive_backend/middleware/multerConfig.js`

**Features:**
- Image-only file filter (jpeg, jpg, png, webp)
- 5MB file size limit
- Dynamic destination folder support
- Automatic directory creation

**Usage:**
```javascript
const upload = multerConfig.uploadTo('uploads/payments');
// Returns configured multer instance
```

#### 4. New Routes File
Location: `_archive_backend/routes/hackRegistrationRoutes.js`

**Endpoints:**
- `POST /api/register` - Create new registration
- `POST /api/upload-payment` - Upload payment screenshot
- `GET /api/admin/registrations` - List all registrations

#### 5. Updated Server
Location: `_archive_backend/server.js`

**Changes:**
- Imported new `hackRegistrationRoutes`
- Wired routes: `app.use('/api', hackRegistrationRoutes)`
- Existing `/uploads` static folder already configured

---

## 🔧 QUICK START (Easiest Way)

### Two simple steps:

1. **Configure credentials**
   - Sign up for a free Cloudinary account and create a folder path
     like `infinity2k26/payments`. Note your **Cloud Name**, **API Key**
     and **API Secret** (available in the dashboard).
   - Create a Google Sheet titled **INFINITY 2K26 Registrations** and add the
     column headers as documented earlier. Share the sheet with your
     service account email (Editor access) and note the sheet ID from the URL.
   - Ensure you have a Google service account JSON file and note its path.
   - Copy the values into your `.env` file. You can use
     `.env.example` as a template.

2. **Install & launch backend**

```bash
cd d:\infinity\website\_archive_backend
npm install
npm start   # or node server.js
```

Once the server is running you can exercise the registration form
via the frontend and verify that screenshots upload to Cloudinary and
rows appear in your Google Sheet.

---

## 🔧 FULL SETUP INSTRUCTIONS (If you want to do it manually)

Below is a sequential, step‑by‑step guide to getting the system running from
scratch. Follow each numbered step in order.

### 1. Prepare cloud services (one-time manual work)

1. **Google Cloud project** – create or reuse a project and enable the
   **Sheets API** only (no Drive permissions required).
2. **Service account** – create a service account and download its JSON key.
   - When you create it, give it a name like `infinity-hackathon-sa`.
   - Save the JSON file locally and/or copy its contents somewhere secure.
3. **Share resources with service account**:
   - Create a Google Sheet titled **INFINITY 2K26 Registrations** with the
     column headers in row 1 as documented earlier. Share the sheet with the
     service account email (Editor access) and note the spreadsheet ID from
     the URL.
4. **Cloudinary account** – sign up at https://cloudinary.com/ and create a
   folder path (e.g. `infinity2k26/payments`). Keep your Cloud Name, API Key
   and API Secret handy; they will go into `.env`.
5. **Environment values** – you will need the spreadsheet ID, service
   account JSON and Cloudinary credentials when configuring `.env` later.

### 2. Backend dependencies

```bash
cd d:\infinity\website\_archive_backend
npm install           # installs express, mongoose, multer, uuid, googleapis, etc.
```

### 3. Create and populate `.env` for the backend

Create file `_archive_backend/.env` containing the following (adjust values
as appropriate for your environment):

```env
# MongoDB
MONGO_URI=mongodb://localhost:27017/eventDB
PORT=5000
JWT_SECRET=your_secret_key

# Email configuration (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Optional admin notification
ADMIN_EMAIL=admin@infinity.com

# UPI details shown to users
UPI_ID=infinity@upi

# Google API configuration (Sheets only)
# either paste the entire JSON blob or provide the path to the JSON file
GOOGLE_SERVICE_ACCOUNT_CREDENTIALS=/path/to/sa-key.json
GOOGLE_SHEET_ID=1DEFghI…

# Cloudinary configuration (required for payment screenshots)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

> **Note:** the `GOOGLE_SERVICE_ACCOUNT_CREDENTIALS` value may be the raw JSON
> string, in which case wrap it in quotes and escape quotes/linebreaks, or it
> can simply be `./creds.json` pointing to a file stored outside version
> control.

### 4. Verify Google Sheets credentials (optional)

Run a quick Node REPL in the backend folder to make sure the service
account can append to your sheet:

```bash
node -e "require('./services/googleSheetsService').appendRegistration({
  registrationId:'TEST',mode:'team',teamName:'X',leader:{name:'A',phone:'123',email:'a@b',college:''},members:[],payment:{amount:0,status:'Not Paid'}
}).then(console.log).catch(console.error)"
```

If it returns a row number, the sheet integration works. Delete the row
from your sheet afterwards if desired.

### 5. Start backend server

```bash
node server.js          # or use nodemon if you prefer
```

Expected output:

```
✅ MongoDB Connected
🚀 Server running on port 5000
```

Leave this process running while you work locally.

### 6. Frontend setup

(Instructions already shown above in the Frontend Setup section.)

### 7. Test the full flow

- Open the registration page (`/wip`) and submit a team or individual entry.
- Confirm a new row appears in the Google Sheet (status “Not Paid”).
- Upload a screenshot; the backend should upload the image to Cloudinary and
  update the sheet row to “Pending Verification” with a `screenshotUrl` value.
- Check MongoDB documents to ensure `screenshotUrl` and `sheetRow` are
  populated.  You may also verify the image in your Cloudinary dashboard.

### 8. Deployment notes

- When deploying to production, set the same environment variables on your
  server or CI pipeline.
- Ensure the service account JSON is stored securely (use secrets manager).
- Serve the backend over HTTPS behind a reverse proxy and update
  `VITE_API_BASE_URL` accordingly.

---

The remainder of the file (testing checklist, troubleshooting, etc.) may remain
unchanged; it already provides additional guidance.


---

### Frontend Setup

#### 1. Configure API Base URL (optional for development)
Create or edit the `.env` file in the `infinity/` directory (relative to the workspace root):

```bash
# infinity/.env
VITE_API_BASE_URL=http://localhost:5000  # URL where your backend will run
VITE_UPI_ID=infinity@upi                 # shown on the payment step
```

If you omit the file the code defaults to `http://localhost:5000`.

#### 2. Install and start the frontend
```bash
cd d:\infinity\website\infinity
npm install        # only needed once or after dependency changes
npm run dev         # starts Vite development server
```

You should see something like:
```
VITE v6.x.x  ready in XXX ms
➜  Local:   http://localhost:5173/
```

#### 3. Open the registration page
Point your browser to:

```
http://localhost:5173/wip
```

The multi‑step registration form should load and be ready for input.

---

## 📋 TESTING CHECKLIST

### Frontend
- [ ] Toggle between Team/Individual registration modes
- [ ] Validate required fields show red errors
- [ ] Email format validation works
- [ ] Phone 10-digit validation works
- [ ] Progress bar animates correctly
- [ ] Form submission sends data to backend
- [ ] QR code displays after successful registration
- [ ] Drag & drop file upload works
- [ ] File preview shows after upload
- [ ] Success screen appears after payment upload
- [ ] Back button works on payment step
- [ ] Responsive on mobile (test with DevTools)

### Backend
- [ ] POST `/api/register` accepts JSON payload
- [ ] Registration ID generates and is unique
- [ ] QR code creates in `/uploads/qrcodes` folder
- [ ] Email sends with QR attachment (check spam folder)
- [ ] MongoDB stores registration correctly
- [ ] GET `/api/admin/registrations` returns all registrations
- [ ] POST `/api/upload-payment` accepts multipart form data
- [ ] Payment screenshot saves to `/uploads/payments`
- [ ] Registration status updates to "Pending Verification"
- [ ] Admin email notification (if configured)

---

## 🎨 DESIGN NOTES

The registration form matches the INFINITY 2K26 theme:

**Color Palette:**
- Primary: Blue (#3B82F6) → Purple (#9333EA)
- Background: Dark with transparency (white/5, white/10)
- Borders: white/10, white/20
- Text: white, gray-300, gray-400

**Components:**
- Glassmorphism: `backdrop-blur-xl border border-white/10`
- Inputs: `rounded-lg bg-white/5 border focus:ring-purple-500`
- Buttons: `bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105`
- Animations: `motion` from framer-motion

**Spacing:**
- Section padding: `py-20 px-6`
- Card padding: `p-8`
- Input margins: `mb-4`
- Clean whitespace maintains readability

---

## 🔌 API INTEGRATION NOTES

### Frontend to Backend Flow

1. **Registration Form Submission**
   - Validates all fields
   - Sends JSON to `/api/register`
   - Receives: `{ registrationId, qrPath }`
   - QR displays: `${API_BASE}/${qrPath}`

2. **Payment Upload**
   - Form data with `screenshot` file + `registrationId`
   - Sends to `/api/upload-payment`
   - On success: redirects to confirmation step

3. **Admin Verification**
   - Admins can call `/api/admin/registrations`
   - View all registrations with payment status
   - Update manually or build admin dashboard

---

## 📁 FILE STRUCTURE

```
_archive_backend/
├── controllers/
│   └── registrationController.js (NEW)
├── middleware/
│   └── multerConfig.js (UPDATED)
├── models/
│   └── Registration.js (UPDATED)
├── routes/
│   ├── hackRegistrationRoutes.js (NEW)
│   └── [existing routes...]
├── uploads/
│   ├── qrcodes/     (auto-created)
│   └── payments/    (auto-created)
├── server.js (UPDATED)
├── package.json (UPDATED)
└── .env (CREATE THIS)

infinity/
├── src/
│   └── Pages/
│       └── WIP.jsx (RECREATED - Registration Form)
├── .env (OPTIONAL - API config)
└── [existing files...]
```

---

## 🚀 NEXT STEPS (Optional Enhancements)

1. **Admin Dashboard**
   - Build UI to view registrations
   - Approve/reject payments
   - Bulk export to CSV

2. **Email Improvements**
   - Custom email templates (HTML)
   - Send confirmation to team members
   - Payment reminder emails

3. **Payment Verification**
   - Auto-verify with manual screenshot review flow
   - Webhook integration with payment gateway
   - Send verification emails

4. **Security**
   - Add JWT authentication to admin endpoints
   - Rate limiting on registration
   - CAPTCHA on form submission

5. **Analytics**
   - Track registration success rate
   - Monitor payment verification time
   - Generate reports

---

## 🐛 TROUBLESHOOTING

### Backend Issues

**MongoDB Connection Error**
- Ensure MongoDB is running
- Check MONGO_URI in .env

**Email Not Sending**
- Verify EMAIL_USER and EMAIL_PASS in .env
- Check Gmail app password configuration
- Look for error in console logs

**QR Code Not Displaying**
- Ensure `/uploads/qrcodes` folder exists
- Check QR generation logic in controller
- Verify API_BASE_URL in frontend .env

### Frontend Issues

**API Calls Failing (404 errors)**
- Check VITE_API_BASE_URL in .env
- Ensure backend server is running
- Verify CORS is enabled in server.js

**File Upload Not Working**
- Check multer configuration
- Verify form has `enctype="multipart/form-data"`
- Check file size (< 5MB)

**Form Not Validating**
- Check browser console for JS errors
- Verify input field onChange handlers
- Test regex patterns independently

---

## 📧 EMAIL TEMPLATE

The email sent after registration contains:
- Registration ID
- QR Code (attached PNG file)
- Instructions to pay ₹299
- Payment deadline (optional)

---

## ✨ SUMMARY

You now have a **complete hackathon registration system**:

✅ Premium UI matching INFINITY 2K26 design
✅ Team & Individual registration modes  
✅ Multi-step form with validation
✅ QR code payment integration
✅ Email confirmation with QR attachment
✅ Screenshot upload for verification
✅ Admin API for verification
✅ Fully responsive design
✅ MongoDB data persistence
✅ Clean, modular code structure

**Status:** Ready for testing and deployment! 🎉
