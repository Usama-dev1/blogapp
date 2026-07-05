import Navbar from "../components/Navbar";
import PostCard from "../components/posts/PostCard";

const HomePage = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
      {Array.from({ length: 8 }).map((_, index) => (
        <PostCard key={index} />
      ))}
    </div>
  );
};

export default HomePage;
