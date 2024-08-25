import { useState, useEffect, useCallback } from "react";
import api, { fetchWithToken } from "../utils/api";

// Define types for reservations
interface Reservation {
    reservationId: string;
    userId: string;
    userName: string;
    bookId: string;
    bookTitle: string;
    coverImage: string;
    reservedQuantity: number;
    status: "pending" | "approved" | "rejected";
    reservedDate: string;
    dueDate: string;
}

const useReservations = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [searchText, setSearchText] = useState<string>("");

    // Fetch reservations from the API
    const fetchReservations = useCallback(async () => {
        try {
            const data = await fetchWithToken(api.getAllReservations, "GET");
            setReservations(data || []); // Fallback to an empty array if undefined
        } catch (error) {
            console.error("Error fetching reservations:", error);
        }
    }, []);

    useEffect(() => {
        fetchReservations();
    }, [fetchReservations]);

    // Search handler
    const handleSearch = (text: string) => {
        setSearchText(text.toLowerCase());
    };

    // Filter reservations based on search text
    const filteredReservations =
        reservations?.filter((reservation) =>
            [
                reservation.userName,
                reservation.bookTitle,
                reservation.reservationId,
                reservation.status,
            ].some((field) => field.toLowerCase().includes(searchText))
        ) || []; // Fallback to an empty array if undefined

    // Approve a reservation
    const handleApprove = async (reservationId: string) => {
        try {
            await fetchWithToken(
                api.updateReservationStatus(reservationId),
                "PATCH",
                { status: "approved" }
            );
            setReservations((prevReservations) =>
                prevReservations.map((reservation) =>
                    reservation.reservationId === reservationId
                        ? { ...reservation, status: "approved" }
                        : reservation
                )
            );
        } catch (error) {
            console.error("Error approving reservation:", error);
        }
    };

    // Reject a reservation
    const handleReject = async (reservationId: string) => {
        try {
            await fetchWithToken(
                api.updateReservationStatus(reservationId),
                "PATCH",
                { status: "rejected" }
            );
            setReservations((prevReservations) =>
                prevReservations.map((reservation) =>
                    reservation.reservationId === reservationId
                        ? { ...reservation, status: "rejected" }
                        : reservation
                )
            );
        } catch (error) {
            console.error("Error rejecting reservation:", error);
        }
    };

    // Approve selected reservations
    const handleApproveSelected = async (selectedIds: string[]) => {
        try {
            await Promise.all(
                selectedIds.map((id) =>
                    fetchWithToken(api.updateReservationStatus(id), "PATCH", {
                        status: "approved",
                    })
                )
            );
            setReservations((prevReservations) =>
                prevReservations.map((reservation) =>
                    selectedIds.includes(reservation.reservationId)
                        ? { ...reservation, status: "approved" }
                        : reservation
                )
            );
        } catch (error) {
            console.error("Error approving selected reservations:", error);
        }
    };

    // Reject selected reservations
    const handleRejectSelected = async (selectedIds: string[]) => {
        try {
            await Promise.all(
                selectedIds.map((id) =>
                    fetchWithToken(api.updateReservationStatus(id), "PATCH", {
                        status: "rejected",
                    })
                )
            );
            setReservations((prevReservations) =>
                prevReservations.map((reservation) =>
                    selectedIds.includes(reservation.reservationId)
                        ? { ...reservation, status: "rejected" }
                        : reservation
                )
            );
        } catch (error) {
            console.error("Error rejecting selected reservations:", error);
        }
    };

    return {
        reservations: filteredReservations,
        handleSearch,
        handleApprove,
        handleReject,
        handleApproveSelected,
        handleRejectSelected,
    };
};

export default useReservations;
