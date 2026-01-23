import { useState } from "react";
import API from "../../api/api";
import { X } from "lucide-react";

export default function BookAdd({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publisher: "",
    publishedDate: "",
    description: "",
    pages: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, author, publisher, publishedDate, description, pages } = formData;
    if (!title || !author || !publisher || !publishedDate || !description || !pages) {
      setError("All fields are required.");
      return;
    }

    if (!image) {
      setError("Please upload a book image.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => data.append(key, value));
      data.append("image", image);

      const res = await API.post("/books", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onAdd(res.data);
      onClose();
    } catch (err) {
      console.error(err);
      setError("Failed to add book. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-semibold mb-6">Add New Book</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 border-l-4 border-red-500 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Left Section */}
          <div className="space-y-4">
            <Input label="Title" name="title" value={formData.title} onChange={handleChange} />
            <Input label="Author" name="author" value={formData.author} onChange={handleChange} />
            <Input label="Publisher" name="publisher" value={formData.publisher} onChange={handleChange} />
            <Input
              label="Published Year"
              name="publishedDate"
              type="number"
              value={formData.publishedDate}
              onChange={handleChange}
            />
            <Input
              label="Pages"
              name="pages"
              type="number"
              value={formData.pages}
              onChange={handleChange}
            />
          </div>

          {/* Right Section */}
          <div className="space-y-4">
            <Textarea
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />

            <div>
              <label className="text-sm font-medium text-gray-700">Book Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full mt-1"
              />
            </div>

            {/* Image Preview */}
            {preview && (
              <div className="w-full aspect-square border rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
              </div>
            )}
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition disabled:opacity-60"
            >
              {loading ? "Adding Book..." : "Add Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ---------- Reusable Components ---------- */

function Input({ label, name, type = "text", value, onChange }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
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
        className="w-full px-4 py-2 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
      />
    </div>
  );
}
