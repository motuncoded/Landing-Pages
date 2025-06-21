const bookModel = require("../models/bookModel");
const categoryModel = require("../models/categoryModel");

// Create a new book
const create_book = async (req, res, next) => {
  const { title, author, genre, category } = req.body;

  try {
    const existingBook = await bookModel.findOne({ title });
    if (existingBook) {
      return res.status(409).json({
        message: "Book already exists",
        existingBook,
      });
    }

    // Find or create the category
    let categoryDoc = await categoryModel.findOne({ name: category });
    if (!categoryDoc) {
      categoryDoc = new categoryModel({ name: category });
      await categoryDoc.save();
    }

    // Create and save the new book
    const newBook = new bookModel({
      title,
      author,
      genre,
      category: categoryDoc._id,
    });

    await newBook.save();

    // Now populate the category in a separate query
    const createdBook = await bookModel
      .findById(newBook._id)
      .populate("category", "name");

    res.status(201).json({
      createdBook,
      message: "Book created successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Get all books
const get_all_books = async (req, res, next) => {
  try {
    const get_books = await bookModel.find().populate("category", "name");
    if (!get_books) {
      return res.status(404).json({ message: "Books not found" });
    }
    res
      .status(200)
      .json({ get_books, message: "Books retrieved successfully" });
  } catch (error) {
    next(error);
  }
};

// Get a single book by ID
const get_a_book = async (req, res, next) => {
  const { id } = req.params;
  try {
    const get_book = await bookModel.findById(id);
    if (!get_book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ get_book, message: "Book retrieved successfully" });
  } catch (error) {
    next(error);
  }
};

// Update a book by ID
const update_a_book = async (req, res, next) => {
  const { id } = req.params;
  const { title, author, genre, category } = req.body;

  try {
    // Check if category exists, if not, create it
    let categoryDoc = await categoryModel.findOne({ name: category });
    if (!categoryDoc) {
      categoryDoc = new categoryModel({ name: category });
    }
    await categoryDoc.save();
    const update_book = await bookModel
      .findByIdAndUpdate(
        id,
        {
          title,
          author,
          genre,
          category: categoryDoc._id,
        },
        { new: true },
      )
      .populate("category");

    if (!update_book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ update_book, message: "Book updated successfully" });
  } catch (error) {
    next(error);
  }
};

// Delete a book by ID
const delete_a_book = async (req, res) => {
  const { id } = req.params;

  try {
    const delete_book = await bookModel.findByIdAndDelete(id);
    if (!delete_book) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ delete_book, message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create_book,
  get_all_books,
  get_a_book,
  update_a_book,
  delete_a_book,
};
