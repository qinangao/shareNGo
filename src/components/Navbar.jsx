import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, logout, userId } = useAuth();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const getNavLinkClass = ({ isActive }) =>
    `py-2 px-2 text-dark-100 ${
      isActive ? "text-dark-50" : "hover:text-dark-50"
    }`;

  return (
    <nav className="border-brand-50 shadow-sm relative z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src="/assets/logo.png" className="h-8" alt="Logo" />
          <span className="font-grechen self-center text-2xl md:text-4xl font-semibold whitespace-nowrap">
            ShareNGo
          </span>
        </NavLink>

        <button
          onClick={toggleNavbar}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="mobile-menu"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
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

        {/* Desktop menu */}
        <div className="hidden md:flex md:items-center gap-8">
          <NavLink to="/" className={getNavLinkClass}>
            Home
          </NavLink>
          <NavLink to="/user" className={getNavLinkClass}>
            Community
          </NavLink>
          {isLoggedIn && (
            <NavLink to={`/${userId}/places`} className={getNavLinkClass}>
              My Places
            </NavLink>
          )}
          {isLoggedIn ? (
            <>
              <NavLink to="/places/new">
                <Button variant="default">Add Place</Button>
              </NavLink>
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <NavLink to="/auth">
              <Button variant="default">Login</Button>
            </NavLink>
          )}
        </div>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="absolute text-center top-16 left-1/2 -translate-x-1/2 w-[90%] bg-white shadow-lg rounded-b-md p-4 flex flex-col gap-4 md:hidden transition-all duration-300"
        >
          <NavLink to="/" onClick={() => setIsOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/user" onClick={() => setIsOpen(false)}>
            Community
          </NavLink>

          {isLoggedIn && (
            <NavLink to={`/${userId}/places`} onClick={() => setIsOpen(false)}>
              My Places
            </NavLink>
          )}

          {isLoggedIn ? (
            <>
              <NavLink to="/places/new" onClick={() => setIsOpen(false)}>
                <Button variant="default" className="w-full">
                  Add Place
                </Button>
              </NavLink>
              <Button
                variant="outline"
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="w-full"
              >
                Logout
              </Button>
            </>
          ) : (
            <NavLink to="/auth" onClick={() => setIsOpen(false)}>
              <Button variant="default" className="w-full">
                Login
              </Button>
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
