import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Eye, Edit, Trash } from "lucide-react";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulated API call (replace with real backend later)
  useEffect(() => {
    setTimeout(() => {
      setBooks([
        {
          id: 1,
          title: "Atomic Habits",
          author: "James Clear",
          publisher: "Penguin",
          publishedDate: "2018",
        },
        {
          id: 2,
          title: "The Alchemist",
          author: "Paulo Coelho",
          publisher: "HarperOne",
          publishedDate: "1988",
        },
        {
          id: 3,
          title: "Deep Work",
          author: "Cal Newport",
          publisher: "Grand Central",
          publishedDate: "2016",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">📚 Book Lab</h1>

        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
          <Plus size={18} />
          Add Book
        </button>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-lg shadow-md">
        {loading ? (
          <div className="text-center py-10 text-lg">Loading books...</div>
        ) : (
          <table className="min-w-full bg-white dark:bg-gray-800">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Author</th>
                <th className="px-4 py-3 text-left">Publisher</th>
                <th className="px-4 py-3 text-left">Year</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {books.map((book) => (
                <tr
                  key={book.id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <td className="px-4 py-3">{book.title}</td>
                  <td className="px-4 py-3">{book.author}</td>
                  <td className="px-4 py-3">{book.publisher}</td>
                  <td className="px-4 py-3">{book.publishedDate}</td>

                  <td className="px-4 py-3 flex justify-center gap-3">
                    <Link
                      to={`/books/${book.id}`}
                      className="text-blue-600 hover:text-blue-800"
                      title="View"
                    >
                      <Eye size={18} />
                    </Link>

                    <button
                      className="text-green-600 hover:text-green-800"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </button>

                    <button
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
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

      {/* Scroll hint */}
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
        Scroll horizontally on small screens →
      </p>
    </div>
  );
};

export default Home;
