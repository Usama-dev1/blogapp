import { useState, useEffect } from "react";
import ConfirmationModal from "../common/ConfirmationModal";
import { api } from "../../services/interceptors";
import { useAuth } from "../../hooks/useAuth";
import { formatDate } from "../../util/formatDate";
import Pagination from "../common/Pagination";

const UserListTable = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(1);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { state: authState } = useAuth();
  const { user, isAuthenticated } = authState;

  const fetchUsers = async (page = 1, limit = 10) => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await api.get("/auth/users", {
        params: {
          page,
          limit,
        },
      });

      setUsers(res.data.data);
      setCurrentPage(res.data.pagination.currentPage);
      setTotalPages(res.data.pagination.totalPages);
      setTotalUsers(res.data.pagination.totalUsers);
    } catch (err) {
      console.error("[fetchUsers] Error:", err);
      setError("Failed to load users");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    fetchUsers(newPage, 10);
  };
  const superAdmin = user.role === "super_admin";
  useEffect(() => {
    if (isAuthenticated && superAdmin) fetchUsers();
  }, []);

  const handleRoleChange = async (id, newRole) => {
    try {
      setUpdatingId(id);
      const res = await api.patch(`/auth/users/${id}/role`, { role: newRole });
      const updatedUser = res.data.data;
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, role: updatedUser.role } : u)),
      );
    } catch (err) {
      console.error("[handleRoleChange] Error:", err);
      setError("Failed to update role");
    } finally {
      setUpdatingId(null);
      fetchUsers();
    }
  };

  const handleSoftDelete = async (id) => {
    try {
      setUpdatingId(id);
      await api.delete(`/auth/users/${id}`);
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, isDeleted: true } : u)),
      );
    } catch (err) {
      console.error("[handleSoftDelete] Error:", err);
      setError("Failed to ban user");
    } finally {
      setUpdatingId(null);
      fetchUsers();
    }
  };

  const handleRestore = async (id) => {
    try {
      setUpdatingId(id);
      await api.patch(`/auth/users/${id}/restore`);
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, isDeleted: false } : u)),
      );
    } catch (err) {
      console.error("[handleRestore] Error:", err);
      setError("Failed to restore user");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleHardDelete = async (id) => {
    try {
      setUpdatingId(id);
      await api.delete(`/auth/users/${id}/hard`);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error("[handleHardDelete] Error:", err);
      setError("Failed to permanently delete user");
    } finally {
      setUpdatingId(null);
      fetchUsers();
      setOpenDeleteModal(false);
    }
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
    <div className="max-w-full mx-5">
      <div className="relative flex flex-col w-full text-body-text bg-primary">
        <div className="relative mx-4 mt-4 overflow-hidden text-body-text bg-primary">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-body-text">
                Users :{totalUsers}
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
                  <p className="flex items-center justify-center gap-2 text-sm text-muted-text">
                    Actions
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td className="p-4 border-b border-border">
                    <div className="flex flex-col">
                      <p className="text-sm font-semibold text-body-text">
                        {u.username}
                      </p>
                      <p className="text-sm text-muted-text">{u.email}</p>
                    </div>
                  </td>
                  <td className="p-4 border-b border-border">
                    <p className="text-sm font-semibold text-body-text capitalize">
                      {u.role.replace("_", " ")}
                    </p>
                  </td>
                  <td className="p-4 border-b border-border">
                    <div className="w-max">
                      <div
                        className={`relative grid items-center px-2 py-1 text-xs font-bold uppercase rounded-md ${
                          u.isDeleted
                            ? "text-red-900 bg-red-500/20"
                            : "text-green-900 bg-green-500/20"
                        }`}
                      >
                        <span>{u.isDeleted ? "deleted" : "active"}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-b border-border">
                    <p className="text-sm text-muted-text">
                      {formatDate(u.createdAt)}
                    </p>
                  </td>
                  <td className="flex flex-col  justify-center sm:flex-row sm:flex-wrap items-start sm:items-center gap-2 p-10 border-b border-border">
                    {u.role === "super_admin" ? (
                      <span className="text-md text-muted-text">
                        Super Admin
                      </span>
                    ) : (
                      <>
                        {u.role === "admin" ? (
                          <button
                            onClick={() => handleRoleChange(u.id, "user")}
                            disabled={updatingId === u.id || u.isDeleted}
                            className="btn-secondary btn-sm text-xs"
                          >
                            {updatingId === u.id ? "..." : "Remove Admin"}
                          </button>
                        ) : (
                          <button
                            onClick={() => handleRoleChange(u.id, "admin")}
                            disabled={updatingId === u.id || u.isDeleted}
                            className="btn-primary btn-sm text-xs"
                          >
                            {updatingId === u.id ? "..." : "Make Admin"}
                          </button>
                        )}

                        {u.isDeleted ? (
                          <button
                            onClick={() => handleRestore(u.id)}
                            disabled={updatingId === u.id}
                            className="btn-success btn-sm text-xs"
                          >
                            {updatingId === u.id ? "..." : "Restore User"}
                          </button>
                        ) : (
                          <button
                            onClick={() => handleSoftDelete(u.id)}
                            disabled={updatingId === u.id}
                            className="btn-warning btn-sm text-xs"
                          >
                            {updatingId === u.id ? "..." : "Ban User"}
                          </button>
                        )}

                        <button
                          onClick={() => {
                            setDeleteId(u.id);
                            setOpenDeleteModal(true);
                          }}
                          disabled={updatingId === u.id}
                          className="btn-danger btn-sm"
                        >
                          {updatingId === u.id ? "..." : "Delete User"}
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        page={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        disabled={isLoading}
      />

      <ConfirmationModal
        isOpen={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        loading={isLoading}
        handleConfirmDelete={() => handleHardDelete(deleteId)}
        text="user"
      />
    </div>
  );
};

export default UserListTable;
