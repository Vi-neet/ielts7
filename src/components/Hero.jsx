import { BookOpen, Target, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Previous gradient and blob code remains the same */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#cc0d09] via-[#d56e1f] to-[#8B4513] opacity-90" />
      
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#cc0d09] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#d56e1f] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-64 h-64 bg-[#8B4513] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />

      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8 font-playfair">
              Your IELTS Journey Starts Here
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-orange-50 font-inter mb-12">
              Join thousands of successful students who achieved their target IELTS scores with our expert-designed practice materials.
            </p>
            
            {/* Feature cards section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
              {/* Previous cards code remains the same */}
              <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 transform hover:scale-105 transition-transform duration-300 border border-orange-200/20">
                <BookOpen className="w-12 h-12 text-orange-100 mx-auto mb-4" />
                <h3 className="text-white text-xl font-semibold mb-2">
                  Complete Practice Tests
                </h3>
                <p className="text-orange-50 text-sm">
                  Practice with full-length tests that mirror the real IELTS exam
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
                  Get comprehensive explanations and expert tips for improvement
                </p>
              </div>
            </div>

            {/* Practice section */}
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8 font-playfair">Practice Here</h2>
              <div className="flex justify-center gap-6">
                <Link
                  to="/free"
                  className="px-8 py-3 bg-white text-[#cc0d09] rounded-full font-semibold hover:bg-orange-50 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Free Tests
                </Link>
                <Link
                  to="/paid"
                  className="px-8 py-3 bg-[#cc0d09] text-white rounded-full font-semibold hover:bg-[#d56e1f] transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Premium Tests
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;