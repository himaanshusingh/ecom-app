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

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);

app.listen(PORT, async () => {
  await connectDb();
  await connectCloudinary();
  console.log(`Server is running on port ${PORT}`);
});
