import {useState, useRef} from "react";
import {ReservationType, ReservationsData} from "../utils/data";
import useFilter from "./useFilter";

const useReservations = () => {
  const [filteredReservations, setFilteredReservations] =
    useState<ReservationType[]>(ReservationsData);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const originalData = useRef<ReservationType[]>(ReservationsData);

  const handleSearch = (searchKey: string) => {
    const filteredData = useFilter(originalData.current ?? [], searchKey);
    setFilteredReservations(filteredData as ReservationType[]);
  };

  const handleSelectAll = (isSelected: boolean) => {
    if (isSelected) {
      const allIds = filteredReservations.map((reservation) => reservation.reservationId);
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

  const handleApprove = (id: string) => {
    const updatedReservations = filteredReservations.map((reservation) =>
      reservation.reservationId === id ? {...reservation, approved: true} : reservation
    );
    setFilteredReservations(updatedReservations);
    originalData.current = updatedReservations;
  };

  const handleRemove = (id: string) => {
    const updatedReservations = filteredReservations.filter(
      (reservation) => reservation.reservationId !== id
    );
    setFilteredReservations(updatedReservations);
    originalData.current = updatedReservations;
  };

  const handleApproveSelected = () => {
    const updatedReservations = filteredReservations.map((reservation) =>
      selectedRows.includes(reservation.reservationId)
        ? {...reservation, approved: true}
        : reservation
    );
    setFilteredReservations(updatedReservations);
    originalData.current = updatedReservations;
    setSelectedRows([]);
  };

  const handleRemoveSelected = () => {
    const updatedReservations = filteredReservations.filter(
      (reservation) => !selectedRows.includes(reservation.reservationId)
    );
    setFilteredReservations(updatedReservations);
    originalData.current = updatedReservations;
    setSelectedRows([]);
  };

  return {
    reservations: filteredReservations,
    selectedRows,
    searchTerm,
    setSearchTerm,
    handleSearch,
    handleSelectAll,
    handleSelectRow,
    handleApprove,
    handleRemove,
    handleApproveSelected,
    handleRemoveSelected,
  };
};

export default useReservations;
