import { useEffect } from "react";
import CommentCard from "./CommentCard";
import CommentInputCard from "./CommentInputCard";
import { useCommentHook } from "../../hooks/useCommentHook";
import { useAuth } from "../../hooks/useAuth";

const CommentSection = ({ postId }) => {
  const {
    state: commentState,
    getComments,
    createComment,
    updateComment,
    deleteComment,
  } = useCommentHook();
  const { comments, isLoading, error } = commentState;

  const { state: authState } = useAuth();
  const { user, isAuthenticated } = authState;
  console.log("user state", user, authState);
  useEffect(() => {
    if (postId) getComments(postId);
  }, [postId]);

  const canManage = (comment) => {
    if (!user) return false;
    const isOwner = comment.userId?._id?.toString() === user.id?.toString();
    const isAdmin = user.role === "admin" || user.role === "super_admin";
    return isOwner || isAdmin;
  };

  const handlePost = (draft) => {
    createComment(postId, draft);
  };

  return (
    <div className="bg-secondary body-width border-t border-border flex flex-col justify-center items-center p-8">
      <div className="w-full py-8 flex flex-col justify-center gap-4 items-center">
        {isLoading && <p>Loading comments...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {comments.map((comment) => (
          <CommentCard
            key={comment._id}
            username={comment.userId?.username ?? "User"}
            email={comment.userId?.email}
            text={comment.content}
            timestamp={new Date(comment.createdAt).toLocaleDateString()}
            canManage={canManage(comment)}
            onSave={(draft) => updateComment(postId, comment._id, draft)}
            onDelete={() => deleteComment(postId, comment._id)}
          />
        ))}
      </div>
      <CommentInputCard loggedUser={isAuthenticated} onPost={handlePost} />
    </div>
  );
};

export default CommentSection;
