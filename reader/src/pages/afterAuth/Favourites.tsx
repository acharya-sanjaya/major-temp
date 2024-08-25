import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import api from "../../utils/api"; // Adjust the import path as needed
import Button from "../../components/ui/Button";

// Define the Book type
interface BookType {
  _id: string;
  coverImageUrl: string;
  title: string;
}

const Favourites = () => {
  const [favorites, setFavorites] = useState<BookType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  if (error) {
    error;
  }

  // Fetch favorite books on component mount
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch(api.getFavourites, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure you handle tokens properly
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch favorites");
        }

        const data = await response.json();
        setFavorites(data);
      } catch (error) {
        setError("Failed to load favorites");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  // Function to handle removing a book from favorites
  const handleRemoveFavorite = async (bookId: string) => {
    try {
      const response = await fetch(api.removeFromFavourite(bookId), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure you handle tokens properly
        },
      });

      if (!response.ok) {
        throw new Error("Failed to remove favorite");
      }

      // Update the state to remove the book from the list
      setFavorites(favorites.filter((book) => book._id !== bookId));
      toast.success("Book removed from favorites");
    } catch (error) {
      toast.error("Failed to remove book from favorites");
    }
  };

  // Render component
  return (
    <div>
      <h1>Favorites</h1>
      {loading && <div>Loading...</div>}
      {favorites.length === 0 && !loading && <div>No favorites found</div>}
      <ul>
        {favorites.map((book) => (
          <li key={book._id} className="flex items-center gap-4 p-2 border-b">
            <img
              src={`http://localhost:4000/${book.coverImageUrl}`} // Adjust URL as needed
              alt={book.title}
              className="w-16 h-16"
            />
            <div className="flex-1">{book.title}</div>
            <Button
              label="Remove"
              variant="danger"
              onClick={() => handleRemoveFavorite(book._id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favourites;
