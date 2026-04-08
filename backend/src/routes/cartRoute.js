import { Router } from "express";
import userAuth from "../middlewares/userAuth.js";
import { getUserCart } from "../controllers/cartController.js";
import { addToCart, updateCart } from "../controllers/cartController.js";

const cartRouter = Router();

cartRouter.post("/get", userAuth, getUserCart);
cartRouter.post("/add", userAuth, addToCart);
cartRouter.post("/update", userAuth, updateCart);

export default cartRouter;
