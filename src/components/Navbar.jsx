import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full mx-auto bg-primary border-b border-border">
      <div className=" flex items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
        <div className="text-2xl font-bold text-brand">BlogApp</div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          <a href="/" className=" hover:text-brand">
            Home
          </a>
          <button className="btn-primary btn-sm md:btn-lg">Sign up</button>
          <button className="btn-base btn-sm md:btn-lg">Sign in</button>
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
          className={`md:hidden flex flex-col text-center gap-4 px-4 pb-6 border-t border-border transition py-4 duration-150 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <a href="/" className="text-body">
            Home
          </a>
          <button className="btn-primary btn-sm w-full px-8">Sign up</button>
          <button className="btn-secondary btn-sm w-full px-8">Sign in</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
