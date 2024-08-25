import useBurrow from "../hooks/useBurrows";
import Button from "./ui/Button";
import { cn } from "../utils/cn";

const Burrows = () => {
    const { burrows, loading, error, handleReturn } = useBurrow();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="p-4 bg-background text-foreground">
            <div className="flex items-center">
                <div className="text-3xl font-bold text-center mb-4">
                    Burrows
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-background border border-foreground/50">
                    <thead>
                        <tr>
                            <th className="p-2 min-w-[150px] text-center bg-primary text-primary-foreground">
                                Cover Image
                            </th>
                            <th className="p-2 min-w-[200px] text-center bg-primary text-primary-foreground">
                                Book Title
                            </th>
                            <th className="p-2 min-w-[200px] text-center bg-primary text-primary-foreground">
                                User Name
                            </th>
                            <th className="p-2 min-w-[150px] text-center bg-primary text-primary-foreground">
                                Burrowed Date
                            </th>
                            <th className="p-2 min-w-[150px] text-center bg-primary text-primary-foreground">
                                Due Date
                            </th>
                            <th className="p-2 min-w-[150px] text-center bg-primary text-primary-foreground">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {burrows.length > 0 ? (
                            burrows.map((burrow) => {
                                const today = new Date();
                                const dueDate = new Date(burrow.dueDate);
                                const isOverdue =
                                    dueDate < today &&
                                    burrow.returnedAt === null;
                                const isReturned = burrow.returnedAt !== null;

                                // Determine the row class based on burrow status
                                const rowClass = cn(
                                    "border-t border-foreground/50 bg-secondary text-secondary-foreground",
                                    {
                                        "bg-green-500/25": isReturned, // Light green for returned
                                        "bg-red-500/25": isOverdue, // Light red for overdue
                                    }
                                );

                                return (
                                    <tr
                                        key={burrow.burrowId}
                                        className={rowClass}
                                    >
                                        <td className="p-2">
                                            <img
                                                src={burrow.coverImage}
                                                alt={burrow.bookTitle}
                                                className="w-16 h-24 object-cover"
                                            />
                                        </td>
                                        <td className="p-2">
                                            {burrow.bookTitle}
                                        </td>
                                        <td className="p-2">
                                            {burrow.userName}
                                        </td>
                                        <td className="p-2">
                                            {new Date(
                                                burrow.createdAt
                                            ).toLocaleDateString()}
                                        </td>
                                        <td className="p-2">
                                            {new Date(
                                                burrow.dueDate
                                            ).toLocaleDateString()}
                                        </td>
                                        <td className="p-2">
                                            {burrow.returnedAt === null ? (
                                                <Button
                                                    label="Return"
                                                    variant="standard"
                                                    onClick={() =>
                                                        handleReturn(
                                                            burrow.burrowId
                                                        )
                                                    }
                                                />
                                            ) : (
                                                <Button
                                                    label="Returned"
                                                    variant="muted"
                                                />
                                            )}
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={6} className="h-20 text-center">
                                    No burrows
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Burrows;
