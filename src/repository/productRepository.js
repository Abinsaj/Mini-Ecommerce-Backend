import Product from "../Schema/productSchema.js"

const createProduct = async ({ name, description, price, quantity, image }) => {

    const product = new Product({
        name,
        description,
        price,
        quantity,
        image
    })

    return await product.save();

}

const allProduct = async()=>{
    const products = await Product.find()
    return products;
}

const getProduct = async(id)=>{
    const product = await Product.findOne({_id: id})
    return product
}

const updateProductById = async (id, updateData) => {
    return await Product.findByIdAndUpdate(id, updateData, { new: true });
};

const productDelete = async(id)=>{
    return await Product.findByIdAndDelete({_id: id})
}

export {
    createProduct,
    allProduct,
    getProduct,
    updateProductById,
    productDelete
}