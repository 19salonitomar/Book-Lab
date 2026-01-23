import { useState } from "react";
import API from "../../api/api";
import { X, ImageIcon } from "lucide-react";

const BACKEND_URL = "http://localhost:5000";

export default function BookEdit({ book, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    title: book.title || "",
    author: book.author || "",
    publisher: book.publisher || "",
    publishedDate: book.publishedDate || "",
    description: book.description || "",
    pages: book.pages || "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, author, publisher, publishedDate, description, pages } = formData;
    if (!title || !author || !publisher || !publishedDate || !description || !pages) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([k, v]) => data.append(k, v));
      if (image) data.append("image", image);

      const res = await API.put(`/books/${book._id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onUpdate(res.data);
      onClose();
    } catch (err) {
      console.error(err);
      setError("Failed to update book.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-[720px] relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-bold mb-6">Edit Book</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 border-l-4 border-red-500 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-6">
          {/* IMAGE COLUMN */}
          <div className="col-span-1 flex flex-col items-center">
            <div className="w-48 h-48 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center mb-3">
              <img
                src={
                  preview
                    ? preview
                    : book.image
                    ? `${BACKEND_URL}${book.image}`
                    : "https://via.placeholder.com/200"
                }
                alt="Book"
                className="w-full h-full object-contain"
              />
            </div>

            <label className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-xl cursor-pointer hover:bg-gray-300 transition">
              <ImageIcon size={18} />
              Change Image
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </label>
          </div>

          {/* FORM COLUMN */}
          <div className="col-span-2 space-y-3">
            <Input label="Title" name="title" value={formData.title} onChange={handleChange} />
            <Input label="Author" name="author" value={formData.author} onChange={handleChange} />
            <Input label="Publisher" name="publisher" value={formData.publisher} onChange={handleChange} />

            <div className="grid grid-cols-2 gap-3">
              <Input label="Published Year" name="publishedDate" type="number" value={formData.publishedDate} onChange={handleChange} />
              <Input label="Pages" name="pages" type="number" value={formData.pages} onChange={handleChange} />
            </div>

            <Textarea label="Description" name="description" value={formData.description} onChange={handleChange} />

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-3 bg-gradient-to-r from-green-600 to-lime-600 text-white font-semibold rounded-xl hover:shadow-lg transition disabled:opacity-60"
            >
              {loading ? "Updating..." : "Update Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ---------- Inputs ---------- */

function Input({ label, name, type = "text", value, onChange }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
      />
    </div>
  );
}

function Textarea({ label, name, value, onChange }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={4}
        className="w-full px-4 py-2 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
      />
    </div>
  );
}
