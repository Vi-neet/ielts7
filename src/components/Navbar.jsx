import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="/logo.webp" alt="logo" className="h-10 hover:scale-105 transition-transform" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-10 font-inter">
            <Link
              to="/"
              className={`${
                location.pathname === "/"
                  ? "text-[#cc0d09] font-bold after:block after:w-full after:h-0.5 after:bg-[#cc0d09] after:transform after:scale-x-100"
                  : "text-gray-600 hover:text-[#d56e1f] after:block after:w-full after:h-0.5 after:bg-[#d56e1f] after:transform after:scale-x-0 hover:after:scale-x-100"
              } transition-all duration-300 md:text-sm lg:text-base`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`${
                location.pathname.includes("/about")
                  ? "text-[#cc0d09] font-bold after:block after:w-full after:h-0.5 after:bg-[#cc0d09] after:transform after:scale-x-100"
                  : "text-gray-600 hover:text-[#d56e1f] after:block after:w-full after:h-0.5 after:bg-[#d56e1f] after:transform after:scale-x-0 hover:after:scale-x-100"
              } transition-all duration-300 md:text-sm lg:text-base`}
            >
              About Us
            </Link>
            <Link
              to="/evaluation"
              className={`${
                location.pathname.includes("/evaluation")
                  ? "text-[#cc0d09] font-bold after:block after:w-full after:h-0.5 after:bg-[#cc0d09] after:transform after:scale-x-100"
                  : "text-gray-600 hover:text-[#d56e1f] after:block after:w-full after:h-0.5 after:bg-[#d56e1f] after:transform after:scale-x-0 hover:after:scale-x-100"
              } transition-all duration-300 md:text-sm lg:text-base`}
            >
              Writing Review
            </Link>
            <Link
              to="/watchNlearn"
              className={`${
                location.pathname === "/watchNlearn"
                  ? "bg-[#cc0d09] text-white"
                  : "bg-[#d56e1f] text-white hover:bg-[#cc0d09]"
              } px-4 lg:px-6 py-2 rounded-full font-medium transition-colors duration-300 transform hover:scale-105 md:text-sm lg:text-base`}
            >
              Free Resources
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-[#cc0d09] focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } md:hidden pb-6 transition-all duration-300 ease-in-out font-inter`}
        >
          <div className="flex flex-col space-y-6">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className={`${
                location.pathname === "/"
                  ? "text-[#cc0d09] font-bold"
                  : "text-gray-600 hover:text-[#d56e1f]"
              } transition-colors px-2 py-1`}
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className={`${
                location.pathname.includes("/about")
                  ? "text-[#cc0d09] font-bold"
                  : "text-gray-600 hover:text-[#d56e1f]"
              } transition-colors px-2 py-1`}
            >
              About Us
            </Link>
            <Link
              to="/evaluation"
              onClick={() => setIsOpen(false)}
              className={`${
                location.pathname.includes("/evaluation")
                  ? "text-[#cc0d09] font-bold"
                  : "text-gray-600 hover:text-[#d56e1f]"
              } transition-colors px-2 py-1`}
            >
              Writing Review
            </Link>
            <Link
              to="/watchNlearn"
              onClick={() => setIsOpen(false)}
              className={`${
                location.pathname.includes("/watchNlearn")
                  ? "bg-[#cc0d09] text-white"
                  : "bg-[#d56e1f] text-white hover:bg-[#cc0d09]"
              } transition-colors px-6 py-2 rounded-full text-center w-full max-w-xs mx-auto`}
            >
              Free Resources
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;