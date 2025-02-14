import { useState, useEffect } from "react";
import { Users, GraduationCap, Star, Trophy, ChevronLeft, ChevronRight } from "lucide-react";

const AboutUs = () => {
  const [counts, setCounts] = useState({
    students: 0,
    success: 0,
    experience: 0,
    satisfaction: 0,
  });

  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const testimonials = [
    { name: "Majot Singh", text: "I had an amazing experience with them, they helped me get Canadian visitor's visa for my family. I literally didn't have to manage all the stuff required for visa procedure, they handled all the things efficiently and got me the visa for my parents. I recommend others to get their visa work done from them." },
    { name: "Shreya Gupta", text: "Getting my desired band score in the first attempt seemed like an impossible task but ma'am made it possible for me. I'll always be grateful for her unwavering support and guidance." },
    { name: "Jaskaran Singh", text: "I am thrilled to share that I achieved a remarkable score in my IELTS exam, and I owe a significant part of this success to Meenu Ma'am. Her exceptional teaching skills, personalised guidance, and unwavering support played a pivotal role in my achievement." },
    { name: "Mandeep Singh", text: "It was a good teaching experience and kind of one on one session with mam. By simply following mam's instructions i have scored overall band score of 7.5 in my first attempt." },
    { name: "KRITIKA SAWHNEY", text: "Thank you IELTS 7+ house for your guidance and help throughout the visitor visa process for my sister. It was re application after she got refusal Meenu Ma'ams guidance and confidence during the entire process made it dream come true for me and my family." },
    { name: "Harpreet Kaur", text: "Thank you meenu mam for your guidance, support and interactive speaking sessions. With your continuous push towards smart learning helps me alot today in giving my speaking exam." }
  ];

  useEffect(() => {
    setIsVisible(true);
    const targetCounts = {
      students: 7000,
      success: 95,
      experience: 10,
      satisfaction: 98,
    };

    const duration = 2000;
    const steps = 50;
    const interval = duration / steps;

    const incrementCounts = (step) => {
      setCounts({
        students: Math.floor((targetCounts.students / steps) * step),
        success: Math.floor((targetCounts.success / steps) * step),
        experience: Math.floor((targetCounts.experience / steps) * step),
        satisfaction: Math.floor((targetCounts.satisfaction / steps) * step),
      });
    };

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      if (currentStep <= steps) {
        incrementCounts(currentStep);
      } else {
        clearInterval(timer);
        setCounts(targetCounts);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // This function returns the indexes of previous, current, and next slides
  const getSlideIndexes = () => {
    return [
      (activeIndex - 1 + testimonials.length) % testimonials.length,
      activeIndex,
      (activeIndex + 1) % testimonials.length,
    ];
  };
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#cc0d09] via-[#d56e1f] to-[#8B4513]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-white/10 rounded-full"
                style={{
                  width: Math.random() * 300 + 50 + 'px',
                  height: Math.random() * 300 + 50 + 'px',
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%',
                  transform: `translate(-50%, -50%) scale(${Math.random() * 0.5 + 0.5})`,
                  opacity: Math.random() * 0.5,
                  animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out`
                }}
              ></div>
            ))}
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className={`py-20 flex flex-col md:flex-row items-center gap-12 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="md:w-1/2 relative z-10">
              <div className="relative">
                <h2 className="text-5xl font-bold mb-6 text-white">
                  Your Journey to
                  <span className="block mt-2 text-6xl bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                    IELTS Success
                  </span>
                </h2>
                <div className="absolute -left-4 -top-4 w-20 h-20 border-2 border-white/20 rounded-lg transform rotate-12"></div>
                <div className="absolute -right-4 -bottom-4 w-20 h-20 border-2 border-white/20 rounded-lg transform -rotate-12"></div>
              </div>
              <p className="text-white/90 leading-relaxed text-lg mt-8">
                At IELTS 7+ House, we transform aspirations into achievements. Our journey began with a simple mission: to make Band 7+ not just a goal, but a reality for every student who walks through our doors.
              </p>
              <div className="mt-8 flex gap-4">
                <button className="px-6 py-3 bg-white text-[#cc0d09] rounded-lg font-semibold hover:bg-white/90 transition-colors">
                  Start Your Journey
                </button>
                <button className="px-6 py-3 border-2 border-white/30 text-white rounded-lg font-semibold hover:bg-white/10 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
            <div className="md:w-1/2 relative z-10">
              <div className="relative">
                <div className="absolute -inset-4 bg-white/10 rounded-lg backdrop-blur-sm"></div>
                <img
                  src="/meenu-narula.webp"
                  alt="IELTS Training"
                  className="relative rounded-lg shadow-xl w-full transform hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute -right-6 -bottom-6 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-white/90 text-sm">Experience</div>
                  <div className="text-white font-bold text-2xl">{counts.experience}+ Years</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Users, count: counts.students, label: "Students Trained", suffix: "+" },
            { icon: Trophy, count: counts.success, label: "Success Rate", suffix: "%" },
            { icon: GraduationCap, count: counts.experience, label: "Years Experience", suffix: "+" },
            { icon: Star, count: counts.satisfaction, label: "Student Satisfaction", suffix: "%" }
          ].map((stat, index) => (
            <div key={index} className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#cc0d09] via-[#d56e1f] to-[#8B4513] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
              <div className="relative p-8 bg-white rounded-lg shadow-lg transform hover:-translate-y-2 transition-all duration-300">
                <stat.icon className="w-12 h-12 mx-auto mb-4 text-[#d56e1f]" />
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {stat.count}{stat.suffix}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 overflow-hidden">
    <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-[#cc0d09] via-[#d56e1f] to-[#8B4513] bg-clip-text text-transparent">
      Success Stories
    </h2>
    <div className="relative">
      <div className="flex justify-center items-stretch gap-8 min-h-[300px]">
        {getSlideIndexes().map((index, position) => (
          <div
            key={`${index}-${position}`}
            className={`w-full md:w-1/3 transition-all duration-500 ease-out absolute left-1/2 ${
              position === 0 
                ? '-translate-x-[150%] scale-95 opacity-50 blur-sm'
                : position === 1
                ? '-translate-x-1/2 scale-100 opacity-100 z-20'
                : 'translate-x-[50%] scale-95 opacity-50 blur-sm'
            }`}
          >
            <div className="relative group h-full">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#cc0d09] via-[#d56e1f] to-[#8B4513] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
              <div className="relative p-6 bg-white rounded-lg shadow-lg h-full flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="flex text-[#d56e1f]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-4 flex-grow">{testimonials[index].text}</p>
                <div className="font-medium text-[#8B4513]">{testimonials[index].name}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button
        onClick={prevSlide}
        disabled={isAnimating}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors disabled:opacity-50 z-30"
      >
        <ChevronLeft className="w-6 h-6 text-[#d56e1f]" />
      </button>
      <button
        onClick={nextSlide}
        disabled={isAnimating}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors disabled:opacity-50 z-30"
      >
        <ChevronRight className="w-6 h-6 text-[#d56e1f]" />
      </button>

      {/* Navigation Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true);
                setActiveIndex(index);
                setTimeout(() => setIsAnimating(false), 500);
              }
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? 'bg-[#d56e1f] w-4'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  </section>
    </div>
  );
};

export default AboutUs;