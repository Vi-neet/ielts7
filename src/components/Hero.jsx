/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { BookOpen, Target, Award, ChevronDown } from "lucide-react";
import { Link, Outlet, useParams, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const Hero = () => {
  const [freeDropdownOpen, setFreeDropdownOpen] = useState(false);
  const [paidDropdownOpen, setPaidDropdownOpen] = useState(false);
  const freeDropdownRef = useRef(null);
  const paidDropdownRef = useRef(null);
  const { plan, type } = useParams();
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        freeDropdownRef.current &&
        !freeDropdownRef.current.contains(event.target)
      ) {
        setFreeDropdownOpen(false);
      }
      if (
        paidDropdownRef.current &&
        !paidDropdownRef.current.contains(event.target)
      ) {
        setPaidDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const DropdownMenu = ({ planType, isOpen }) => (
    <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-50 transform origin-top transition-all duration-200 ease-out">
      <div className="py-1">
        <Link
          to={`/${planType}/general_reading`}
          className="block px-4 py-2 text-gray-700 hover:bg-[#d56e1f] hover:text-white transition-colors duration-200"
        >
          General Reading
        </Link>
        <Link
          to={`/${planType}/academic_reading`}
          className="block px-4 py-2 text-gray-700 hover:bg-[#d56e1f] hover:text-white transition-colors duration-200"
        >
          Academic Reading
        </Link>
        <Link
          to={`/${planType}/listening`}
          className="block px-4 py-2 text-gray-700 hover:bg-[#d56e1f] hover:text-white transition-colors duration-200"
        >
          Listening
        </Link>
      </div>
    </div>
  );

  return (
    <>
      <div className="relative overflow-hidden">
        {/* Background gradient and blobs */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#cc0d09] via-[#d56e1f] to-[#8B4513] opacity-90" />
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#cc0d09] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#d56e1f] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-64 h-64 bg-[#8B4513] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />

        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 py-32 sm:py-36 sm:px-6 lg:px-8">
            <div className="text-center">
              {/* Hero content */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8 font-playfair">
                Your IELTS Journey Starts Here
              </h1>
              <p className="max-w-2xl mx-auto text-xl text-orange-50 font-inter mb-12">
                Join thousands of successful students who achieved their target
                IELTS scores with our expert-designed practice materials.
              </p>

              {/* Feature cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
                <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 transform hover:scale-105 transition-transform duration-300 border border-orange-200/20">
                  <BookOpen className="w-12 h-12 text-orange-100 mx-auto mb-4" />
                  <h3 className="text-white text-xl font-semibold mb-2">
                    Complete Practice Tests
                  </h3>
                  <p className="text-orange-50 text-sm">
                    Practice with full-length tests that mirror the real IELTS
                    exam
                  </p>
                </div>

                <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 transform hover:scale-105 transition-transform duration-300 border border-orange-200/20">
                  <Target className="w-12 h-12 text-orange-100 mx-auto mb-4" />
                  <h3 className="text-white text-xl font-semibold mb-2">
                    Section-Wise Practice
                  </h3>
                  <p className="text-orange-50 text-sm">
                    Focus on Reading, Writing, Listening, or Speaking modules
                  </p>
                </div>

                <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 transform hover:scale-105 transition-transform duration-300 border border-orange-200/20">
                  <Award className="w-12 h-12 text-orange-100 mx-auto mb-4" />
                  <h3 className="text-white text-xl font-semibold mb-2">
                    Detailed Solutions
                  </h3>
                  <p className="text-orange-50 text-sm">
                    Get comprehensive explanations and expert tips for
                    improvement
                  </p>
                </div>
              </div>

              {/* Navigation section */}
              <div className="max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold text-white mb-4 font-playfair">
                  Practice Here
                </h2>
                <div className="flex justify-center gap-6">
                  <div className="relative" ref={freeDropdownRef}>
                    <button
                      onClick={() => {
                        setFreeDropdownOpen(!freeDropdownOpen);
                        setPaidDropdownOpen(false);
                      }}
                      className="px-8 py-3 bg-white text-[#cc0d09] rounded-full font-semibold hover:bg-orange-50 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
                    >
                      Free Tests
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-200 ${
                          freeDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {freeDropdownOpen && (
                      <DropdownMenu planType="free" isOpen={freeDropdownOpen} />
                    )}
                  </div>

                  <div className="relative" ref={paidDropdownRef}>
                    <button
                      onClick={() => {
                        setPaidDropdownOpen(!paidDropdownOpen);
                        setFreeDropdownOpen(false);
                      }}
                      className="px-8 py-3 bg-[#cc0d09] text-white rounded-full font-semibold hover:bg-[#d56e1f] transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
                    >
                      Premium Tests
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-200 ${
                          paidDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {paidDropdownOpen && (
                      <DropdownMenu planType="paid" isOpen={paidDropdownOpen} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Outlet for nested routes */}

      <Outlet />
    </>
  );
};

export default Hero;
