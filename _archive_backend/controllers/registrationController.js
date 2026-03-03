const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const QRCode = require('qrcode');
const nodemailer = require('nodemailer');
const HackRegistration = require('../models/HackRegistration');
const multerConfig = require('../middleware/multerConfig');

// new services for Cloudinary and Sheets (Service Account)
const cloudinaryService = require('../services/cloudinaryService');
const sheetsService = require('../services/googleSheetsService');

// ensure upload folders exist
const qrDir = path.join(__dirname, '..', 'uploads', 'qrcodes');
const paymentsDir = path.join(__dirname, '..', 'uploads', 'payments');
if (!fs.existsSync(qrDir)) fs.mkdirSync(qrDir, { recursive: true });
if (!fs.existsSync(paymentsDir)) fs.mkdirSync(paymentsDir, { recursive: true });

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.register = async (req, res) => {
  try {
    // team-only registration
    const { teamName, members, teamSize } = req.body;
    if (!teamName || !members || !teamSize) {
      return res.status(400).json({ success: false, error: 'Missing required fields (teamName, members, teamSize)' });
    }

    const size = parseInt(teamSize, 10);
    if (![1, 2, 3].includes(size)) {
      return res.status(400).json({ success: false, error: 'teamSize must be 1, 2 or 3' });
    }

    // members must be an array and have at least `size` entries
    const parsedMembers = Array.isArray(members) ? members : (typeof members === 'string' ? JSON.parse(members) : []);
    if (!Array.isArray(parsedMembers) || parsedMembers.length < size) {
      return res.status(400).json({ success: false, error: 'Members array must contain data for all team members' });
    }

    // Ensure leader (first member) has required fields
    const leader = parsedMembers[0];
    if (!leader || !leader.name || !leader.email || !leader.phone) {
      return res.status(400).json({ success: false, error: 'Leader must include name, email and phone' });
    }

    // amount must always be fixed server-side
    const amount = 1000;

    const registrationId = `INFY-${uuidv4().split('-')[0].toUpperCase()}`;

    const upi = process.env.UPI_ID || 'infinity@upi';
    const payee = process.env.PAYEE_NAME || 'INFINITY2K26';
    const tn = `INF2026_${registrationId}`;
    const qrText = `upi://pay?pa=${upi}&pn=${encodeURIComponent(payee)}&am=${amount}&cu=INR&tn=${tn}`;

    const qrFilename = `${registrationId}.png`;
    const qrPath = path.join('uploads', 'qrcodes', qrFilename);
    const qrFullPath = path.join(qrDir, qrFilename);
    await QRCode.toFile(qrFullPath, qrText, { type: 'png' });

    const safeMembers = parsedMembers.slice(0, size).map((m) => ({
      name: m.name,
      email: m.email || '',
      phone: m.phone || '',
      college: m.college || '',
      year: m.year || '',
      branch: m.branch || ''
    }));

    const reg = new HackRegistration({
      registrationId,
      teamSize: size,
      teamName,
      members: safeMembers,
      amount,
      payment: {
        amount,
        qrCodePath: qrPath,
        screenshotUrl: '',
        status: 'Pending Verification'
      }
    });

    await reg.save();

    // append to Google Sheet (async but we want row number)
    try {
      const rowNum = await sheetsService.appendRegistration(reg);
      if (rowNum) {
        reg.sheetRow = rowNum;
        await reg.save();
      }
    } catch (sheetErr) {
      console.error('Google Sheets append error', sheetErr);
      // don't block registration, but log for operators
    }

    // email to leader
    // email to leader (first member)
    try {
      const leaderEmail = reg.members[0]?.email;
      if (leaderEmail) {
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: leaderEmail,
          subject: `Registration Received — ${registrationId}`,
          text: `Thanks for registering. Your registration id is ${registrationId}. Please complete payment of ₹${amount} using the attached QR.`,
          attachments: [{ filename: qrFilename, path: qrFullPath }]
        };
        transporter.sendMail(mailOptions, (err) => {
          if (err) console.error('Email error', err);
        });
      }
    } catch (mailErr) {
      console.error('Mail send error', mailErr);
    }

    const qrCodeUrl = `${req.protocol}://${req.get('host')}/${qrPath}`;
    res.status(201).json({ success: true, registrationId, qrCodeUrl, amount });
  } catch (error) {
    console.error('Register error', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

exports.uploadPaymentMiddleware = multerConfig.uploadTo(path.join('uploads', 'payments'));

exports.uploadPayment = async (req, res) => {
  try {
    const { registrationId } = req.body;
    if (!registrationId) return res.status(400).json({ success: false, error: 'registrationId required' });
    if (!req.file) return res.status(400).json({ success: false, error: 'Payment screenshot required' });

    console.log('[Ctrl] uploadPayment received file:', req.file);

    const reg = await HackRegistration.findOne({ registrationId });
    if (!reg) return res.status(404).json({ success: false, error: 'Registration not found' });

    // upload to Cloudinary
    let cloudInfo;
    try {
      const localPath = path.join(paymentsDir, req.file.filename);
      console.log('[Ctrl] attempting upload to Cloudinary:', localPath);
      cloudInfo = await cloudinaryService.uploadImage(localPath, 'infinity2k26/payments');
      console.log('[Ctrl] cloudInfo returned', cloudInfo);

      // remove local file since Cloudinary has it now
      try {
        fs.unlinkSync(localPath);
        console.log('[Ctrl] deleted local temp file');
      } catch (uerr) {
        console.warn('[Ctrl] Failed to delete temp file', uerr);
      }
    } catch (cloudErr) {
      console.error('[Ctrl] Cloudinary upload error', cloudErr);
      cloudInfo = null;
    }

    // set screenshot URL from cloud or local path if fallback
    reg.payment.screenshotUrl = cloudInfo?.secure_url || `uploads/payments/${req.file.filename}`;
    reg.payment.status = 'Pending Verification';

    // update sheet row if we know it
    try {
      await sheetsService.updatePaymentStatus(
        registrationId,
        reg.payment.status,
        reg.payment.screenshotUrl,
        reg.sheetRow
      );
    } catch (sheetErr) {
      console.error('Google Sheets update error', sheetErr);
    }

    await reg.save();

    if (process.env.ADMIN_EMAIL) {
      transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: `Payment uploaded — ${registrationId}`,
        text: `Payment screenshot uploaded for ${registrationId}`,
        attachments: [{ path: path.join(paymentsDir, req.file.filename) }]
      }, () => {});
    }

    const responsePayload = { success: true, message: 'Uploaded and pending verification' };
    if (!cloudInfo) responsePayload.cloudError = 'Failed to upload screenshot to Cloudinary';

    res.json(responsePayload);
  } catch (error) {
    console.error('Upload payment error', error);
    res.status(500).json({ success: false, error: error.message || 'Internal server error' });
  }
};

exports.listRegistrations = async (req, res) => {
  try {
    // project fields needed by admin UI
    const regs = await HackRegistration.find()
      .sort({ createdAt: -1 })
      .select('registrationId teamSize teamName members payment.amount payment.status payment.screenshotUrl payment.qrCodePath');
    res.json(regs);
  } catch (error) {
    console.error('List regs error', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};
