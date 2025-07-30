import express from 'express'
import multer from 'multer'
import { 
    addProduct, 
    getProducts, 
    getSingleProduct, 
    updateProduct, 
    deleteProduct 
} from '../controller/productController.js';

const storage = multer.memoryStorage();
const upload = multer({storage: storage})

const productRouter = express.Router();

productRouter.post('/',upload.single('image'),addProduct)
productRouter.get('/',getProducts)
productRouter.get('/:id',getSingleProduct)
productRouter.put('/:id',upload.single('image'),updateProduct)
productRouter.delete('/:id',deleteProduct)

export default productRouter;