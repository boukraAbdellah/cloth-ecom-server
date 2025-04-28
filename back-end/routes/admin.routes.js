const express = require('express');
const router = express.Router();
const { 
  registerAdmin, 
  loginAdmin, 
  getAdminProfile, 
  getAllAdmins 
} = require('../controllers/admin.controller');

// Admin authentication routes
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/profile/:id', getAdminProfile);
router.get('/', getAllAdmins);

module.exports = router;