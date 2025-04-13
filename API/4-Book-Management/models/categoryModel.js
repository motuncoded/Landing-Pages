const categoryModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});
