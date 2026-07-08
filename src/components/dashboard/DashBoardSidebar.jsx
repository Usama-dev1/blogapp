import { NavLink, useNavigate } from "react-router";
import { CiHome } from "react-icons/ci";
import { MdOutlinePostAdd } from "react-icons/md";
import { MdOutlineDrafts } from "react-icons/md";
import { FaList } from "react-icons/fa6";

const DashBoardSidebar = () => {
  const navigate = useNavigate();

  const links = [
    { name: "Home", icon: <CiHome />, path: "/", end: true },
    { name: "Write", icon: <MdOutlinePostAdd />, path: "dashboard/post" },
    { name: "Drafts", icon: <MdOutlineDrafts />, path: "/dashboard/drafts" },
    { name: "My posts", icon: <FaList />, path: "/dashboard/all-posts" },
  ];

  return (
    <aside className="w-full h-screen p-2 flex flex-col justify-between items-center border-r border-border font-ui">
      <div className="flex flex-col items-center justify-between gap-4 py-12">
        <div className="text-xl py-4 font-bold">My Dashboard</div>

        <nav className="w-full flex flex-col h-full items-start justify-start me-2">
          <NavLink
            to="/dashboard/create-post"
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
      </div>

      <div className="w-full text-center mb-4 px-2">
        <button
          onClick={() => {
            navigate("/");
          }}
          className="btn-danger btn-sm "
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default DashBoardSidebar;
