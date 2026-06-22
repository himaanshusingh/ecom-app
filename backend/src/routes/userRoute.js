import { Router } from "express";
import { loginUser, registerUser, loginAdmin, getUserProfile, updateUserProfile } from "../controllers/userController.js";
import userAuth from "../middlewares/userAuth.js";

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", loginAdmin);
userRouter.get("/profile", userAuth, getUserProfile);
userRouter.post("/update-profile", userAuth, updateUserProfile);

export default userRouter;
