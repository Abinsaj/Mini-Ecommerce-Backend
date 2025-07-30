import Cart from "../Schema/cartSchema.js";
import Order from "../Schema/orderSchema.js";

const placeOrder = async (req, res) => {
    try {
        console.log('its hrrererererererere')
      const { userId, items, totalAmount, paymentMode } = req.body;
  
      if (!userId || !items || !paymentMode || totalAmount === undefined) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
      }
  
      const newOrder = new Order({
        userId,
        items,
        totalAmount,
        paymentMode
      });

      await Cart.findOneAndUpdate(
        { userId },
        { $set: { items: [] } },
        {new:true}
      );
  
      await newOrder.save();
  
      res.status(201).json({
        success: true,
        message: 'Order placed successfully',
        order: newOrder
      });
  
    } catch (error) {
      console.error('Error placing order:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };

export { 
    placeOrder
}