import { useEffect, useState } from "react";
import API from "../api/api";
import { Plus, Eye, Edit, Trash, X } from "lucide-react";

// Import modals
import BookAdd from "../components/book/BookAdd";
import BookEdit from "../components/book/BookEdit";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null); // For preview modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [editBook, setEditBook] = useState(null);

  // Fetch all books from backend
  const fetchBooks = async () => {
    try {
      const res = await API.get("/books");
      setBooks(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Delete book
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this book?")) return;
    try {
      await API.delete(`/books/${id}`);
      setBooks(books.filter((b) => b._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload(); // redirect to login
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          📚 Book Lab
        </h1>

        <div className="flex gap-3">
          <button
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl hover:shadow-lg transition"
            onClick={() => setShowAddModal(true)}
          >
            <Plus size={18} />
            Add Book
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-xl hover:shadow-lg transition"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow-md bg-white p-4">
        {loading ? (
          <div className="text-center py-10 text-lg">Loading books...</div>
        ) : (
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Author</th>
                <th className="px-4 py-3 text-left">Publisher</th>
                <th className="px-4 py-3 text-left">Year</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {books.map((book) => (
                <tr key={book._id} className="hover:bg-gray-100 transition">
                  <td className="px-4 py-3">{book.title}</td>
                  <td className="px-4 py-3">{book.author}</td>
                  <td className="px-4 py-3">{book.publisher}</td>
                  <td className="px-4 py-3">{book.publishedDate}</td>

                  <td className="px-4 py-3 flex justify-center gap-3">
                    {/* Preview */}
                    <button
                      title="View"
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => setSelectedBook(book)}
                    >
                      <Eye size={18} />
                    </button>

                    {/* Edit */}
                    <button
                      title="Edit"
                      className="text-green-600 hover:text-green-800"
                      onClick={() => setEditBook(book)}
                    >
                      <Edit size={18} />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(book._id)}
                      title="Delete"
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Preview Modal */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-96 relative">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
              onClick={() => setSelectedBook(null)}
            >
              <X size={20} />
            </button>
            
            <div className="w-full flex justify-center mb-4">
              <div className="w-48 h-48 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                <img
                  src={
                    selectedBook.image
                      ? `http://localhost:5000${selectedBook.image}`
                      : "https://via.placeholder.com/150"
                  }
                  alt={selectedBook.title}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>


            <h2 className="text-xl font-bold mb-2">{selectedBook.title}</h2>
            <p><strong>Author:</strong> {selectedBook.author}</p>
            <p><strong>Publisher:</strong> {selectedBook.publisher}</p>
            <p><strong>Year:</strong> {selectedBook.publishedDate}</p>
            <p><strong>Pages:</strong> {selectedBook.pages || "-"}</p>
            <p className="mt-2 text-gray-600">{selectedBook.description || "No description available."}</p>
          </div>
        </div>
      )}

      {/* Add Book Modal */}
      {showAddModal && (
        <BookAdd
          onClose={() => setShowAddModal(false)}
          onAdd={(newBook) => setBooks([newBook, ...books])}
        />
      )}

      {/* Edit Book Modal */}
      {editBook && (
        <BookEdit
          book={editBook}
          onClose={() => setEditBook(null)}
          onUpdate={(updatedBook) =>
            setBooks(books.map((b) => (b._id === updatedBook._id ? updatedBook : b)))
          }
        />
      )}
    </div>
  );
};

export default Home;