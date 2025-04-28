const express = require('express');
const router = express.Router();
const { 
  createShippingOption, 
  getShippingOptions, 
  updateShippingOption, 
  deleteShippingOption 
} = require('../controllers/shipping.controller');

// Shipping routes
router.post('/', createShippingOption);
router.get('/', getShippingOptions);
router.put('/:id', updateShippingOption);
router.delete('/:id', deleteShippingOption);

module.exports = router;