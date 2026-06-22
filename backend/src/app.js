// External Modules :-
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

// Built-in Modules :-
import path from "path";
import { fileURLToPath } from "url";

// Local Modules :-
import { NODE_ENV, PORT } from "./config/envConfig.js";
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

if (NODE_ENV === "production") {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  
  app.use("/admin", express.static(path.join(__dirname, "../../admin/dist")));
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));
  
  app.get(/^\/admin(?!.*\.\w+$).*$/, (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../../admin", "dist", "index.html"),
    );
  });

  app.get(/.*/, (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../../frontend", "dist", "index.html"),
    );
  });
} else {
  app.get("/", (req, res) => res.send("API is running..."));
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
