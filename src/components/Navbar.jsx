import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const getNavLinkClass = ({ isActive }) =>
    `py-2 px-4 text-dark-100 md:px-0 ${
      isActive ? "border-b-2 border-dark-100" : "hover:text-brand-300"
    }`;

  return (
    <nav className="bg-white border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src="/assets/logo.png" className="h-8" alt="Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            ShareNGo
          </span>
        </NavLink>

        <button
          onClick={toggleNavbar}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div
          className={`${isOpen ? "block" : "hidden"} w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="flex flex-col md:flex-row items-center justify-center gap-8 p-4 md:p-0 mt-4 md:mt-0 border border-gray-100 md:border-0 rounded-lg bg-gray-50 md:bg-transparent">
            <li>
              <NavLink to="/user" className={getNavLinkClass}>
                Community
              </NavLink>
            </li>
            {isLoggedIn && (
              <li>
                <NavLink to="/u1/places" className={getNavLinkClass}>
                  My Places
                </NavLink>
              </li>
            )}
            <div className="flex justify-center items-center gap-4 md:gap-8">
              {isLoggedIn && (
                <li>
                  <NavLink to="/places/new">
                    <Button variant="default">Add Place</Button>
                  </NavLink>
                </li>
              )}
              {!isLoggedIn && (
                <li>
                  <NavLink to="/auth">
                    <Button variant="default">Login</Button>
                  </NavLink>
                </li>
              )}

              {isLoggedIn && (
                <li>
                  <Button variant="outline" onClick={logout}>
                    Logout
                  </Button>
                </li>
              )}
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
