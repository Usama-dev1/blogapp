import Navbar from "../components/Navbar";
import PostCard from "../components/posts/PostCard";

const HomePage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-8">
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
