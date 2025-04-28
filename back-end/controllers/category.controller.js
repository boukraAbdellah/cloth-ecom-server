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
    const { name } = req.body;
    const categoryId = req.params.id;
    
    // Check if another category with the same name exists (excluding the current one)
    if (name) {
      const existingCategory = await Category.findOne({ 
        name, 
        _id: { $ne: categoryId } 
      });
      
      if (existingCategory) {
        return res.status(400).json({ 
          error: `Category with name "${name}" already exists` 
        });
      }
    }
    
    const category = await Category.findByIdAndUpdate(
      categoryId,
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