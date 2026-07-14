import { useState, useEffect } from "react";
import ConfirmationModal from "../common/ConfirmationModal";
import Pagination from "../common/Pagination";
import { api } from "../../services/interceptors";
import { useAuth } from "../../hooks/useAuth";
import { formatDate } from "../../util/formatDate";

const UserDashboardAllComments = () => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalComments, setTotalComments] = useState(0);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const { state: authState } = useAuth();
  const { user, isAuthenticated } = authState;

  const canAccess = user?.role === "super_admin" || user?.role === "admin";

  const fetchComments = async (page = 1, limit = 10) => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await api.get("/auth/users/comments", {
        params: {
          page,
          limit,
        },
      });

      const { comments, pagination } = res.data.data;

      setComments(comments);
      setCurrentPage(pagination.currentPage);
      setTotalPages(pagination.totalPages);
      setTotalComments(pagination.totalPosts);
    } catch (err) {
      console.error("[fetchComments] Error:", err);
      setError("Failed to load comments");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && canAccess) {
      fetchComments();
    }
  }, [isAuthenticated, canAccess]);

  const handlePageChange = (page) => {
    fetchComments(page, 10);
  };

  const handleHardDelete = async (id) => {
    try {
      setUpdatingId(id);

      // Change this endpoint if your backend route is different
      await api.delete(`/auth/users/comments/${id}`);

      setComments((prev) => prev.filter((comment) => comment._id !== id));

      fetchComments(currentPage);
    } catch (err) {
      console.error("[handleHardDelete] Error:", err);
      setError("Failed to permanently delete comment");
    } finally {
      setUpdatingId(null);
      setOpenDeleteModal(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-full mx-auto p-4 text-muted-text">
        Loading comments...
      </div>
    );
  }

  if (error) {
    return <div className="max-w-full mx-auto p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-full mx-5">
      <div className="relative flex flex-col w-full bg-primary text-body-text">
        <div className="mx-4 mt-4">
          <h3 className="text-lg font-semibold">Comments : {totalComments}</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full mt-4 table-auto text-left">
            <thead>
              <tr>
                <th className="p-4 border-y border-border bg-secondary">
                  Username
                </th>

                <th className="p-4 border-y border-border bg-secondary">
                  Email
                </th>

                <th className="p-4 border-y border-border bg-secondary">
                  Comment
                </th>

                <th className="p-4 border-y border-border bg-secondary">
                  Date
                </th>

                <th className="p-4 border-y border-border bg-secondary text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {comments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-muted-text">
                    No comments found.
                  </td>
                </tr>
              ) : (
                comments.map((comment) => (
                  <tr key={comment._id}>
                    <td className="p-4 border-b border-border">
                      {comment.userId?.username}
                    </td>

                    <td className="p-4 border-b border-border">
                      {comment.userId?.email}
                    </td>

                    <td className="p-4 border-b border-border">
                      <div className="max-w-md break-words">
                        {comment.content}
                      </div>
                    </td>

                    <td className="p-4 border-b border-border">
                      {formatDate(comment.createdAt)}
                    </td>

                    <td className="p-4 border-b border-border text-center">
                      <button
                        className="btn-danger btn-sm"
                        disabled={updatingId === comment._id}
                        onClick={() => {
                          setDeleteId(comment._id);
                          setOpenDeleteModal(true);
                        }}
                      >
                        {updatingId === comment._id ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
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
        loading={updatingId !== null}
        handleConfirmDelete={() => handleHardDelete(deleteId)}
        text="comment"
      />
    </div>
  );
};

export default UserDashboardAllComments;
