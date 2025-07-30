import express from 'express'
import { placeOrder } from '../controller/orderController.js'

const orderRoute = express.Router()

orderRoute.post('/',placeOrder)

export default orderRoute