import { useState, useEffect } from "react";
import { api } from "../../services/interceptors";

const UserListTable = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const res = await api.get("/auth/users");
      setUsers(res.data.data);
    } catch (err) {
      console.error("[fetchUsers] Error:", err);
      setError("Failed to load users");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (id, newRole) => {};

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="max-w-full mx-auto p-4 text-muted-text">
        Loading users...
      </div>
    );
  }

  if (error) {
    return <div className="max-w-full mx-auto p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-full mx-auto">
      <div className="relative flex flex-col w-full text-body-text bg-primary">
        <div className="relative mx-4 mt-4 overflow-hidden text-body-text bg-primary">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-body-text">
                Users :{users.length}
              </h3>
            </div>
          </div>
        </div>
        <div className="p-0 overflow-scroll">
          <table className="w-full mt-4 text-left table-auto min-w-max">
            <thead>
              <tr>
                <th className="p-4 cursor-pointer border-y border-border bg-secondary hover:bg-secondary/50">
                  <p className="flex items-center justify-between gap-2 text-sm text-muted-text">
                    User
                  </p>
                </th>
                <th className="p-4 cursor-pointer border-y border-border bg-secondary hover:bg-secondary/50">
                  <p className="flex items-center justify-between gap-2 text-sm text-muted-text">
                    Role
                  </p>
                </th>
                <th className="p-4 cursor-pointer border-y border-border bg-secondary hover:bg-secondary/50">
                  <p className="flex items-center justify-between gap-2 text-sm text-muted-text">
                    Status
                  </p>
                </th>
                <th className="p-4 cursor-pointer border-y border-border bg-secondary hover:bg-secondary/50">
                  <p className="flex items-center justify-between gap-2 text-sm text-muted-text">
                    Joined Date
                  </p>
                </th>
                <th className="p-4 cursor-pointer border-y border-border bg-secondary hover:bg-secondary/50">
                  <p className="flex items-center justify-between gap-2 text-sm text-muted-text"></p>
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="p-4 border-b border-border">
                    <div className="flex flex-col">
                      <p className="text-sm font-semibold text-body-text">
                        {user.username}
                      </p>
                      <p className="text-sm text-muted-text">{user.email}</p>
                    </div>
                  </td>
                  <td className="p-4 border-b border-border">
                    <p className="text-sm font-semibold text-body-text capitalize">
                      {user.role.replace("_", " ")}
                    </p>
                  </td>
                  <td className="p-4 border-b border-border">
                    <div className="w-max">
                      <div
                        className={`relative grid items-center px-2 py-1 text-xs font-bold uppercase rounded-md ${
                          user.isDeleted
                            ? "text-red-900 bg-red-500/20"
                            : "text-green-900 bg-green-500/20"
                        }`}
                      >
                        <span>{user.isDeleted ? "deleted" : "active"}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-b border-border">
                    <p className="text-sm text-muted-text">
                      {formatDate(user.createdAt)}
                    </p>
                  </td>
                  <td className="p-4 border-b border-border">
                    {user.role === "super_admin" ? (
                      <span className="text-xs text-muted-text">—</span>
                    ) : user.role === "admin" ? (
                      <button
                        onClick={() => handleRoleChange(user._id, "user")}
                        disabled={updatingId === user._id}
                        className="btn-secondary btn-sm"
                      >
                        {updatingId === user._id ? "..." : "Remove Admin"}
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRoleChange(user._id, "admin")}
                        disabled={updatingId === user._id}
                        className="btn-primary btn-sm"
                      >
                        {updatingId === user._id ? "..." : "Make Admin"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserListTable;
