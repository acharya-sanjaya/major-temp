import useReservations from "../hooks/useReservations";
import { cn } from "../utils/cn";
import Button from "./ui/Button";
import Search from "./ui/Search";

const Reservations = () => {
    const { reservations, handleSearch, handleApprove, handleReject } =
        useReservations();

    return (
        <div className="p-4 bg-background text-foreground">
            <div className="flex items-center">
                <div className="text-3xl font-bold text-center mb-4">
                    Reservations
                </div>
            </div>
            <div className="w-full m-4">
                <Search handleSearch={handleSearch} />
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-background border border-foreground/50">
                    <thead>
                        <tr>
                            <th className="p-2 min-w-[150px] text-center bg-primary text-primary-foreground">
                                Book Image
                            </th>
                            <th className="p-2 min-w-[150px] text-center bg-primary text-primary-foreground">
                                User Name
                            </th>
                            <th className="p-2 min-w-[150px] text-center bg-primary text-primary-foreground">
                                Book Name
                            </th>
                            <th className="p-2 min-w-[100px] text-center bg-primary text-primary-foreground">
                                Reserved Quantity
                            </th>
                            <th className="p-2 min-w-[150px] text-center bg-primary text-primary-foreground">
                                Reserved Date
                            </th>
                            <th className="p-2 min-w-[150px] text-center bg-primary text-primary-foreground">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.length > 0 ? (
                            reservations.map((reservation) => (
                                <tr
                                    key={reservation.reservationId}
                                    className={cn(
                                        "border-t border-foreground/50 bg-secondary text-secondary-foreground",
                                        reservation.status === "approved"
                                            ? "bg-successive/20"
                                            : reservation.status === "rejected"
                                            ? "bg-danger/20"
                                            : ""
                                    )}
                                >
                                    <td className="p-2">
                                        <img
                                            src={`http://localhost:4000/${reservation.coverImage}`}
                                            alt={reservation.bookTitle}
                                            className="w-16 h-16 object-cover"
                                        />
                                    </td>
                                    <td className="p-2">
                                        {reservation.userName}
                                    </td>
                                    <td className="p-2">
                                        {reservation.bookTitle}
                                    </td>
                                    <td className="p-2">
                                        {reservation.reservedQuantity}
                                    </td>
                                    <td className="p-2">
                                        {new Date(
                                            reservation.reservedDate
                                        ).toLocaleDateString()}
                                    </td>
                                    <td className="p-2">
                                        <div className="flex h-full items-center gap-3">
                                            {reservation.status ===
                                                "pending" && (
                                                <>
                                                    <Button
                                                        variant="success"
                                                        label="Approve"
                                                        onClick={() =>
                                                            handleApprove(
                                                                reservation.reservationId
                                                            )
                                                        }
                                                    />
                                                    <Button
                                                        variant="danger"
                                                        label="Reject"
                                                        onClick={() =>
                                                            handleReject(
                                                                reservation.reservationId
                                                            )
                                                        }
                                                    />
                                                </>
                                            )}
                                            {reservation.status ===
                                                "approved" && (
                                                <Button
                                                    variant="muted"
                                                    label="Approved"
                                                />
                                            )}
                                            {reservation.status ===
                                                "rejected" && (
                                                <Button
                                                    variant="muted"
                                                    label="Rejected"
                                                />
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="h-20 text-center">
                                    No reservations
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Reservations;
