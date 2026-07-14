import { NavLink, useNavigate } from "react-router";
import { CiHome } from "react-icons/ci";
import { MdOutlinePostAdd } from "react-icons/md";
import { MdOutlineDrafts } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { AiTwotoneDashboard } from "react-icons/ai";
import { FaComments } from "react-icons/fa";
import { TbCategoryPlus } from "react-icons/tb";
import { IoMdLogOut } from "react-icons/io";

import { FaListAlt } from "react-icons/fa";

import { FaList } from "react-icons/fa6";
import { useAuth } from "../../../hooks/useAuth";
const UserDashBoardSidebar = () => {
  const navigate = useNavigate();
  const { logout, state: authState } = useAuth();
  const { user } = authState;

  const admin = user.role === "admin";
  const superAdmin = user.role === "super_admin";

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
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
    { name: "My posts", icon: <FaList />, path: "/dashboard/user/all-posts" },
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
        icon: <TbCategoryPlus />,
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
    <aside className="w-full h-screen flex flex-col justify-between items-center border-r border-border font-ui">
      <div className="flex flex-col items-center justify-between gap-4 ">
        <div className="text-xl py-4 font-bold">My Dashboard</div>

        <nav className="w-full flex flex-col h-full items-start justify-start">
          <NavLink
            to="/dashboard/user/create-post"
            className="btn-primary w-full text-center btn-md"
          >
            Create Post
          </NavLink>

          {links.map((link) => (
            <NavLink
              key={`${link.path}-${link.name}`}
              to={link.path}
              className={({ isActive }) =>
                `px-4 py-4 text-start w-full rounded-md transition-all text-md 2xl:prose-text duration-200 font-medium ${
                  isActive
                    ? "bg-primary text-black"
                    : "text-muted-text hover:text-body-text"
                }`
              }
            >
              <span className=" w-full flex items-center gap-2">
                {link.icon}
                {link.name}
              </span>
            </NavLink>
          ))}
        </nav>
        <div className="w-full text-center flex justify-center px-2 py-4">
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
    </aside>
  );
};

export default UserDashBoardSidebar;
