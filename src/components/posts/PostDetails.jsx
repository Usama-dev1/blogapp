import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { useEffect, useMemo } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { Link, useParams } from "react-router";
import { usePostHook } from "../../hooks/usePostHook";
import { useLikesHook } from "../../hooks/useLikesHook";
import { useAuth } from "../../hooks/useAuth";

const PostDetails = () => {
  const { id } = useParams();

  const { state, getPostById } = usePostHook();
  const { currentPost, isLoading: postLoading, error: postError } = state;

  const { state: likeState, getLikes, createLike, removeLike } = useLikesHook();
  const { error: likesError } = likeState;

  const { state: authState } = useAuth();
  const { user, isAuthenticated, isLoading: authLoading } = authState;

  useEffect(() => {
    if (id) {
      getPostById(id);
      getLikes(id);
    }
  }, [id]);

  const userHasLiked = useMemo(() => {
    if (!user?.id) return false;
    return likeState.likes.some(
      (like) => like.userId?.toString() === user.id?.toString(),
    );
  }, [likeState.likes, user]);

  const handleLikeToggle = () => {
    if (authLoading || !isAuthenticated || likeState.isLoading) return;
    userHasLiked ? removeLike(id) : createLike(id);
  };

  const stillLoading = postLoading || authLoading;
  if (stillLoading) {
    return <div className="body-width p-4">Loading...</div>;
  }

  if (postError)
    return <div className="body-width p-4 text-red-600">{postError}</div>;
  if (likesError)
    return <div className="body-width p-4 text-red-600">{likesError}</div>;
  if (!currentPost?._id) return null;

  const { title, content, createdAt } = currentPost;
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString()
    : "";

  return (
    <div className="body-width">
      <div className="w-full">
        <Link to="/">
          <button className="btn-secondary btn-md flex justify-start items-center gap-2">
            <FaArrowLeft /> Go Back
          </button>
        </Link>
      </div>
      <h1 className="heading-main p-4">{title.slice(0, 80)}</h1>

      <p className="prose-text p-4 font-article whitespace-pre-line">
        {content}
      </p>
      <div className="w-full px-6 flex text-base items-center justify-between border-t py-4 gap-4">
        <div className="flex justify-evenly items-center">
          <button
            className="flex items-center gap-2 btn-sm btn-icon"
            onClick={handleLikeToggle}
            disabled={likeState.isLoading || !isAuthenticated}
          >
            <span className="flex items-center  justify-center text-link">
              {userHasLiked ? (
                <>
                  <p className="text-muted-text  text-base">Unlike This Post</p>
                  <AiFillLike className="text-2xl ms-2" />
                </>
              ) : (
                <>
                  <p className="text-muted-text  text-base disabled:btn-">
                    {isAuthenticated ? "Like This Post" : "Login to Like"}
                  </p>
                  <AiOutlineLike className="text-2xl ms-2" />
                </>
              )}
            </span>
            <span className="text-base bg-red-500 w-6 h-6 text-white rounded-full">
              {likeState.likeCount ?? 0}
            </span>
          </button>
        </div>
        <div className="flex flex-wrap space-x-5 items-center gap-4 text-sm">
          <div className="flex items-center gap-1 text-muted-text">
            <span className="opacity-50 text-xs md:text-xl">
              <GoDotFill />
            </span>
            <p>{formattedDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
