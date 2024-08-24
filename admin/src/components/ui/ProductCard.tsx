import { useNavigate } from "react-router-dom";
import Button from "./Button";

interface BookType {
    _id: string;
    coverImageUrl: string;
    title: string;
    genre: string;
    avgRating: number;
    isPremium: boolean;
}

const ProductCard = ({ data }: { data: BookType }) => {
    const navigate = useNavigate();

    return (
        <div
            className=" relative border border-solid border-secondary-foreground rounded-lg py-4 cursor-pointer hover:shadow-primary"
            onClick={() =>
                navigate(`/book-description/${data._id}`, { state: { data } })
            }
        >
            {data.isPremium && (
                <div className="absolute top-2 right-1">
                    <Button variant="premium" label="Premium" />
                </div>
            )}
            <div className="w-[90%] m-auto flex flex-col gap-1">
                <img
                    src={"http://localhost:4000/" + data.coverImageUrl}
                    className="w-full h-48 rounded-md"
                    alt="Book Image"
                />
                <div>{data.title}</div>
                <div>{data.genre}</div>
                <div>{data.avgRating}⭐</div>
            </div>
        </div>
    );
};

export default ProductCard;
