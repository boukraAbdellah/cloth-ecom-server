const Order = require('../models/order.model');
const ShippingOption = require('../models/shipping.model');
const Product = require('../models/product.model');

async function createOrder(req, res) {
  try {
    const { customerName, customerPhone, customerAddress, city, products, shippingMethod, shippingPrice } = req.body;

    // Try to find shipping option, but make it optional if shippingPrice is provided
    let shippingCost = shippingPrice; // Use provided shipping price if available
    
    if (!shippingPrice) {
      const shipping = await ShippingOption.findOne({ city });
      if (!shipping) return res.status(404).json({ error: 'Shipping option not found' });
      
      // Map the shipping method values to the correct field names
      // "home" → priceHomeDelivery, "office" → priceOfficeDelivery
      shippingCost = shippingMethod === 'office' || shippingMethod === 'toOffice' ? 
        shipping.priceOfficeDelivery : shipping.priceHomeDelivery;
    }

    // Calculate products total
    let productsTotal = 0;
    for (let item of products) {
      const p = await Product.findById(item.product);
      if (!p) return res.status(404).json({ error: `Product not found: ${item.product}` });
      productsTotal += p.price * (item.quantity || 1);
    }

    const totalPrice = productsTotal + (shippingCost || 0);

    const order = await Order.create({
      customerName,
      customerPhone,
      customerAddress,
      city,
      products,
      shippingMethod,
      shippingCost,
      totalPrice,
      status: 'Pending'
    });

    res.json({ order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating order', details: error.message });
  }
}

async function getOrders(req, res) {
  try {
    const orders = await Order.find()
      .populate('products.product')
      .sort({ createdAt: -1 }); // Sort by newest first
    res.json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching orders' });
  }
}

async function getTodayOrders(req, res) {
  try {
    // Set up date range for today
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // Start of tomorrow
    
    const orders = await Order.find({
      createdAt: {
        $gte: today,
        $lt: tomorrow
      }
    })
    .populate('products.product')
    .sort({ createdAt: -1 }); // Sort by newest first
    
    res.json({ 
      orders,
      count: orders.length,
      date: today.toISOString().split('T')[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching today\'s orders' });
  }
}

async function getOrderById(req, res) {
  try {
    const order = await Order.findById(req.params.id).populate('products.product');
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json({ order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching order' });
  }
}

async function updateOrderStatus(req, res) {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json({ order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating order status' });
  }
}

async function deleteOrder(req, res) {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json({ message: 'Order deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting order' });
  }
}

module.exports = {
  createOrder,
  getOrders,
  getTodayOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder
};