const Product = require('../models/product.model');
const Media = require('../models/media.model');

async function createProduct(req, res) {
  try {
    const {
      title,
      slug,
      description,
      price,
      category,
      badges,
      images: imageIds,
      variants,
      stockQuantity,
      inStock,
      thumbnailId,
    } = req.body;

    // Resolve image refs
    const images = await Media.find({ _id: { $in: imageIds || [] } });
    const thumbnail = thumbnailId
      ? await Media.findById(thumbnailId)
      : null;

    const product = await Product.create({
      title,
      slug,
      description,
      price,
      category,
      badges,
      images,
      variants,
      stockQuantity,
      inStock,
      thumbnail,
    });

    res.json({ product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating product' });
  }
}

async function getProducts(req, res) {
  try {
    const products = await Product.find()
      .populate('category images thumbnail');
    res.json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching products' });
  }
}

async function getProductBySlug(req, res) {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .populate('category images thumbnail');
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching product' });
  }
}

async function updateProduct(req, res) {
  try {
    const updates = { ...req.body };

    if (req.body.images) {
      updates.images = await Media.find({ _id: { $in: req.body.images } });
    }
    if (req.body.thumbnailId) {
      updates.thumbnail = await Media.findById(req.body.thumbnailId);
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    ).populate('category images thumbnail');

    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating product' });
  }
}

async function deleteProduct(req, res) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting product' });
  }
}

module.exports = {
  createProduct,
  getProducts,
  getProductBySlug,
  updateProduct,
  deleteProduct
};