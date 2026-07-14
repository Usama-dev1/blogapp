import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import { Outlet } from "react-router";
const MainLayout = () => {
  return (
    <div className="w-full min-h-screen overflow-y-scroll flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center py-3">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
