import {useState, useRef} from "react";
import {UserType, UsersData} from "../utils/data";
import useFilter from "./useFilter";

const useUsers = () => {
  const [filteredUsers, setFilteredUsers] = useState<UserType[]>(UsersData);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const originalData = useRef<UserType[]>(UsersData);

  const handleSearch = (searchKey: string) => {
    const filteredData = useFilter(originalData.current ?? [], searchKey);
    setFilteredUsers(filteredData as UserType[]);
  };

  const handleSelectAll = (isSelected: boolean) => {
    if (isSelected) {
      const allIds = filteredUsers.map((user) => user.userId);
      setSelectedRows(allIds);
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleSuspension = (id: string) => {
    const updatedUsers = filteredUsers.map((user) =>
      user.userId === id ? {...user, status: "suspended" as const} : user
    );
    setFilteredUsers(updatedUsers);
    originalData.current = updatedUsers;
  };

  const handleRemoveSuspension = (id: string) => {
    const updatedUsers = filteredUsers.map((user) =>
      user.userId === id ? {...user, status: "active" as const} : user
    );
    setFilteredUsers(updatedUsers);
    originalData.current = updatedUsers;
  };

  const handleRemove = (id: string) => {
    const updatedUsers = filteredUsers.filter((user) => user.userId !== id);
    setFilteredUsers(updatedUsers);
    originalData.current = updatedUsers;
  };

  const handleSuspensionSelected = () => {
    const updatedUsers = filteredUsers.map((user) =>
      selectedRows.includes(user.userId) ? {...user, status: "suspended" as const} : user
    );
    setFilteredUsers(updatedUsers);
    originalData.current = updatedUsers;
    setSelectedRows([]);
  };

  const handleRemoveSuspensionSelected = () => {
    const updatedUsers = filteredUsers.map((user) =>
      selectedRows.includes(user.userId) ? {...user, status: "active" as const} : user
    );
    setFilteredUsers(updatedUsers);
    originalData.current = updatedUsers;
    setSelectedRows([]);
  };

  const handleRemoveSelected = () => {
    const updatedUsers = filteredUsers.filter((user) => !selectedRows.includes(user.userId));
    setFilteredUsers(updatedUsers);
    originalData.current = updatedUsers;
    setSelectedRows([]);
  };

  return {
    Users: filteredUsers,
    selectedRows,
    searchTerm,
    setSearchTerm,
    handleSearch,
    handleSelectAll,
    handleSelectRow,
    handleSuspension,
    handleRemoveSuspension,
    handleRemove,
    handleSuspensionSelected,
    handleRemoveSuspensionSelected,
    handleRemoveSelected,
  };
};

export default useUsers;
