const mongoose = require("mongoose");

// Check if the model already exists to prevent redefinition
const ShippingOption = mongoose.models.ShippingOption || mongoose.model("ShippingOption", new mongoose.Schema(
  {
    city: { type: String, required: true, unique: true },
    priceHomeDelivery: { type: Number, required: true },
    priceOfficeDelivery: { type: Number, required: true }
  },
  { timestamps: true }
));

module.exports = ShippingOption;
