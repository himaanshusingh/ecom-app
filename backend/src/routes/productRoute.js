import { Router } from "express";
import { addProduct, removeProduct } from "../controllers/productController.js";
import { singleProduct } from "../controllers/productController.js";
import { listProducts } from "../controllers/productController.js";
import upload from "../middlewares/multer.js";
import adminAuth from "../middlewares/adminAuth.js";

const productRouter = Router();

productRouter.post(
  "/add",
  adminAuth,
  upload.fields([{ name: "images", maxCount: 4 }]),
  addProduct,
);

productRouter.post("/remove", adminAuth, removeProduct);
productRouter.get("/single", singleProduct);
productRouter.get("/list", listProducts);

export default productRouter;
