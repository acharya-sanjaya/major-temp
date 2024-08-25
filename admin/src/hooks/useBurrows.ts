import { useState, useEffect, useCallback } from "react";

// Define TypeScript types for the burrow data
interface Burrow {
    burrowId: string;
    userId: string;
    userName: string;
    bookId: string;
    bookTitle: string;
    coverImage: string;
    dueDate: string;
    returnedAt: string | null;
    createdAt: string;
    updatedAt: string;
}

const useBurrows = () => {
    const [burrows, setBurrows] = useState<Burrow[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch burrows data
    const fetchBurrows = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(
                "http://localhost:4000/api/burrow/get-all-burrows"
            );
            if (!response.ok) {
                throw new Error("Failed to fetch burrows");
            }
            const data: Burrow[] = await response.json();
            setBurrows(data);
        } catch (err: { message: string } | unknown) {
            setError(
                (err as { message: string })?.message || "An error occurred"
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBurrows();
    }, [fetchBurrows]);

    // Handle return book action
    const handleReturn = async (burrowId: string) => {
        try {
            const response = await fetch(
                `http://localhost:4000/api/burrow/return-book/${burrowId}`,
                {
                    method: "POST",
                }
            );
            if (!response.ok) {
                throw new Error("Failed to return book");
            }
            // Refresh burrows data after returning the book
            fetchBurrows();
        } catch (err: { message: string } | unknown) {
            setError(
                (err as { message: string })?.message || "An error occurred"
            );
        }
    };

    return {
        burrows,
        loading,
        error,
        handleReturn,
    };
};

export default useBurrows;
