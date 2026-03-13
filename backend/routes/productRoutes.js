import express from "express";
import upload from "../middlewares/multer.js";
import { adminAuth } from "../middlewares/adminAuth.js";
import { addProduct, listProduct } from "../controllers/productController.js";
import { removeProduct } from "../controllers/productController.js";

let productRouter = express.Router();

productRouter.post(
  "/addproduct",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct,
);

productRouter.get("/list", listProduct);
productRouter.post("/remove/:id", adminAuth, removeProduct);

export default productRouter;
