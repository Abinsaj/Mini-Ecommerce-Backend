import express from 'express'
import { updateOrCreateCart, getUserCart, updateCartQuantity } from '../controller/cartController.js';

const cartRouter = express.Router();

cartRouter.post('/',updateOrCreateCart)
cartRouter.get('/:userId',getUserCart)
cartRouter.put('/:itemId',updateCartQuantity)

export default cartRouter;