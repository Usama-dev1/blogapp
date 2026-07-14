import { useEffect } from "react";
import { usePostHook } from "../hooks/usePostHook";
import PostCard from "../components/posts/PostCard";
import Pagination from "../components/common/Pagination";

const HomePage = () => {
  const {
    state: { posts, error, isLoading, pagination },
    getPosts,
  } = usePostHook();

  useEffect(() => {
    getPosts(1, 10);
  }, []);

  const handlePageChange = (newPage) => {
    getPosts(newPage, pagination.limit);
  };

  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen flex-col">
      {isLoading && posts.length === 0 ? (
        <div className="p-8 text-muted-text">Loading posts...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          {posts.map((p) => (
            <PostCard key={p._id} post={p} />
          ))}
        </div>
      )}
      <div className="w-full">
        <Pagination
          page={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
          disabled={isLoading}
        />
      </div>
    </div>
  );
};

export default HomePage;
