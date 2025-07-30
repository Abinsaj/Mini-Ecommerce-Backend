import Cart from "../Schema/cartSchema.js";
import Product from "../Schema/productSchema.js";

const updateOrCreateCart = async (req, res) => {
    try {
      const { userId, cartItems } = req.body;
  
      console.log(cartItems, 'Received cart items');
  
      if (!userId || !cartItems) {
        return res.status(400).json({ message: "Missing userId or cartItems" });
      }
  
      let cart = await Cart.findOne({ userId });
  
      if (!cart) {
        cart = new Cart({ userId, items: [] });
      }
  
      for (const item of cartItems) {
        const product = await Product.findById(item._id);
        if (!product) {
          console.warn(`Product not found for ID: ${item._id}. Skipping this item.`);
          continue;
        }
  
        const existingItemIndex = cart.items.findIndex(
          (cartItem) => cartItem.productId.toString() === product._id.toString()
        );
  
        if (existingItemIndex !== -1) {
          cart.items[existingItemIndex].quantity = item.cartQuantity;
        } else {
          cart.items.push({
            productId: product._id,
            name: product.name,
            image: product.image,
            price: product.price,
            quantity: item.cartQuantity,
          });
        }
      }
  
      cart.updatedAt = Date.now();
      await cart.save();
  
      res.status(200).json({ success: true, message: "Cart updated", cart });
  
    } catch (err) {
      console.error("Error in updateOrCreateCart:", err);
      res.status(500).json({ success: false, message: err.message || "Server error" });
    }
  };
  
  const getUserCart = async(req, res)=>{
    try {
        const { userId } = req.params;
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found for this user." });
        }
        res.status(200).json({ success: true, cart });
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

  export {
    updateOrCreateCart,
    getUserCart,
    updateCartQuantity
  }