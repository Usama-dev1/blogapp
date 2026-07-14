import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { NavLink, useNavigate } from "react-router";
import { CiHome } from "react-icons/ci";
import { MdOutlinePostAdd } from "react-icons/md";
import { MdOutlineDrafts } from "react-icons/md";
import { FaList } from "react-icons/fa6";
import { FaListAlt } from "react-icons/fa";
import { FaComments } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { AiTwotoneDashboard } from "react-icons/ai";
import { FaUsers } from "react-icons/fa6";

import { useAuth } from "./../../../hooks/useAuth";

const UserDashBoardNav = () => {
  const { logout, state: authState } = useAuth();
  const { user, isLoading } = authState;

  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
    closeMenu();
  };

  if (isLoading) return null;

  const superAdmin = user.role === "super_admin";
  const admin = user.role === "admin";

  const links = [
    {
      name: "Dashboard",
      icon: <AiTwotoneDashboard />,
      path: "/dashboard/user",
      end: true,
    },
    { name: "Home", icon: <CiHome />, path: "/", end: true },

    {
      name: "Write",
      icon: <MdOutlinePostAdd />,
      path: "/dashboard/user/create-post",
    },
    {
      name: "Drafts",
      icon: <MdOutlineDrafts />,
      path: "/dashboard/user/drafts",
    },
    {
      name: "All posts",
      icon: <FaList />,
      path: "/dashboard/user/all-posts",
    },
  ];

  if (admin) {
    links.push(
      {
        name: "All Comments",
        icon: <FaComments />,
        path: "/dashboard/user/comments",
      },
      {
        name: "All User Posts",
        icon: <FaListAlt />,
        path: "/dashboard/user/user-posts",
      },
    );
  }

  if (superAdmin) {
    links.push(
      {
        name: "All Comments",
        icon: <FaComments />,
        path: "/dashboard/user/comments",
      },
      {
        name: "Create Category",
        icon: <FaListAlt />,
        path: "/dashboard/user/create-category",
      },
      {
        name: "All User Posts",
        icon: <FaListAlt />,
        path: "/dashboard/user/user-posts",
      },
      {
        name: "Manage Users",
        icon: <FaUsers />,
        path: "/dashboard/admin/users",
      },
    );
  }

  return (
    <nav className="sticky top-0 z-50 bg-blue-muted border-b border-border px-4 sm:px-6 lg:px-8 h-16 flex justify-between text-center items-center mb-2">
      <div className="text-2xl">
        <NavLink to="/">BlogApp</NavLink>
      </div>
      <div className="space-x-3">
        <NavLink to="/dashboard/user">
          <button className="btn-primary btn-sm text-xs!">Dashboard</button>
        </NavLink>
        <NavLink to="/">
          <button className="btn-secondary btn-sm text-xs!">home</button>
        </NavLink>
      </div>
      <button
        className="md:hidden z-50 relative p-1 rounded-lg transition-colors focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? (
          <IoMdClose className="w-6 h-6" />
        ) : (
          <GiHamburgerMenu className="w-6 h-6" />
        )}
      </button>

      {menuOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 bg-primary z-40"
            onClick={closeMenu}
          />
          <div className="md:hidden fixed top-16 left-0 right-0 border-t border-border p-6 z-40 flex flex-col items-center gap-4 shadow-2xl animate-in fade-in slide-in-from-top-5">
            <div className="w-full flex flex-col gap-1.5">
              <div className="my-4">
                <NavLink
                  to="/dashboard/create-post"
                  className="btn-primary btn-sm"
                  onClick={closeMenu}
                >
                  Create Post
                </NavLink>
              </div>
              {links.map((link, index) => (
                <NavLink
                  key={index}
                  to={link.path}
                  end={link.end}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `px-4 py-1 text-center rounded-md transition-all text-md 2xl:prose-text duration-200 font-medium ${
                      isActive
                        ? "bg-primary text-black"
                        : "text-muted-text hover:text-brand"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              <div className="flex w-full justify-center mt-8">
                <button
                  onClick={handleLogout}
                  className="flex justify-center btn-danger btn-sm "
                >
                  <span className="me-2 flex justify-center items-center">
                    <IoMdLogOut />
                  </span>
                  <p>Logout</p>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default UserDashBoardNav;
