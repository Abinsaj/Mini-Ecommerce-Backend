import express from 'express'
import { updateOrCreateCart, getUserCart, updateCartQuantity } from '../controller/cartController.js';
import { verifyUserToken } from '../middleware/userMiddleware.js';

const cartRouter = express.Router();

cartRouter.post('/',verifyUserToken,updateOrCreateCart)
cartRouter.get('/:userId',verifyUserToken,getUserCart)
cartRouter.put('/:itemId',verifyUserToken,updateCartQuantity)

export default cartRouter;