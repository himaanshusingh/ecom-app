import express from "express"
import { adminLogin, googleLogin, login, logout, registration } from "../controllers/authController.js"

const authRouter = express.Router()

authRouter.post("/registration", registration)
authRouter.post("/login",login)
authRouter.get("/logout",logout)
authRouter.post("/googlelogin",googleLogin)
authRouter.post("/adminlogin",adminLogin)
export default authRouter