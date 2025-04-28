const Category = require('../models/category.model');

async function createCategory(req, res) {
  try {
    const category = await Category.create(req.body);
    res.json({ category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating category' });
  }
}

async function getCategories(req, res) {
  try {
    const categories = await Category.find();
    res.json({ categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching categories' });
  }
}

async function updateCategory(req, res) {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json({ category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating category' });
  }
}

async function deleteCategory(req, res) {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json({ message: 'Category deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting category' });
  }
}

module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory
};