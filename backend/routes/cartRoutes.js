import express from 'express'
import { isAuth } from '../middlewares/isAuth.js'
import { addtoCart, getUserCart, UpdateCart } from '../controllers/cartController.js'

const cartRouter = express.Router()

cartRouter.post('/get',isAuth,getUserCart)
cartRouter.post('/add',isAuth,addtoCart)
cartRouter.post('/update',isAuth,UpdateCart)

export default cartRouter