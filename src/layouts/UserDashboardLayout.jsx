import { Outlet } from "react-router";
import UserDashBoardNav from "../components/dashboard/user/UserDashBoardNav";
import UserDashBoardSidebar from "../components/dashboard/user/UserDashBoardSidebar";
const UserDashBoardLayout = () => {
  return (
    <>
      <div className="sm:hidden">
        <UserDashBoardNav />
      </div>
      <div className="w-full h-screen mx-auto flex">
        {/* 2. Sidebar - Fixed width (e.g., 1/4 or 1/3) */}
        <aside className="hidden sm:flex w-60 h-full bg-primary">
          <UserDashBoardSidebar />
        </aside>
        {/* 3. Main Content Area - Grows to fill the remaining space */}
        <main className="w-full sm:flex-1 h-full overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default UserDashBoardLayout;
