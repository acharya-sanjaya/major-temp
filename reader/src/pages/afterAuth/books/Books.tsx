import {useEffect, useState} from "react";
import GridContainer from "../../../components/ui/GridContainer";
import {Search as SearchIcon} from "../../../assets/Icons";
import ProductCard from "../../../components/ui/ProductCard";
import api, {fetchWithToken} from "../../../utils/api";
import useFetch from "../../../hooks/useFetch";
import usePreference from "../../../hooks/usePreference";

interface BookType {
  _id: string;
  coverImageUrl: string;
  title: string;
  genre: string;
  avgRating: number;
  isPremium: boolean;
  description: string;
}

const Books = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const {fetchedData: books, loading, error} = useFetch<BookType[]>(api.getBooksBrief, []);

  const filteredBooks = books?.filter(
    (book) =>
      book.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      book.description.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      book._id.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error Fetching Book Data: {error}</div>;

  return (
    <div className="p-4 mt-16">
      <SearchBar searchKey={searchKeyword} handleChange={setSearchKeyword} />

      <RecommendedBooks />

      <GridContainer>
        {filteredBooks?.map((data) => (
          <ProductCard key={data._id} data={data} />
        ))}
      </GridContainer>
      {filteredBooks?.length === 0 && (
        <div className="mx-4 py-5 text-4xl flex justify-center items-center">No items found</div>
      )}
    </div>
  );
};

export default Books;

const RecommendedBooks = () => {
  const {preference} = usePreference();
  const [books, setBooks] = useState<BookType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const fetchedBooks = await fetchWithToken(api.getRecommendedBooks, "POST", preference);
        setBooks(fetchedBooks);
      } catch (err) {
        setError(err.message || "Error fetching recommended books");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [preference]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error Fetching Recommended Books: {error}</div>;

  return (
    <GridContainer>
      {books.map((data) => (
        <ProductCard key={data._id} data={data} />
      ))}
    </GridContainer>
  );
};

const SearchBar = ({
  searchKey,
  handleChange,
}: {
  searchKey: string;
  handleChange: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="w-full px-4">
      <div className="relative max-w-[500px] flex items-center m-auto">
        <input
          className="w-full px-6 py-2 pr-12 bg-secondary text-secondary-foreground focus:outline-none border-2 border-secondary-foreground transition-colors duration-500 rounded-full focus:border-blue-500"
          value={searchKey}
          onChange={(e) => handleChange(e.target.value)}
          type="text"
          placeholder="Search..."
        />
        <div className="absolute right-4 bg-transparent">
          <SearchIcon />
        </div>
      </div>
    </div>
  );
};
