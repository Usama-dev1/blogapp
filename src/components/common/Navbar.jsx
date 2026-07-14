import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { useAuth } from "../../hooks/useAuth";
import { NavLink, useNavigate } from "react-router";
import { IoMdLogOut } from "react-icons/io";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { state, logout } = useAuth();
  const loggedIn = state.isAuthenticated;
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  return (
    <nav className="relative bg-primary border-b border-border">
      <div className="body-width flex items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
        <NavLink to="/">
          <div className="text-base sm:text-4xl py-2 font-bold text-brand">
            BlogApp
          </div>
        </NavLink>

        {/* Desktop links */}
        <div className="hidden md:flex  items-center space-x-8">
          {loggedIn ? (
            <>
              <NavLink to="/dashboard/user">
                <button className="btn-primary btn-sm md:btn-base text-xs! ">
                  <p className="text-xs lg:text-base">Dashboard</p>
                </button>
              </NavLink>
              <NavLink>
                <button
                  onClick={handleLogout}
                  className="flex justify-center btn-danger btn-sm md:btn-base "
                >
                  <p className="text-xs lg:text-base">Logout</p>
                </button>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/" className="text-lg hover:text-brand">
                Home
              </NavLink>
              <NavLink to="/register">
                <button className="btn-primary btn-md w-full">Register</button>
              </NavLink>
              <NavLink to="/login">
                <button className="btn-secondary btn-md w-full mx-2">
                  Login
                </button>
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden btn-icon text-2xl"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <IoMdClose /> : <RxHamburgerMenu />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div
          className={`md:hidden absolute inset-0 top-15 z-50 w-full min-h-screen flex flex-col text-center gap-4 px-4 pb-6 bg-secondary transition py-4 duration-150 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <a href="/" className="text-body">
            Home
          </a>

          {loggedIn ? (
            <NavLink to="/dashboard/user">
              <button className="btn-primary btn-sm px-8">Dashboard</button>
            </NavLink>
          ) : (
            <>
              <NavLink to="/register">
                <button
                  className="btn-primary btn-sm w-full px-8"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </button>
              </NavLink>
              <NavLink to="/login">
                <button
                  className="btn-secondary btn-sm w-full px-8"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </button>
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
