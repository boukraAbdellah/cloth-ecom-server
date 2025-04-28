const mongoose = require("mongoose");

// Check if the model already exists to prevent redefinition
const Category = mongoose.models.Category || mongoose.model("Category", new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    image: { type: mongoose.Schema.Types.ObjectId, ref: "Media" },
  },
  { timestamps: true }
));

module.exports = Category;
