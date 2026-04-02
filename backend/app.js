// External Modules :-
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Local Modules :-
import connectDb from "./src/config/db.js";
import authRouter from "./src/routes/authRoutes.js";
import userRouter from "./src/routes/userRoutes.js";
import productRouter from "./src/routes/productRoutes.js";
import cartRouter from "./src/routes/cartRoutes.js";
import orderRouter from "./src/routes/orderRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

// app.use(cors({
//   origin: [
//     "https://ecommerce-cocart-frontend.onrender.com",
//     "https://ecommerce-cocart-admin.onrender.com",
//     "http://localhost:5174/",
//     "http://localhost:5175/",
//   ],
//   credentials: true,
// }));

app.use(
  cors({
    origin: true, // allow all (safe for now)
    credentials: true,
    exposedHeaders: ["X-Total-Count"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
  }),
);

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.listen(process.env.PORT, async () => {
  await connectDb();
  console.log(`App is running on ${process.env.PORT}`);
});
