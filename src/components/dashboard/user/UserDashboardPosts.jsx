import { useMemo } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { usePostHook } from "../../../hooks/usePostHook";
const UserDashboardPosts = () => {
  const {
    state: { user },
  } = useAuth();
  const {
    state: { posts },
  } = usePostHook();
  console.log(user, posts);
  const userPosts = useMemo(() => {
    if (!user?.id || !posts) return [];
    return posts.filter((post) => post.userId === user.id);
    // if author is stored as a raw id string instead of populated object:
    // return posts.filter((post) => post.author === user._id || post.authorId === user._id);
  }, [posts, user]);
  console.log(userPosts);
  if (userPosts.length === 0) return <div>No user posts</div>;
  return (
    <div className="mx-5 flex justify-center items-center w-full">
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
                <tr>
                  <td className="p-4 w-20 border-b border-border">
                    <div className="flex  items-center justify-center gap-3">
                      <span className="">{p.title.slice(0, 50)}</span>
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
                      <button className=" btn-icon btn-sm" type="button">
                        View
                      </button>
                      <button className="btn-secondary btn-sm" type="button">
                        Edit
                      </button>
                      <button className="btn-danger btn-sm" type="button">
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
    </div>
  );
};

export default UserDashboardPosts;
