import express from 'express'
import { isAuth } from '../middlewares/isAuth.js'
import { allOrders, placeOrder, placeOrderRazorpay, updateStatus, userOrders, verifyRazorpay } from '../controllers/orderController.js'
import { adminAuth } from '../middlewares/adminAuth.js'

const orderRouter = express.Router()
//user
orderRouter.post('/placeorder',isAuth,placeOrder)
orderRouter.post('/userorders',isAuth,userOrders)
orderRouter.post('/placeorderrazorpay',isAuth,placeOrderRazorpay)
orderRouter.post('/verifyrazorpay',isAuth,verifyRazorpay)

//order
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

export default orderRouter