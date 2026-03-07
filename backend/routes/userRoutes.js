import express from "express"
import { isAuth } from "../middlewares/isAuth.js"
import { getAdmin, getCurrentUser } from "../controllers/userController.js"
import { adminAuth } from "../middlewares/adminAuth.js"

let userRouter = express.Router()

userRouter.get("/getcurrentuser",isAuth, getCurrentUser)
userRouter.get("/getadmin",adminAuth,getAdmin)

export default userRouter