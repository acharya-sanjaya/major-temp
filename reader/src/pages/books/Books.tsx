import {Add} from "@mui/icons-material";
import React, {useState} from "react";
import AddBook from "./AddBook";
import Popup from "../../components/ui/Popup";
import GridContainer from "../../components/ui/GridContainer";
import Search from "../../components/ui/Search";
import ProductCard from "../../components/ui/ProductCard";
import api from "../../utils/api";
import useFetch from "../../hooks/useFetch";
import {cn} from "../../utils/cn"; // Assuming cn is a utility for conditional class names

interface BookType {
  _id: string;
  coverImageUrl: string;
  title: string;
  genre: string;
  avgRating: number;
  isPremium: boolean;
}

const Books = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filter, setFilter] = useState<"all" | "free" | "premium">("all");
  const {fetchedData: books, loading, error} = useFetch<BookType[]>(api.getBooksBrief, []);

  const handleBookAdded = () => {
    setOpenPopup(false);
  };

  const handleSearch = (searchKey: string) => {
    setSearchKeyword(searchKey);
  };

  const handleFilterChange = (filterType: "all" | "free" | "premium") => {
    setFilter(filterType);
  };

  const filteredData = books
    ?.filter((book) => {
      if (filter === "free") return !book.isPremium;
      if (filter === "premium") return book.isPremium;
      return true;
    })
    .filter((book) => book.title.toLowerCase().includes(searchKeyword.toLowerCase()));

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error Fetching Book Data: {error}</div>;

  return (
    <div className="py-2">
      <Search handleSearch={handleSearch} />

      <div className="flex my-4">
        <div className="flex rounded-full overflow-hidden cursor-pointer">
          <div
            onClick={() => handleFilterChange("all")}
            className={cn(
              "px-8 py-2",
              filter === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            )}
          >
            All Books
          </div>
          <div
            onClick={() => handleFilterChange("free")}
            className={cn(
              "px-8 py-2",
              filter === "free"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            )}
          >
            Free
          </div>
          <div
            onClick={() => handleFilterChange("premium")}
            className={cn(
              "px-8 py-2",
              filter === "premium"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            )}
          >
            Premium
          </div>
        </div>
      </div>

      <GridContainer>
        <AddNewBook setOpenPopup={setOpenPopup} />
        {filteredData?.map((data) => (
          <ProductCard key={data._id} data={data} />
        ))}
      </GridContainer>
      {filteredData?.length === 0 && (
        <div className="mx-4 py-5 text-4xl flex justify-center items-center">No items found</div>
      )}
      {openPopup && (
        <Popup openPopup={openPopup} closeThePopup={() => setOpenPopup(false)}>
          <AddBook onBookAdded={handleBookAdded} />
        </Popup>
      )}
    </div>
  );
};

const AddNewBook = ({
  setOpenPopup,
}: {
  setOpenPopup: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <div
    className="h-full min-h-64 flex flex-col justify-center items-center cursor-pointer border border-solid border-slate-700 rounded-lg hover:shadow-light"
    onClick={() => setOpenPopup(true)}
  >
    <div className="w-16 h-16 mb-5 flex justify-center items-center rounded-full bg-slate-700">
      <Add className="text-foreground" />
    </div>
    <div className="text-2xl">Add Book</div>
  </div>
);

export default Books;
