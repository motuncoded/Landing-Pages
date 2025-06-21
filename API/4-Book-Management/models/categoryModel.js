const mongoose = require("mongoose");

// Create a schema for your book category

const categoryModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("category", categoryModel);
