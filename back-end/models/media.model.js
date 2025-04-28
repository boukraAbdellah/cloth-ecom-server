const mongoose = require("mongoose");

// Check if the model already exists to prevent redefinition
const Media = mongoose.models.Media || mongoose.model("Media", new mongoose.Schema(
  {
    url: { type: String, required: true },
    public_id: { type: String, required: true }, // مهم جدا لحذف الصور من Cloudinary
    title: { type: String },
    altText: { type: String },
    tags: [{ type: String }],
  },
  { timestamps: true }
));

module.exports = Media;
