var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Book = require("../models/book.js");
const fs = require('fs');
const multer = require('multer');

// Create a new book record
// Create a new book record
router.post('/', async (req, res) => {
  try {
    const params = req.body;
    const book = new Book();

    book.isbn = params.isbn;
    book.title = params.title;
    book.author = params.author;
    book.category = params.category;
    book.description = params.description;
    book.published_year = params.published_year;
    book.publisher = params.publisher;
    book.price = params.price;
    book.cover_photo = params.cover_photo;
    book.imagePath = params.imagePath;

    const existingBook = await Book.findOne({ isbn: book.isbn });

    if (existingBook) {
      return res.status(200).send({ message: 'A book with this ISBN already exists.' });
    }

    const bookStored = await book.save();

    if (bookStored) {
      return res.status(201).send({ message: 'Book saved Successfully', book: bookStored });
    } else {
      return res.status(404).send({ message: 'Book not saved' });
    }
  } catch (error) {
    return res.status(500).send({ message: 'Error in the request' });
  }
});



// Get all books
router.get('/books', async (req, res) => {
  try {
    // Fetch all books from the database
    const allBooks = await Book.find();

    // Get the total number of books
    const totalBooks = allBooks.length;

    // Additional metadata
    const metadata = {
      message: 'Books retrieved successfully',
      timestamp: new Date()
    };

    // Respond with the total number of books, all book records, and metadata
    res.status(200).json({ totalBooks, books: allBooks, metadata });
  } catch (error) {
    // Handle any errors, e.g., database connection issues
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

/* GET SINGLE BOOK BY ID */

// Route to get a single book's details by its ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a book by its ID
router.put('/:id', async (req, res) => {
  const bookId = req.params.id;
  const updatedBookData = req.body; // Updated book data in the request body

  try {
    // Find the book by ID and update it with the new data
    const updatedBook = await Book.findByIdAndUpdate(bookId, updatedBookData, { new: true });

    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    return res.status(200).json(updatedBook);
  } catch (error) {
    return res.status(500).json({ message: 'Error updating the book', error });
  }
});

/* DELETE BOOK */
router.delete("/:id", function (req, res, next) {
  Book.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
