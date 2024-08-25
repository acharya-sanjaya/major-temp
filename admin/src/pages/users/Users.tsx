import useUsers, { UserType } from "../../hooks/useUsers";
import Search from "../../components/ui/Search";
import GridContainer from "../../components/ui/GridContainer";
import { cn } from "../../utils/cn";
import { Activate, Fine, Suspend } from "../../assets/Icons";
import api, { fetchWithToken } from "../../utils/api";
import { useState } from "react";
import { toast } from "react-toastify";
import Button from "../../components/ui/Button";

const Users = () => {
    const { users, loading, error, handleSearch, activeRole, setActiveRole } =
        useUsers();

    const handleFilterChange = (newFilter: "all" | "reader" | "author") => {
        setActiveRole(newFilter);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error Fetching Users Data: {error}</div>;

    return (
        <div className="py-2">
            <Search handleSearch={handleSearch} />

            <div className="flex my-4">
                <div className="flex rounded-full overflow-hidden cursor-pointer">
                    <div
                        onClick={() => handleFilterChange("all")}
                        className={cn(
                            "px-8 py-2",
                            activeRole === "all"
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-secondary-foreground"
                        )}
                    >
                        All
                    </div>
                    <div
                        onClick={() => handleFilterChange("reader")}
                        className={cn(
                            "px-8 py-2",
                            activeRole === "reader"
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-secondary-foreground"
                        )}
                    >
                        Readers
                    </div>
                    <div
                        onClick={() => handleFilterChange("author")}
                        className={cn(
                            "px-8 py-2",
                            activeRole === "author"
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-secondary-foreground"
                        )}
                    >
                        Authors
                    </div>
                </div>
            </div>

            <GridContainer>
                {users.map((user) => (
                    <UserBox key={user._id} user={user} />
                ))}
            </GridContainer>
            {users.length === 0 && (
                <div className="mx-4 py-5 text-4xl flex justify-center items-center">
                    No users found
                </div>
            )}
        </div>
    );
};

const UserBox = ({ user }: { user: UserType }) => {
    const isPro = !user.proExpiry
        ? false
        : new Date(user.proExpiry) > new Date();
    const [isActive, setIsActive] = useState(user.isActive);
    const [money, setMoney] = useState(0);
    const [showMoneyBox, setShowMoneyBox] = useState(false);

    const handleSuspend = async () => {
        try {
            await fetchWithToken(api.suspendUser(user._id), "PATCH");
            setIsActive(false);
            toast.error("User suspended!");
        } catch (error) {
            toast.error("Failed to suspend user.");
        }
    };

    const handleActivate = async () => {
        try {
            await fetchWithToken(api.removeSuspension(user._id), "PATCH");
            setIsActive(true);
            toast.success("Suspension removed!");
        } catch (error) {
            toast.error("Failed to remove suspension.");
        }
    };

    const handleAddBalance = async () => {
        setShowMoneyBox(false);
        try {
            await fetchWithToken(api.addBalance, "PATCH", {
                userId: user._id,
                amount: money,
            });
            toast.success("Balance added successfully!");
        } catch (error) {
            toast.error("Failed to add balance.");
        }
    };

    return (
        <div
            key={user._id}
            className={cn(
                "relative flex flex-col gap-2 items-center cursor-pointer border-2 border-primary/20 rounded-md hover:bg-secondary text-secondary-foreground py-4",
                !isActive && "border-red-500 bg-red-500/10 hover:bg-red-500/20"
            )}
        >
            {isPro && (
                <Button
                    variant="premium"
                    label="Premium"
                    className="absolute top-1 right-1"
                />
            )}
            <div className="mb-8">
                <img
                    src={"http://localhost:4000/" + user.profileImageUrl}
                    alt="pp_img"
                    className="size-16 object-cover rounded-full border border-primary/20"
                />
            </div>
            <div>{user.fullName}</div>
            <div>{user.email}</div>
            <div className="relative w-full mt-4 px-4 py-2 flex justify-between">
                {isActive ? (
                    <div className="group" onClick={handleSuspend}>
                        <Suspend />
                        <div className="absolute w-fit px-4 p-2 rounded-md border border-primary-20 bg-secondary text-secondary-foreground/50 top-0 -translate-y-full hidden group-hover:block">
                            Suspend
                        </div>
                    </div>
                ) : (
                    <div className="group" onClick={handleActivate}>
                        <Activate />
                        <div className="absolute w-fit px-4 p-2 rounded-md border border-primary-20 bg-secondary text-secondary-foreground/50 top-0 -translate-y-full hidden group-hover:block">
                            Activate
                        </div>
                    </div>
                )}
                {user.role === "reader" && (
                    <div className="group">
                        <div onClick={() => setShowMoneyBox((p) => !p)}>
                            <Fine />
                        </div>
                        <div className="right-4 absolute w-fit px-4 p-2 rounded-md border border-primary-20 bg-secondary text-secondary-foreground/50 top-0 -translate-y-full hidden group-hover:block">
                            Add Money
                        </div>
                        {showMoneyBox && (
                            <div className="absolute flex gap-1 z-10 h-fit flex-col w-full items-center inset-0 p-4 rounded-md border border-primary/20 bg-primary/20 backdrop-blur-lg text-secondary-foreground/50 -translate-y-full">
                                <input
                                    min={0}
                                    type="number"
                                    className="text-secondary-foreground w-full h-10 bg-secondary/70 outline-none border border-primary/20 px-2 py-1 rounded-md"
                                    value={money}
                                    onChange={(e) =>
                                        setMoney(Number(e.target.value))
                                    }
                                />
                                <div
                                    onClick={handleAddBalance}
                                    className="font-bold w-fit mt-4 text-secondary-foreground hover:text-blue-500"
                                >
                                    Add Money
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Users;
