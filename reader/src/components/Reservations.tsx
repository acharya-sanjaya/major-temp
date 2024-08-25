import useReservations from "../hooks/useReservations";
import {cn} from "../utils/cn";
import Button from "./ui/Button";
import Search from "./ui/Search";

const Reservations = () => {
  const {
    reservations,
    selectedRows,
    handleSearch,
    handleSelectAll,
    handleSelectRow,
    handleApprove,
    handleRemove,
    handleApproveSelected,
    handleRemoveSelected,
  } = useReservations();

  return (
    <div className="p-4 bg-background text-foreground">
      <div className="flex items-center">
        <div className="text-3xl font-bold text-left mb-4">Reservations</div>
        <div className="flex flex-1 items-center justify-end gap-4">
          {selectedRows.length > 0 && (
            <div className="flex gap-2">
              <Button variant="success" label="Approve Selected" onClick={handleApproveSelected} />
              <Button variant="danger" label="Delete Selected" onClick={handleRemoveSelected} />
            </div>
          )}
        </div>
      </div>
      <div className="w-full m-4">
        <Search handleSearch={handleSearch} />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-background border border-foreground/50">
          <thead>
            <tr>
              <th className="py-2 px-4 w-[50px] text-left bg-primary text-primary-foreground">
                {reservations.length > 0 && (
                  <input
                    type="checkbox"
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    checked={selectedRows.length === reservations.length}
                  />
                )}
              </th>
              <th className="p-2 min-w-[100px] text-left bg-primary text-primary-foreground">
                Book Image
              </th>
              <th className="p-2 min-w-[100px] text-left bg-primary text-primary-foreground">
                User Name
              </th>
              <th className="p-2 min-w-[200px] text-left bg-primary text-primary-foreground">
                Book Name
              </th>
              <th className="p-2 min-w-[200px] text-left bg-primary text-primary-foreground">
                Reservation Date
              </th>
              <th className="p-2 min-w-[200px] text-left bg-primary text-primary-foreground">
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
                    reservation.approved ? "bg-successive/20" : "",
                    selectedRows.includes(reservation.reservationId) ? "bg-selected/20" : ""
                  )}
                >
                  <td className="py-2 px-4">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(reservation.reservationId)}
                      onChange={() => handleSelectRow(reservation.reservationId)}
                    />
                  </td>
                  <td className="p-2">
                    <img
                      src={reservation.bookImageUrl}
                      alt={reservation.bookName}
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="p-2">{reservation.userName}</td>
                  <td className="p-2">{reservation.bookName}</td>
                  <td className="p-2">{reservation.reservationDate.toLocaleDateString()}</td>
                  <td className="p-2">
                    <div className="flex h-full items-center gap-3">
                      <Button
                        variant={reservation.approved ? "muted" : "success"}
                        label={reservation.approved ? "Approved" : "Approve"}
                        onClick={() => handleApprove(reservation.reservationId)}
                      />
                      <Button
                        variant="danger"
                        label="Remove"
                        onClick={() => handleRemove(reservation.reservationId)}
                      />
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
