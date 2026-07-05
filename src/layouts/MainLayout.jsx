import Navbar from "../components/common/Navbar";
import { Outlet } from "react-router";
const MainLayout = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center py-3">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
