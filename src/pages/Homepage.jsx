import CommentSection from "../components/comments/CommentSection";
import PostDetails from "../components/posts/PostDetails";
import Navbar from "../components/Navbar";
import PostCard from "../components/posts/PostCard";

const Homepage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center">
        <PostCard />
        <PostDetails />
        <CommentSection />
      </main>
    </div>
  );
};

export default Homepage;
