import { Router } from "express";
import {
  allOrders,
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  updateStatus,
  userOrders,
  verifyRazorpay,
  verifyStripe,
} from "../controllers/orderController.js";
import userAuth from "../middlewares/userAuth.js";
import adminAuth from "../middlewares/adminAuth.js";

const orderRouter = Router();

// Admin Routes :-
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

// User Routes :-
orderRouter.post("/place", userAuth, placeOrder);
orderRouter.post("/stripe", userAuth, placeOrderStripe);
orderRouter.post("/razorpay", userAuth, placeOrderRazorpay);
orderRouter.post("/userorders", userAuth, userOrders);

// Verify Payment :-
orderRouter.post("/verify-stripe", userAuth, verifyStripe);
orderRouter.post("/verify-razorpay", userAuth, verifyRazorpay);

export default orderRouter;
