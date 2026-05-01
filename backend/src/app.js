// External Modules :-
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

// Local Modules :-
import { PORT } from "./config/envConfig.js";
import connectDb from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

const app = express();

// Initialize connections
connectDb();
connectCloudinary();

app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "token"],
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// To check the api status.
app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
