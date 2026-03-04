const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, default: "" },
  phone: { type: String, default: "" },
  college: { type: String, default: "" },
  year: { type: String, default: "" },
  branch: { type: String, default: "" }
});

const PaymentSchema = new mongoose.Schema({
  amount: { type: Number, default: 1000 },
  qrCodePath: { type: String, default: '' },
  screenshotUrl: { type: String, default: "" }, // Cloudinary/URL to screenshot
  status: {
    type: String,
    enum: ['Pending Verification', 'Verified', 'Rejected'],
    default: 'Pending Verification'
  }
});

const HackRegistrationSchema = new mongoose.Schema({
  registrationId: { type: String, unique: true, index: true },
  registrationType: { type: String, enum: ['individual', 'team'], default: 'team' },
  teamSize: { type: Number, enum: [1, 2, 3], required: true },
  teamName: { type: String, required: true },
  members: { type: [MemberSchema], default: [] },
  amount: { type: Number, default: 1000 },
  payment: { type: PaymentSchema, required: true },
  sheetRow: { type: Number }, // row in Google Sheet, set after append
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('HackRegistration', HackRegistrationSchema);
