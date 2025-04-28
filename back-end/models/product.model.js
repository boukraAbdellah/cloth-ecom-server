const mongoose = require("mongoose");

// Check if the model already exists to prevent redefinition
const Product = mongoose.models.Product || mongoose.model("Product", new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: "Media" }],
    badge: { type: String }, // optional: "sale", "promo", etc.
    variants: [
      {
        name: String, // Example: Size, Color...
        options: [String], // Example: ["S", "M", "L"]
      },
    ],
    isFeatured: { type: Boolean, default: false },
    stockQuantity: { type: Number },
    manageStock: { type: Boolean, default: false },
    thumbnail: { type: mongoose.Schema.Types.ObjectId, ref: "Media" },
  },
  { timestamps: true }
));

module.exports = Product;
