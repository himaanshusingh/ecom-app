import { Router } from "express";
import { loginUser, registerUser } from "../controllers/userController.js";
import { loginAdmin } from "../controllers/userController.js";

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", loginAdmin);

export default userRouter;
