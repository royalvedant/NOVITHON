const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());

// Serve all static website assets from the root directory
app.use(express.static(__dirname));

// Initialize Razorpay client with secure live keys
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Endpoint: Create a secure payment order
app.post('/api/create-order', async (req, res) => {
  try {
    const options = {
      amount: 9900, // Amount in paise (9900 paise = ₹99)
      currency: "INR",
      receipt: `receipt_novithon_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);
    
    // Return only public keys and order details to client
    res.json({
      order_id: order.id,
      amount: order.amount,
      key_id: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ error: error.message || "Failed to create order" });
  }
});

// Endpoint: Validate payment signatures cryptographic hashes
app.post('/api/verify-payment', (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ status: "failure", error: "Missing checkout payload parameters" });
    }

    const text = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(text.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      res.json({ status: "success", message: "Signature verification succeeded" });
    } else {
      res.status(400).json({ status: "failure", error: "Invalid cryptographic signature detected" });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ error: error.message || "Verification failed" });
  }
});

// Fallback routing: redirect any unmatched paths to landing page
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server active on http://localhost:${PORT}`);
});
