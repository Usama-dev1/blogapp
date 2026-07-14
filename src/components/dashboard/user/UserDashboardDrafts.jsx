import { useEffect, useState } from "react";
import { Link } from "react-router";
import { usePostHook } from "../../../hooks/usePostHook";
import ConfirmationModal from "../../common/ConfirmationModal";
import ViewPostModal from "../../common/ViewPostModal";
import EditDraftModal from "../../common/EditDraftModal";
import Pagination from "../../common/Pagination";
import { useAuth } from "../../../hooks/useAuth";
const UserDashboardDrafts = () => {
  const {
    state: { isLoading, currentDraftPost, draftPosts, draftPagination },
    deleteDraftPost,
    getDraftPosts,
    getDraftPostById,
  } = usePostHook();
  const { user } = useAuth();

  const [pId, setPId] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const allDraftPosts = draftPosts ?? [];
  useEffect(() => {
    if (user?.id) getDraftPosts(1, draftPagination.limit);
  }, [user?.id]);
  // if (allDraftPosts.length === 0) return <div>No user posts</div>;
  const handlePageChange = (newPage) => {
    getDraftPosts(newPage, draftPagination.limit);
  };
  const handleDeleteDraft = async () => {
    try {
      await deleteDraftPost(pId);
    } catch (error) {
      console.log(error);
    } finally {
      setOpenDeleteModal(false);
    }
  };
  const handleViewPost = async (id) => {
    try {
      await getDraftPostById(id);
    } catch (error) {
      console.log(error);
    } finally {
      console.log(currentDraftPost);
    }
  };

  return (
    <div className="mx-auto flex flex-col justify-center items-center w-full px-5">
      <div className="relative flex flex-col text-center w-full text-body-text bg-primary">
        <div className="relative mx-4 mt-4 overflow-hidden text-body-text bg-primary">
          <div className="flex items-center justify-between ">
            <div className="w-full">
              <h3 className="text-2xl text-center font-semibold text-body-text">
                Post List
              </h3>
            </div>
          </div>
        </div>
        <div className="p-0 overflow-scroll text-center">
          <table className="w-full mt-4 table-auto min-w-max text-center">
            <thead>
              <tr>
                <th className="p-4 w-20 text-center bg-secondary">
                  <p className="flex items-center justify-center gap-2">Post</p>
                </th>
                <th className="p-4 w-20 text-center bg-secondary">
                  <p className="flex items-center justify-center gap-2">
                    Status
                  </p>
                </th>
                <th className="p-4 w-20 text-center bg-secondary">
                  <p className="flex items-center justify-center gap-2">
                    Action
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {allDraftPosts.map((p) => (
                <tr key={p._id}>
                  <td className="p-4 w-20 border-b border-border">
                    <div className="flex  items-center justify-center gap-3">
                      <Link
                        onClick={() => {
                          setOpenViewModal(true);
                          setPId(p._id);
                          handleViewPost(p._id);
                        }}
                      >
                        <span>{p.title.slice(0, 50)}</span>
                      </Link>
                    </div>
                  </td>
                  <td className="p-4 w-20 border-b border-border">
                    <div className="flex items-center justify-center gap-3 ">
                      <span className="font-bold text-xs sm:text-base text-white uppercase rounded-md select-none whitespace-nowrap bg-red-500 px-2">
                        {p.draft ? "Draft" : "Published"}
                      </span>
                    </div>
                  </td>

                  <td className="p-4 w-20 border-b border-border">
                    <div className="flex flex-col sm:flex-row items-center justify-center  w-full gap-2">
                      <button
                        className=" btn-icon btn-sm"
                        type="button"
                        onClick={() => {
                          setOpenViewModal(true);
                          setPId(p._id);
                          handleViewPost(p._id);
                        }}
                      >
                        View
                      </button>
                      <button
                        className="btn-secondary btn-sm"
                        type="button"
                        onClick={() => {
                          setOpenEditModal(true);
                          handleViewPost(p._id);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-danger btn-sm"
                        type="button"
                        onClick={() => {
                          setOpenDeleteModal(true);
                          setPId(p._id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        page={draftPagination.currentPage}
        totalPages={draftPagination.totalPages}
        onPageChange={handlePageChange}
        disabled={isLoading}
      />
      <ConfirmationModal
        isOpen={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        loading={isLoading}
        handleConfirmDelete={handleDeleteDraft}
        text="draft"
      />
      <ViewPostModal
        isOpen={openViewModal}
        postId={pId}
        onClose={() => setOpenViewModal(false)}
        loading={isLoading}
        post={currentDraftPost}
      />
      <EditDraftModal
        isOpen={openEditModal}
        loading={isLoading}
        post={currentDraftPost}
        postId={pId}
        onClose={() => setOpenEditModal(false)}
      />
    </div>
  );
};

export default UserDashboardDrafts;
