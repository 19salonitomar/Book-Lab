import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    publisher: { type: String, required: true },
    publishedDate: { type: String, required: true },
    pages: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String }, 
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);
export default Book;
