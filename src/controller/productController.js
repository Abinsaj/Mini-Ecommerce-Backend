import uploadImage from "../config/cloudinaryConfig.js";
import { createProduct, allProduct, getProduct, updateProductById, productDelete } from "../repository/productRepository.js";

const addProduct = async(req, res) =>{
    try {
        const file = req.file;
        const {name, price, description, quantity} = req.body;

        if(!file){
             res.status(400).json({message: 'Product image is required'});
        }
        const upload = await uploadImage(file)

        const newProduct = await createProduct({
            name, 
            description, 
            price, 
            quantity, 
            image: upload.secure_url
        })

         res.status(201).json({message:'Product added', product: newProduct})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Something went wrong"});
    }
}

const getProducts = async(req, res)=>{
    try {
        const product = await allProduct()
        if(product.length > 0){
            res.status(200).json({product})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Something went wrong'});
    }
}

const getSingleProduct = async(req, res)=>{
    try {
        const {id} = req.params
        const product = await getProduct(id)
        if(!product){
            res.status(404).json({message: 'Product not found'})
        }
        res.status(200).json({product})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Something went wrong'});
    }
}

const updateProduct = async(req, res)=>{
    try {
        const {id} = req.params;
        const file = req.file;
        const { name, price, description, quantity } = req.body

        const existingProduct = await getProduct(id);
        if(!existingProduct){
            res.status(404).json({message: 'Product not found'})
        }
        let imageUrl = existingProduct.image;

        if(file){
            const upload = await uploadImage(file);
            imageUrl = upload.secure_url
        }

        const updatedProduct = await updateProductById(id, {
            name,
            price,
            description,
            quantity,
            image: imageUrl,
        });

        res.status(200).json({success: true, message: "Product updated", product: updatedProduct });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

const deleteProduct = async(req, res)=>{
    try {
        const {id} = req.params
        const deleteProduct = await productDelete(id)
        res.status(200).json({ message: "Product deleted successfully", deleteProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

export {
    addProduct,
    getProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
}