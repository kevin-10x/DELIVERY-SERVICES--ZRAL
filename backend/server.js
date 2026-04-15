require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/baraton", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const OrderSchema = new mongoose.Schema({
  name: String,
  location: String,
  item: String,
  status: { type: String, default: "pending" },
  phone: String,
  rider: String
});

const Order = mongoose.model("Order", OrderSchema);

// Create Order
app.post("/order", async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.send(order);
});

// Get Orders
app.get("/orders", async (req, res) => {
  const orders = await Order.find();
  res.send(orders);
});

// Update order status
app.put("/order/:id", async (req, res) => {
  await Order.findByIdAndUpdate(req.params.id, req.body);
  res.send("Updated");
});

// Rider location
let riderLocation = { lat: 0.3, lng: 35.3 };

app.post("/rider-location", (req, res) => {
  riderLocation = req.body;
  res.send("Location updated");
});

app.get("/rider-location", (req, res) => {
  res.send(riderLocation);
});

// Stats
app.get("/stats", async (req, res) => {
  const total = await Order.countDocuments();
  res.send({ total });
});

// M-Pesa STK Push
app.post("/mpesa", async (req, res) => {
  const { phone, amount } = req.body;

  try {
    // Get access token
    const auth = Buffer.from(`${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`).toString('base64');
    const tokenRes = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
      headers: { Authorization: `Basic ${auth}` }
    });
    const accessToken = tokenRes.data.access_token;

    // Timestamp
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
    const password = Buffer.from(`${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`).toString('base64');

    // STK Push
    const stkRes = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
      BusinessShortCode: process.env.MPESA_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: phone,
      PartyB: process.env.MPESA_SHORTCODE,
      PhoneNumber: phone,
      CallBackURL: `${process.env.BASE_URL}/mpesa/callback`,
      AccountReference: 'BaratonExpress',
      TransactionDesc: 'Payment for delivery'
    }, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    res.send({ message: 'STK Push sent', data: stkRes.data });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Payment failed' });
  }
});

// M-Pesa Callback
app.post('/mpesa/callback', (req, res) => {
  console.log('M-Pesa Callback:', req.body);
  // Handle callback logic here
  res.send('OK');
});