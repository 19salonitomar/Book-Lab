import Book from "../models/Book.js";

export const getBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

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

    if (!title || !author || !publisher || !publishedDate || !pages || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const book = await Book.create({
      title,
      author,
      publisher,
      publishedDate,
      pages,
      description,
      image: req.file ? `/uploads/${req.file.filename}` : null,
    });

    res.status(201).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateBook = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const book = await Book.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json({ message: "Book deleted successfully" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

