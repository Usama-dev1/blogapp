import { Outlet } from "react-router";
import DashBoardNav from "../components/dashboard/DashBoardNav";
import DashBoardSidebar from "../components/dashboard/DashBoardSidebar";
const DashBoardLayout = () => {
  return (
    <>
      <div className="sm:hidden">
        <DashBoardNav />
      </div>
      <div className="w-full h-screen mx-auto flex">
        {/* 2. Sidebar - Fixed width (e.g., 1/4 or 1/3) */}
        <aside className="hidden sm:flex w-50 h-full bg-primary">
          <DashBoardSidebar />
        </aside>
        {/* 3. Main Content Area - Grows to fill the remaining space */}
        <main className="w-full sm:flex-1 h-full overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default DashBoardLayout;
