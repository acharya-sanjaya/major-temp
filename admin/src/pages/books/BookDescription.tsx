import {useState} from "react";
import {useParams} from "react-router-dom";
import Button from "../../components/ui/Button";
import {toast} from "react-toastify";
import RenderPdf from "../../components/ui/RenderPdf";
import useFetch from "../../hooks/useFetch";
import api from "../../utils/api";
import Ratings from "../../components/Ratings";

interface BookType {
  _id: string;
  coverImageUrl: string;
  pdfUrl: string;
  title: string;
  genre: string;
  avgRating: number;
  stock: number;
  isPremium: boolean;
  description: string;
}

const BookDescription = () => {
  const {id: bookId} = useParams<{id: string}>();

  const {
    fetchedData: bookDetails,
    loading,
    error,
  } = useFetch<BookType | null>(api.getBookDetails(bookId || ""), null);

  const [readOnline, setReadOnline] = useState(false);

  // If data is loading or an error occurred, handle it appropriately
  if (loading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        {error}
        <br />
        Couldn't load book details!
      </div>
    );

  if (!bookDetails) return <div>Book not found</div>;

  return (
    <div>
      <div className="flex flex-col md:flex-row p-4 items-center gap-4">
        <img
          src={`http://localhost:4000/${bookDetails.coverImageUrl}`}
          alt="Book Cover"
          className="w-60 h-60"
        />
        <div className="theme-dark flex flex-col gap-2">
          <div>Title: {bookDetails.title}</div>
          <div>Genre: {bookDetails.genre}</div>
          <div>Rating: {bookDetails.avgRating}</div>
          <div className="mt-4">{bookDetails.description}</div>
          <div className="flex gap-4">
            <Button
              onClick={() => setReadOnline((p) => !p)}
              label={readOnline ? "Close PDF" : "Read Online"}
              variant={readOnline ? "danger" : bookDetails.isPremium ? "premium" : "standard"}
            />
            <Button
              onClick={() => {
                toast.success("Reservation Made for #" + bookDetails._id);
              }}
              label="Borrow Hardcopy"
              variant={
                bookDetails.stock > 1 ? (bookDetails.isPremium ? "premium" : "standard") : "muted"
              }
            />
          </div>
        </div>
      </div>
      {readOnline ? (
        <div className="mb-20">
          <div className="text-2xl my-4 mt-8">BOOK PDF</div>
          <RenderPdf pdfUrl={bookDetails.pdfUrl} coverImageUrl={bookDetails.coverImageUrl} />
        </div>
      ) : (
        <div className="p-4">
          <Ratings bookId={bookDetails._id} />
        </div>
      )}
    </div>
  );
};

export default BookDescription;
