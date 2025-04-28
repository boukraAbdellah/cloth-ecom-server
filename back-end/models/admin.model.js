const mongoose = require('mongoose');

// Check if the model already exists to prevent redefinition
const Admin = mongoose.models.Admin || mongoose.model('Admin', new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    role: {
      type: String,
      enum: ['super-admin', 'admin', 'editor'],
      default: 'admin'
    },
    lastLogin: {
      type: Date
    }
  },
  { timestamps: true }
));

module.exports = Admin;
