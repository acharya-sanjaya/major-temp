import {useState} from "react";
import {Star} from "../assets/Icons";
import useFetch from "../hooks/useFetch";
import api from "../utils/api";
import {cn} from "../utils/cn";
import useAuth from "../hooks/useAuth";
import {toast} from "react-toastify";
import usePreference from "../hooks/usePreference";

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
  const {authToken} = useAuth();
  const [selectedStar, setSelectedStar] = useState<number>(0);
  const [newStar, setNewStar] = useState<number>(0);
  const [newReview, setNewReview] = useState<string>("");

  const {fetchedData: reviews, loading, error} = useFetch<ReviewType[]>(api.getRatings(bookId), []);
  const {addPreference} = usePreference();

  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div>Error loading reviews: {error}</div>;

  // Filter reviews based on the selected star rating
  const filteredReviews = selectedStar
    ? reviews.filter((review) => review.star === selectedStar)
    : reviews;

  // Function to handle adding a new rating
  const handleAddRating = async () => {
    try {
      const response = await fetch(api.giveRating(bookId), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({star: newStar, review: newReview}),
      });

      const result = await response.json();

      if (response.ok) {
        setNewStar(0);
        setNewReview("");
        toast.success("Rating submitted successfully!");

        // Add to user preference after successful rating
        addPreference(result.genre, result.authorId, 1); // Assuming the response contains genre and authorId
      } else {
        toast.error("Failed to submit rating!");
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
      toast.error("Failed to submit rating!");
    }
  };

  return (
    <div className="p-4">
      <div className="text-3xl mb-4">Add Your Rating</div>

      {/* Add Rating Form */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="text-lg">Your Rating:</div>
          {[1, 2, 3, 4, 5].map((star) => (
            <div onClick={() => setNewStar(star)} key={star}>
              <Star
                className={cn(
                  "cursor-pointer",
                  newStar && newStar >= star ? "text-yellow-400" : "text-gray-400"
                )}
              />
            </div>
          ))}
        </div>
        <textarea
          className="w-full p-2 border rounded-md outline-none border-primary bg-secondary"
          placeholder="Write your review..."
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
        />
        <button
          className="self-end px-4 py-2 bg-primary text-primary-foreground rounded-md"
          onClick={handleAddRating}
        >
          Submit Review
        </button>
      </div>

      <div className="text-3xl mb-4">Reviews</div>

      {/* Star Filter */}
      <div className="flex rounded-full overflow-hidden max-w-fit mb-4">
        <FilterButton
          label="All"
          isSelected={selectedStar === 0}
          onClick={() => setSelectedStar(0)}
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
