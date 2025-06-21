const categoryModel = require("../models/categoryModel");

// Create a new category
const create_a_category = async (req, res, next) => {
  try {
    const { name } = req.body;

    const create_category = new categoryModel(req.body);
    await create_category.save();
    res
      .status(201)
      .json({ create_category, message: "Category created successfully" });
  } catch (error) {
    next(error);
  }
};

// Get all categories
const get_all_categories = async (req, res, next) => {
  try {
    const get_categories = await categoryModel.find();
    if (!get_categories) {
      return res.status(404).json({ message: "Categories not found" });
    }
    res.status(200).json({
      get_categories,
      count: get_categories.length,
      message: "Categories retrieved successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Get a single category by ID
const get_a_category = async (req, res, next) => {
  const { id } = req.params;
  try {
    const get_category = await categoryModel.findById(id);
    if (!get_category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res
      .status(200)
      .json({ get_category, message: "Category retrieved successfully" });
  } catch (error) {
    next(error);
  }
};

// Update a category by ID
const update_a_category = async (req, res, next) => {
  const { id } = req.params;

  try {
    const update_category = await categoryModel.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!update_category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res
      .status(200)
      .json({ update_category, message: "Category updated successfully" });
  } catch (error) {
    next(error);
  }
};

// Delete a category by ID
const delete_a_category = async (req, res, next) => {
  const { id } = req.params;
  try {
    const delete_category = await categoryModel.findByIdAndDelete(id);
    if (!delete_category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res
      .status(200)
      .json({ delete_category, message: "Category deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create_a_category,
  get_all_categories,
  get_a_category,
  update_a_category,
  delete_a_category,
};
