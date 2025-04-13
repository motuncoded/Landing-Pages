// Create a new book
const create_book = async (req, res) => {
  const { title, author, genre } = req.body;
  const book = new Book({
    title,
    author,
    genre,
  });

  book
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error: "Error creating book" });
    });
};

// Get all books
const get_all_books = async (req, res) => {
  Book.find()
    .then((books) => {
      res.json(books);
    })
    .catch((error) => {
      res.status(500).json({ error: "Error retrieving books" });
    });
};

// Get a single book by ID
const get_a_book = async (req, res) => {
  const { id } = req.params;

  Book.findById(id)
    .then((book) => {
      if (book) {
        res.json(book);
      } else {
        res.status(404).json({ error: "Book not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Error retrieving book" });
    });
};

// Update a book by ID
const update_a_book = async (req, res) => {
  const { id } = req.params;
  const { title, author, genre } = req.body;

  Book.findByIdAndUpdate(
    id,
    {
      title,
      author,
      genre,
    },
    { new: true },
  )
    .then((book) => {
      if (book) {
        res.json(book);
      } else {
        res.status(404).json({ error: "Book not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Error updating book" });
    });
};

// Delete a book by ID
const delete_a_book = async (req, res) => {
  const { id } = req.params;

  Book.findByIdAndRemove(id)
    .then((book) => {
      if (book) {
        res.json(book);
      } else {
        res.status(404).json({ error: "Book not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Error deleting book" });
    });
};

module.exports = {
  create_book,
  get_all_books,
  get_a_book,
  update_a_book,
};
