const mongoose = require("mongoose");

// Check if the model already exists to prevent redefinition
const Order = mongoose.models.Order || mongoose.model("Order", new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true },
    customerAddress: { type: String, required: true },
    city: { type: String, required: true },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true
        },
        quantity: { type: Number, default: 1 },
        variant: { type: Map, of: String } // Example: { "Size": "M", "Color": "Black" }
      }
    ],
    shippingMethod: { type: String, enum: ["home", "toHome", "office", "toOffice"], required: true },
    shippingCost: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
));

module.exports = Order;
