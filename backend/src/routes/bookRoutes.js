import express from "express";
import {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/BookController.js";
import upload from "../middleware/uploads.js";


const router = express.Router();

router.get("/", getBooks);
router.post("/", upload.single("image"), createBook);
router.put("/:id", upload.single("image"), updateBook);
router.delete("/:id", deleteBook);

export default router;
