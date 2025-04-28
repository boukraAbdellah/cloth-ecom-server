const express = require('express');
const router = express.Router();
const { 
  createOrder, 
  getOrders, 
  getTodayOrders,
  getOrderById, 
  updateOrderStatus, 
  deleteOrder 
} = require('../controllers/order.controller');

// Order routes
router.post('/', createOrder);
router.get('/', getOrders);
router.get('/today', getTodayOrders);  // New route for today's orders
router.get('/:id', getOrderById);
router.put('/:id/status', updateOrderStatus);
router.delete('/:id', deleteOrder);

module.exports = router;