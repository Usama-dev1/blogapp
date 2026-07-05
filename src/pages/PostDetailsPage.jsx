import Navbar from "../components/Navbar";
import PostCard from "../components/posts/PostCard";
import PostDetails from "../components/posts/PostDetails";
import CommentSection from "../components/comments/CommentSection";
PostCard;
const PostDetailsPage = () => {
  return (
    <>
      <div className="w-full min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col items-center">
          <PostDetails />
          <CommentSection />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-8">
            <PostCard />
          </div>
        </main>
      </div>
    </>
  );
};

export default PostDetailsPage;
