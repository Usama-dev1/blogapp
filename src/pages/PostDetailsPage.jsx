import Navbar from "../components/common/Navbar";
import PostCard from "../components/posts/PostCard";
import PostDetails from "../components/posts/PostDetails";
import CommentSection from "../components/comments/CommentSection";
PostCard;
const PostDetailsPage = () => {
  return (
    <>
      <PostDetails />
      <CommentSection />
    </>
  );
};

export default PostDetailsPage;
