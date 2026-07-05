import { NavLink, useNavigate } from "react-router";
import { CiHome } from "react-icons/ci";
import { MdOutlinePostAdd } from "react-icons/md";
import { MdOutlineDrafts } from "react-icons/md";
import { FaList } from "react-icons/fa6";

const DashBoardSidebar = () => {
  const navigate = useNavigate();

  const links = [
    { name: "Home", icon: <CiHome />, path: "/dashboard", end: true },
    { name: "Write", icon: <MdOutlinePostAdd />, path: "/" },
    { name: "Drafts", icon: <MdOutlineDrafts />, path: "/dashboard/posts" },
    { name: "All posts", icon: <FaList />, path: "/dashboard/posts" },
  ];

  return (
    <aside className="w-full h-screen p-2 flex flex-col justify-between items-center border-r border-border font-ui">
      <div className="flex flex-col items-center justify-between gap-4 py-12">
        <div className="text-2xl font bold py-4 font-bold">My Dashboard</div>

        <nav className="w-full flex flex-col h-full items-center justify-start gap-7">
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
                `px-4 py-1 text-start w-full rounded-md transition-all text-md 2xl:prose-text duration-200 font-medium ${
                  isActive
                    ? "bg-primary text-black"
                    : "text-muted-text hover:text-brand"
                }`
              }
            >
              <span className=" w-full flex items-center gap-4">
                {link.icon}
                {link.name}
              </span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="w-full text-center px-2">
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
