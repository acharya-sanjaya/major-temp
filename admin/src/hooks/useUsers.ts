import { useState, useEffect } from "react";
import useFetch from "./useFetch";
import api from "../utils/api";

export type UserType = {
    _id: string;
    email: string;
    fullName: string;
    profileImageUrl: string;
    role: "reader" | "author" | "admin";
    proExpiry: Date | null;
    isActive: boolean;
    balance: number;
};

const useUsers = () => {
    const {
        fetchedData: users,
        loading,
        error,
    } = useFetch<UserType[]>(api.getAllUsers, []);
    const [filteredUsers, setFilteredUsers] = useState<UserType[]>(users);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [activeRole, setActiveRole] = useState<"all" | "reader" | "author">(
        "all"
    );

    useEffect(() => {
        if (users.length > 0) {
            applyFilters();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeRole, searchTerm, users]);

    const applyFilters = () => {
        let filteredData = users;

        if (activeRole !== "all") {
            filteredData = filteredData.filter(
                (user) => user.role.toLowerCase() === activeRole
            );
        }

        if (searchTerm) {
            filteredData = filteredData.filter(
                (user) =>
                    user._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user.fullName
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    user.email
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    user.isActive.toString().includes(searchTerm.toLowerCase())
            );
        }
        setFilteredUsers(filteredData);
    };

    const handleSearch = (searchKey: string) => {
        setSearchTerm(searchKey);
    };

    return {
        users: filteredUsers,
        activeRole,
        loading,
        error,
        handleSearch,
        setActiveRole,
    };
};

export default useUsers;
