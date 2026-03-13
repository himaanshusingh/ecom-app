import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { adminAuth } from "../middlewares/adminAuth.js";
import { allOrders, placeOrder } from "../controllers/orderController.js";
import { updateStatus, userOrders } from "../controllers/orderController.js";
import { placeOrderRazorpay } from "../controllers/orderController.js";
import { verifyRazorpay } from "../controllers/orderController.js";

const orderRouter = express.Router();

// user
orderRouter.post("/placeorder", isAuth, placeOrder);
orderRouter.post("/userorders", isAuth, userOrders);
orderRouter.post("/placeorderrazorpay", isAuth, placeOrderRazorpay);
orderRouter.post("/verifyrazorpay", isAuth, verifyRazorpay);

// order
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

export default orderRouter;
