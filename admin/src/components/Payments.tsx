import useFetch from "../hooks/useFetch";
import api from "../utils/api";

export interface Payment {
    _id: string;
    userId: { _id: string; fullName: string };
    amount: number;
    paymentMethod:
        | "credit_card"
        | "debit_card"
        | "khalti"
        | "esewa"
        | "bank_transfer"
        | "wallet";
    status: "pending" | "completed" | "failed";
    paymentDate: Date;
    description?: string;
}

const Payments = () => {
    const {
        fetchedData: payments,
        loading,
        error,
    } = useFetch<Payment[]>(api.getAllPayments, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="p-4 bg-background text-foreground">
            <div className="flex items-center">
                <div className="text-3xl font-bold text-center mb-4">
                    Payments
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-background border border-foreground/50">
                    <thead>
                        <tr>
                            <th className="p-2 min-w-[150px] text-center bg-primary text-primary-foreground">
                                User ID
                            </th>
                            <th className="p-2 min-w-[150px] text-center bg-primary text-primary-foreground">
                                Amount
                            </th>
                            <th className="p-2 min-w-[200px] text-center bg-primary text-primary-foreground">
                                Payment Method
                            </th>
                            <th className="p-2 min-w-[200px] text-center bg-primary text-primary-foreground">
                                Status
                            </th>
                            <th className="p-2 min-w-[200px] text-center bg-primary text-primary-foreground">
                                Description
                            </th>
                            <th className="p-2 min-w-[200px] text-center bg-primary text-primary-foreground">
                                Payment Date
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.length > 0 ? (
                            payments.map((payment) => (
                                <tr
                                    key={payment._id}
                                    className="border-t border-foreground/50 bg-secondary text-secondary-foreground"
                                >
                                    <td className="p-2">
                                        {payment.userId._id}
                                    </td>
                                    <td className="p-2">{payment.amount}</td>
                                    <td className="p-2">
                                        {payment.paymentMethod}
                                    </td>
                                    <td className="p-2">{payment.status}</td>
                                    <td className="p-2">
                                        {payment.description}
                                    </td>
                                    <td className="p-2">
                                        {new Date(
                                            payment.paymentDate
                                        ).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="h-20 text-center">
                                    No payments
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Payments;
