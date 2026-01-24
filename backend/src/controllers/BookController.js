import Book from "../models/Book.js";
import cloudinary from "../config/cloudinary.js";

/* =========================
   GET ALL BOOKS
========================= */
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   CREATE BOOK
========================= */
export const createBook = async (req, res) => {
  try {
    const {
      title,
      author,
      publisher,
      publishedDate,
      pages,
      description,
    } = req.body;

    if (
      !title ||
      !author ||
      !publisher ||
      !publishedDate ||
      !pages ||
      !description
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let imageUrl = null;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "booklab",
      });
      imageUrl = result.secure_url;
    }

    const book = await Book.create({
      title,
      author,
      publisher,
      publishedDate,
      pages,
      description,
      image: imageUrl,
    });

    res.status(201).json(book);
  } catch (error) {
    console.error("Create Book Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   UPDATE BOOK
========================= */
export const updateBook = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "booklab",
      });
      updateData.image = result.secure_url;
    }

    const book = await Book.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
  } catch (error) {
    console.error("Update Book Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   DELETE BOOK
========================= */
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Delete Book Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
