import {useState} from "react";
import {Star} from "../assets/Icons";
import useFetch from "../hooks/useFetch";
import api from "../utils/api";
import {cn} from "../utils/cn"; // Assuming cn is a utility for conditional class names

interface UserType {
  _id: string;
  fullName: string;
}

interface ReviewType {
  _id: string;
  userId: UserType;
  bookId: string;
  star: number;
  review: string | null;
  createdAt: string;
  updatedAt: string;
}

const Ratings = ({bookId}: {bookId: string}) => {
  const [selectedStar, setSelectedStar] = useState<number | null>(null);

  const {fetchedData: reviews, loading, error} = useFetch<ReviewType[]>(api.getRatings(bookId), []);

  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div>Error loading reviews: {error}</div>;

  // Filter reviews based on the selected star rating
  const filteredReviews = selectedStar
    ? reviews.filter((review) => review.star === selectedStar)
    : reviews;

  return (
    <div className="p-4">
      <div className="text-3xl mb-4">Reviews</div>

      {/* Star Filter */}
      <div className="flex rounded-full overflow-hidden max-w-fit">
        <FilterButton
          label="All"
          isSelected={selectedStar === null}
          onClick={() => setSelectedStar(null)}
        />
        {[1, 2, 3, 4, 5].map((star) => (
          <FilterButton
            key={star}
            label={`${star}`}
            isSelected={selectedStar === star}
            onClick={() => setSelectedStar(star)}
          >
            <Star className="text-yellow-400 size-5 ml-1" />
          </FilterButton>
        ))}
      </div>

      <div className="flex flex-col gap-4 my-4">
        {filteredReviews && filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <div
              key={review._id}
              className="flex flex-col border px-4 py-2 rounded gap-4 justify-center shadow-sm"
            >
              <div className="flex justify-between items-center gap-10">
                <div className="font-bold text-lg">{review.userId.fullName}</div>
                <div className="flex gap-1 items-center">
                  {review.star}
                  <Star className="text-yellow-400 size-5" />
                </div>
              </div>
              {review.review && <div className="text-secondary-foreground/70">{review.review}</div>}
            </div>
          ))
        ) : (
          <div>No reviews found.</div>
        )}
      </div>
    </div>
  );
};

const FilterButton = ({
  label,
  isSelected,
  onClick,
  children,
}: {
  label: string;
  isSelected: boolean;
  onClick: () => void;
  children?: React.ReactNode;
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        isSelected
          ? "bg-primary text-primary-foreground"
          : "bg-secondary text-secondary-foreground hover:bg-primary/20",
        "flex items-center px-5 py-2 cursor-pointer transition-all duration-300"
      )}
    >
      {label}
      {children}
    </div>
  );
};

export default Ratings;
