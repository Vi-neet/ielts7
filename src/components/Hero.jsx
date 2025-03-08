import { BookOpen, Target, Award } from "lucide-react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Hero = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect to /general_reading by default if at root
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/general_reading");
    }
  }, [location.pathname, navigate]);

  const isActive = (path) => {
    return location.pathname === path;
  };

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

              {/* Navigation section with heading and links */}
              <div className="max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold text-white mb-6 font-playfair">
                  Free Practice Tests
                </h2>
                
                {/* Navigation links now inside the hero section */}
                <div className="flex justify-center items-center mb-8">
                  <div className="inline-flex bg-white rounded-lg p-1 shadow-md">
                    <Link
                      to="/general_reading"
                      className={`px-6 py-3 rounded-md font-medium transition-colors duration-200 ${
                        isActive("/general_reading")
                          ? "bg-[#d56e1f] text-white shadow-sm"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      General Reading
                    </Link>
                    <Link
                      to="/academic_reading"
                      className={`px-6 py-3 rounded-md font-medium transition-colors duration-200 ${
                        isActive("/academic_reading")
                          ? "bg-[#d56e1f] text-white shadow-sm"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      Academic Reading
                    </Link>
                    <Link
                      to="/listening"
                      className={`px-6 py-3 rounded-md font-medium transition-colors duration-200 ${
                        isActive("/listening")
                          ? "bg-[#d56e1f] text-white shadow-sm"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      Listening
                    </Link>
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