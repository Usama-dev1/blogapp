import { useParams } from "react-router";
import PostDetails from "../components/posts/PostDetails";
import CommentSection from "../components/comments/CommentSection";

const PostDetailsPage = () => {
  const { id } = useParams();

  return (
    <>
      <PostDetails />
      <CommentSection postId={id} />
    </>
  );
};

export default PostDetailsPage;
