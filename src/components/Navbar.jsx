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
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            {/* <span className="text-xl font-bold font-playfair text-[#cc0d09]"></span> */}
            <img src="/logo.webp" alt="logo" className="h-8" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 font-inter">
            <Link
              to="/"
              className={`${
                location.pathname === "/"
                  ? "text-[#cc0d09] font-bold"
                  : "text-gray-600 hover:text-[#d56e1f]"
              } transition-colors`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`${
                location.pathname.includes("/about")
                  ? "text-[#cc0d09] font-bold"
                  : "text-gray-600 hover:text-[#d56e1f]"
              } transition-colors`}
            >
              About Us
            </Link>
            <Link
              to="/evaluation"
              className={`${
                location.pathname.includes("/evaluation")
                  ? "text-[#cc0d09] font-bold"
                  : "text-gray-600 hover:text-[#d56e1f]"
              } transition-colors`}
            >
              Writing Review
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
          } md:hidden pb-4 transition-all duration-300 ease-in-out font-inter`}
        >
          <div className="flex flex-col space-y-4">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className={`${
                location.pathname === "/"
                  ? "text-[#cc0d09]"
                  : "text-gray-600 hover:text-[#d56e1f]"
              } transition-colors`}
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className={`${
                location.pathname.includes("/about")
                  ? "text-[#cc0d09]"
                  : "text-gray-600 hover:text-[#d56e1f]"
              } transition-colors`}
            >
              About Us
            </Link>
            <Link
              to="/evaluation"
              onClick={() => setIsOpen(false)}
              className={`${
                location.pathname.includes("/evaluation")
                  ? "text-[#cc0d09]"
                  : "text-gray-600 hover:text-[#d56e1f]"
              } transition-colors`}
            >
              Writing Review
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
