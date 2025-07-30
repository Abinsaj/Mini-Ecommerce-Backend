import Cart from "../Schema/cartSchema.js";
import Product from "../Schema/productSchema.js";

const updateOrCreateCart = async (req, res) => {
  const { userId, product } = req.body;
  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId: product, quantity: 1 }],
      });
    } else {
      const existingItem = cart.items.find(item => item.productId.toString() === product);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.items.push({ productId: product, quantity: 1 });
      }
    }

    cart.updatedAt = Date.now();
    await cart.save();

    const populatedCart = await Cart.findOne({ userId }).populate('items.productId');
    res.status(200).json({success: true, cart: populatedCart });
  } catch (error) {
    res.status(500).json({success: false, message: "Failed to add to cart", error });
  }
  };
  
  const getUserCart = async(req, res)=>{
    try {
        const { userId } = req.params;
        const carts = await Cart.findOne({ userId }).populate('items.productId');

        if (!carts) {
            return res.status(404).json({ success: false, message: "Cart not found for this user." });
        }

        let cartData = []
        carts.items.forEach((val)=>{
          cartData.push({
            productId:val.productId._id,
            name:val.productId.name,
            image:val.productId.image,
            price:val.productId.price,
            quantity:val.quantity
          })
        })

        console.log(cartData)
        
        res.status(200).json({ success: true, cart: cartData });
    } catch (error) {
        console.error("Error fetching user cart:", error);
        res.status(500).json({ success: false, message: "Server error fetching cart." });
    }
  }

  const updateCartQuantity = async(req, res)=>{
    const { itemId } = req.params; 
    const { quantity, userId } = req.body; 
    if (typeof quantity !== 'number' ) {
        return res.status(400).json({ message: 'Quantity must be a positive number.' });
    }
    
    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found for this user.' });
        }

        const cartItemIndex = cart.items.findIndex(item => item.productId.toString() === itemId);
        if (cartItemIndex === -1) {
            return res.status(404).json({ message: 'Item not found in cart.' });
        }

        const product = await Product.findById(itemId);
        if (!product) {
            cart.items.splice(cartItemIndex, 1);
            await cart.save();
            return res.status(404).json({ message: 'Product not found, removed from cart.' });
        }

        if (quantity > product.quantity) {
            return res.status(400).json({ message: `Only ${product.quantity} items are available in stock.` });
        }

        cart.items[cartItemIndex].quantity += quantity; 
        await cart.save();

        
        const updatedCartItem = cart.items[cartItemIndex];
        const detailedUpdatedItem = {
            _id: product._id, 
            name: product.name,
            image: product.image,
            price: product.price,
            quantity: product.quantity,
            cartQuantity: updatedCartItem.quantity 
        };

        res.status(200).json(detailedUpdatedItem);

    } catch (error) {
        console.error("Error updating cart item quantity:", error);
        res.status(500).json({ message: error.message || 'Server error updating cart item quantity.' });
    }
  }

  const removeCartItem = async (req, res) => {
    const { userId } = req.body;
    const productId = req.params.id;
    try {
      const cart = await Cart.findOne({ userId });
  
      if (!cart) return res.status(404).json({ message: "Cart not found" });
  
      cart.items = cart.items.filter(item => item.productId.toString() !== productId);
  
      await cart.save();
  
      res.status(200).json({ message: "Item removed from cart", cart });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export {
    updateOrCreateCart,
    getUserCart,
    updateCartQuantity,
    removeCartItem
  }