const mongoose = require("mongoose");

const taskModel = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  deadline: { type: Date },
  completed: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
});

module.exports = mongoose.model("task", taskModel);
