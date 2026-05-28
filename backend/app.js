// External Modules :-
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

// Local Modules :-
import { PORT } from "./src/config/envConfig.js";
import connectDb from "./src/config/mongodb.js";
import connectCloudinary from "./src/config/cloudinary.js";
import userRouter from "./src/routes/userRoute.js";
import productRouter from "./src/routes/productRoute.js";
import cartRouter from "./src/routes/cartRoute.js";
import orderRouter from "./src/routes/orderRoute.js";

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
