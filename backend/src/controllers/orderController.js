import userModel from "../models/userModel.js";

// Place orders from cash
export async function placeOrder(req, res) {
  try {
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };
    const order = await orderModel.create(orderData);
    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    res.json({ success: true, message: "Order Placed" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
}

// Place orders from stripe
export async function placeOrderStripe(req, res) {}

// Place orders from razorpay
export async function placeOrderRazorpay(req, res) {}

// User orders data for frontend
export async function userOrders(req, res) {}

// All orders data for admin
export async function allOrders(req, res) {}

// Update order status for admin
export async function updateStatus(req, res) {}
