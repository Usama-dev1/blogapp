import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { useAuth } from "../../hooks/useAuth";
import { NavLink } from "react-router";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { state } = useAuth();
  const loggedIn = state.isAuthenticated;
  return (
    <nav className="relative bg-primary border-b border-border">
      <div className="body-width flex items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
        <div className="text-2xl font-bold text-brand">BlogApp</div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center space-x-8">
          {loggedIn ? (
            <NavLink to="/dashboard/user">
              <button className="btn-primary btn-md text-xs! ">
                Go to Dashboard
              </button>
            </NavLink>
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
          className={`md:hidden absolute inset-0 top-10 z-50 w-full min-h-screen flex flex-col text-center gap-4 px-4 pb-6 bg-secondary transition py-4 duration-150 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <a href="/" className="text-body">
            Home
          </a>

          {loggedIn ? (
            <NavLink to="/dashboard/user">
              <button className="btn-primary btn-sm w-full px-8">
                Dashboard
              </button>
            </NavLink>
          ) : (
            <>
              <NavLink to="/register">
                <button className="btn-primary btn-sm w-full px-8">
                  Register
                </button>
                ▐
              </NavLink>
              <NavLink to="/login">
                <button className="btn-secondary btn-sm w-full px-8">
                  Login
                </button>
                ▐
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
