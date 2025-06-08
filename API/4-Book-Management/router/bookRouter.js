const { Router } = require("express");

const {
  create_book,
  get_all_books,
  get_a_book,
  update_a_book,
  delete_a_book
} = require("../controllers/bookController");


  const bookRouter = Router();
  
  /**
   * @swagger
   * tags:
   *   name: Books
   *   description: Book management and retrieval
   */

  /**
   * @swagger
   * components:
   *   schemas:
   *     Book:
   *       type: object
   *       required:
   *         - title
   *         - author
   *         - description
   *         - genre
   *       properties:
   *         _id:
   *           type: string
   *           description: The auto-generated id of the book
   *           example: 60d0fe4f5311236168a109ca
   *         title:
   *           type: string
   *           example: The Great Gatsby
   *         author:
   *           type: string
   *           example: F. Scott Fitzgerald
   *         description:
   *           type: string
   *           example: A novel set in the Roaring Twenties.
   *         genre:
   *           type: string
   *           example: Fiction
   */

 

  /**
   * @swagger
   *    /book/create:
   *   post:
   *     summary: Create a new Book
   *     tags: [Books]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Book'
   *     responses:
   *       201:
   *         description: Book created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Book'
   *       400:
   *         description: Bad Request
 */


bookRouter.post("/book/create", create_book);

  /**
   * @swagger
   *    /books:
    *   get:
    *     summary: Get all Books
    *     tags: [Books]
    *     responses:
    *       200:
    *         description: List of all books
    *         content:
    *           application/json:
    *             schema:
    *               type: array
    *               items:
    *                 $ref: '#/components/schemas/Book'
    */



  /**
   * @swagger
   * /books/:idmvv:
   *   get:
   *     summary: Get a single Book by ID
   *     tags: [Books]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The book ID
   *     responses:
   *       200:
   *         description: The book description by ID
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Book'
   *       404:
   *         description: Book not found
   *
   *   put:
   *     summary: Update a Book by ID
   *     tags: [Books]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The book ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Book'
   *     responses:
   *       200:
   *         description: The updated book
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Book'
   *       404:
   *         description: Book not found
   *
   *   delete:
   *     summary: Delete a Book by ID
   *     tags: [Books]
   *     parameters:
   *       - in: path
   *         name: bookId
   *         schema:
   *           type: string
   *         required: true
   *         description: The book ID
   *     responses:
   *       200:
   *         description: Book deleted successfully
   *       404:
   *         description: Book not found
   */

  bookRouter.post("/book/create", create_book);

  // Get all Books
  bookRouter.get("/books", get_all_books);

  // Get a single Book with bookId
  bookRouter.get("/books/:id", get_a_book);

  // Update a Book with bookId
  bookRouter.put("/books/:id", update_a_book);

  // Delete a Book with bookId
bookRouter.delete("/books/:id", delete_a_book);
  


module.exports = bookRouter;
