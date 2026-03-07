import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js";
import cors from "cors";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5174/", "http://localhost:5175/"],
    credentials: true,
  }),
);

// "https://ecommerce-cocart-frontend.onrender.com",
//   "https://ecommerce-cocart-admin.onrender.com",
app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.listen(port, async () => {
  await connectDb();
  console.log("server running...");
});
