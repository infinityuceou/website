import crypto from "crypto";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    studentData
  } = req.body;

  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generated_signature !== razorpay_signature) {
    return res.status(400).json({ status: "Payment verification failed" });
  }

  try {
    // Save to Google Sheet
    await fetch(process.env.GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...studentData,
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
      }),
    });

    res.status(200).json({ status: "Payment verified & saved" });

  } catch (error) {
    res.status(500).json({ status: "Verified but failed to save" });
  }
}