import { usePostHook } from "../hooks/usePostHook";
import PostCard from "../components/posts/PostCard";

const HomePage = () => {
  const { state } = usePostHook();
  const { posts, isLoading, error } = state;

  if (isLoading) return <div>Loading posts...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
      {posts.map((p) => (
        <PostCard key={p._id} post={p} />
      ))}
    </div>
  );
};

export default HomePage;
