import { useMemo, useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../../../hooks/useAuth";
import { usePostHook } from "../../../hooks/usePostHook";
import ConfirmationModal from "../../common/ConfirmationModal";
import ViewPostModal from "../../common/ViewPostModal";
import EditPostModal from "../../common/EditPostModal";
const UserDashboardPosts = () => {
  const {
    state: { user },
  } = useAuth();
  const {
    state: { posts, isLoading, currentPost },
    deletePost,
    getPostById,
  } = usePostHook();
  const [pId, setPId] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const userPosts = useMemo(() => {
    if (!user?.id || !posts) return [];
    return posts.filter((post) => post.userId === user.id);
  }, [posts, user]);
  if (userPosts.length === 0) return <div>No user posts</div>;

  const handleDeletePost = async () => {
    try {
      await deletePost(pId);
    } catch (error) {
      console.log(error);
    } finally {
      setOpenDeleteModal(false);
    }
  };
  const handleViewPost = async (id) => {
    try {
      await getPostById(id);
    } catch (error) {
      console.log(error);
    } finally {
      console.log(currentPost);
    }
  };

  console.log(pId);
  return (
    <div className="mx-auto flex justify-center items-center w-full px-5">
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
              {userPosts.map((p) => (
                <tr key={p._id}>
                  <td className="p-4 w-20 border-b border-border">
                    <div className="flex  items-center justify-center gap-3">
                      <Link onClick={() => setOpenViewModal(true)}>
                        <span className="" onClick={() => openViewModal(true)}>
                          {p.title.slice(0, 50)}
                        </span>
                      </Link>
                    </div>
                  </td>
                  <td className="p-4 w-20 border-b border-border">
                    <div className="flex items-center justify-center gap-3 ">
                      <span className="font-bold text-xs sm:text-base text-green-900 uppercase rounded-md select-none whitespace-nowrap bg-green-500/20">
                        {p.isDraft ? "Draft" : "Published"}
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
        <div className="flex items-center justify-around p-3">
          <p className="block text-sm text-slate-500">Page 1 of 10</p>
          <div className="flex gap-1">
            <button
              className="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-600 transition-all hover:opacity-75 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              Previous
            </button>
            <button
              className="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-600 transition-all hover:opacity-75 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <ConfirmationModal
        isOpen={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        loading={isLoading}
        handleConfirmDelete={handleDeletePost}
      />
      <ViewPostModal
        isOpen={openViewModal}
        postId={pId}
        onClose={() => setOpenViewModal(false)}
        loading={isLoading}
        post={currentPost}
      />
      <EditPostModal
        isOpen={openEditModal}
        loading={isLoading}
        post={currentPost}
        onClose={() => setOpenEditModal(false)}
      />
    </div>
  );
};

export default UserDashboardPosts;
