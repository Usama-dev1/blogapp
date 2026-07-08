import PostCard from "../components/posts/PostCard";
import { usePostHook } from "../hooks/usePostHook";
const HomePage = () => {
  const { state } = usePostHook();
  const { posts, isLoading, error } = state;
  console.log(posts, isLoading, error);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
      {posts.map((p, index) => (
        <PostCard key={p._id} post={p} />
      ))}
    </div>
  );
};

export default HomePage;
