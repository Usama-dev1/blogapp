import { AiOutlineLike } from "react-icons/ai";
import { CiShare1 } from "react-icons/ci";
import { useEffect } from "react";
import { FaComment } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { useParams } from "react-router";
import { usePostHook } from "../../hooks/usePostHook";

const PostDetails = () => {
  const { id } = useParams();
  const { state, getPostById } = usePostHook();
  const { currentPost, isLoading, error } = state;

  useEffect(() => {
    if (id) getPostById(id);
  }, [id]);

  if (isLoading) return <div className="body-width p-4">Loading...</div>;
  if (error) return <div className="body-width p-4 text-red-600">{error}</div>;
  if (!currentPost?._id) return null;

  const { title, content, createdAt } = currentPost;
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString()
    : "";

  return (
    <div className="body-width">
      <h1 className="heading-main p-4">{title}</h1>
      <div className="w-full px-6 flex flex-wrap items-center justify-between border-t border-b border-border py-4 gap-4">
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-body-text text-base">
              Post By <span className="text-brand">Usama</span>
            </p>
          </div>

          <div className="flex items-center gap-1 text-muted-text">
            <span className="opacity-50 text-xl">
              <GoDotFill />
            </span>
            <p>{formattedDate}</p>
          </div>
        </div>
        <button className="flex items-center gap-2 btn-md btn-icon">
          <span className="text-md">Comment on this Post</span>
          <span className="text-md">
            <FaComment />
          </span>
        </button>
        <button className="flex items-center gap-2 btn-md btn-icon">
          <span className="text-md">Share this Post</span>
          <span className="text-md">
            <CiShare1 />
          </span>
        </button>

        <button className="flex items-center gap-2 btn-md btn-icon">
          <span className="text-md">Like this Post</span>
          <span className="text-md">
            <AiOutlineLike />
          </span>
        </button>
      </div>
      <p className="prose-text p-4 font-article whitespace-pre-line">
        {content}
      </p>
    </div>
  );
};

export default PostDetails;
