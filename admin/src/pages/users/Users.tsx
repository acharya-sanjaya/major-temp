import useUsers from "../../hooks/useUsers";
import {cn} from "../../utils/cn";
import Button from "../../components/ui/Button";
import Search from "../../components/ui/Search";

const Users = () => {
  const {
    Users,
    selectedRows,
    handleSearch,
    handleSelectAll,
    handleSelectRow,
    handleSuspension,
    handleRemoveSuspension,
    handleRemove,
    handleSuspensionSelected,
    handleRemoveSuspensionSelected,
    handleRemoveSelected,
  } = useUsers();

  return (
    <div className="px-4 bg-background text-foreground">
      <div className="flex items-center">
        <div className="text-3xl font-bold text-left mb-4">Users</div>
        <div className="flex flex-1 items-center justify-end gap-4">
          {selectedRows.length > 0 && (
            <div className="flex gap-2">
              <Button
                variant="danger"
                label="Suspend Selected"
                onClick={handleSuspensionSelected}
              />
              <Button
                variant="standard"
                label="Activate Selected"
                onClick={handleRemoveSuspensionSelected}
              />
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
                {Users.length > 0 && (
                  <input
                    type="checkbox"
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    checked={selectedRows.length === Users.length}
                  />
                )}
              </th>
              <th className="p-2 min-w-[100px] text-left bg-primary text-primary-foreground">
                User Image
              </th>
              <th className="p-2 min-w-[100px] text-left bg-primary text-primary-foreground">
                Username
              </th>
              <th className="p-2 min-w-[200px] text-left bg-primary text-primary-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {Users.length > 0 ? (
              Users.map((user) => (
                <tr
                  key={user.userId}
                  className={cn(
                    "border-t border-foreground/50 bg-secondary text-secondary-foreground",
                    user.status === "suspended" ? "bg-destructive/30" : "",
                    selectedRows.includes(user.userId) ? "bg-selected/20" : ""
                  )}
                >
                  <td className="py-2 px-4">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(user.userId)}
                      onChange={() => handleSelectRow(user.userId)}
                    />
                  </td>
                  <td className="p-2">
                    <img
                      src={user.profileImageUrl}
                      alt={user.userName}
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="p-2">{user.userName}</td>
                  <td className="p-2">
                    <div className="flex h-full items-center gap-3">
                      <Button
                        variant={user.status === "suspended" ? "standard" : "danger"}
                        label={user.status === "suspended" ? "Activate" : "Suspend"}
                        onClick={() =>
                          user.status === "suspended"
                            ? handleRemoveSuspension(user.userId)
                            : handleSuspension(user.userId)
                        }
                      />
                      <Button
                        variant="danger"
                        label="Remove"
                        onClick={() => handleRemove(user.userId)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="h-20 text-center">
                  No Users
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
