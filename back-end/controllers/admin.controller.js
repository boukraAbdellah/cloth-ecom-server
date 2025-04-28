const Admin = require('../models/admin.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new admin
async function registerAdmin(req, res) {
  try {
    const { username, email, password, role } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: 'Admin with this email already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create admin with default role as 'editor' if not specified
    const admin = await Admin.create({
      username,
      email,
      password: hashedPassword,
      role: role || 'editor'
    });

    // Don't include password in response
    const adminResponse = {
      _id: admin._id,
      username: admin.username,
      email: admin.email,
      role: admin.role
    };

    res.status(201).json({ admin: adminResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error registering admin' });
  }
}

// Login admin
async function loginAdmin(req, res) {
  try {
    const { email, password } = req.body;

    // Check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET || "your_jwt_secret_key",
      { expiresIn: "1d" }
    );

    // Return admin info and token
    res.json({
      admin: {
        _id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role
      },
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error logging in' });
  }
}

// Get admin profile
async function getAdminProfile(req, res) {
  try {
    const admin = await Admin.findById(req.params.id).select('-password');
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    res.json({ admin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving admin profile' });
  }
}

// Get all admins (super admin only)
async function getAllAdmins(req, res) {
  try {
    const admins = await Admin.find().select('-password');
    res.json({ admins });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving admins' });
  }
}

module.exports = {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
  getAllAdmins
};