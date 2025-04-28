const express = require('express');
const router = express.Router();
const { 
  createProduct, 
  getProducts, 
  getProductBySlug, 
  updateProduct, 
  deleteProduct 
} = require('../controllers/product.controller');

// Product routes
router.post('/', createProduct);
router.get('/', getProducts);
router.get('/:slug', getProductBySlug);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;