import { useState, useEffect } from "react";
import { Users, GraduationCap, Star, Trophy, ChevronDown } from "lucide-react";

const AboutUs = () => {
  const [counts, setCounts] = useState({
    students: 0,
    success: 0,
    experience: 0,
    satisfaction: 0,
  });

  const [isVisible, setIsVisible] = useState(false);
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  const accordionData = [
    {
      title: "What is the IELTS Test?",
      content:
        "IELTS = International English Language Testing System. It is the biggest English language test in the world with test centers in almost all countries. It is an international English test, which accepts international English, not just British English. It is taken by most people for their professional work, academic studies or moving to an English speaking country. The test can be taken on paper or on a computer. It is the same test regardless of whether you write your answers on paper or computer.",
    },
    {
      title: "About IELTS Listening Test",
      content:
        "This listening test comes in 4 sections with 40 questions. Section 1 & section 2 are based on social topics and section 3 & 4 are academic in nature. There are many different types of questions and you must prepare techniques for each type. The recording is played for 30 mins, there is then time to transfer or check answers (see the listening page for details). All candidates take the same listening test.",
    },
    {
      title: "About IELTS Reading Test",
      content:
        "This test has 3 passages with 40 questions. Academic reading contains academic style passages. GT reading contains everyday or work related topics and passage 3 is similar to academic reading. There are 14 types of questions, which are the same for both tests, and you must practice them all for familiarity and strategy. All reading practice lessons on this website are for both Academic & GT candidates. The reading test lasts 1 hour.",
    },
    {
      title: "About IELTS Writing Test",
      content:
        "There are two tasks. Task 1 is a report based on a chart, graph table etc. For GT IELTS candidates, task 1 is a letter. Writing task 2 is the same for both tests – a formal essay. There are five different essay types to prepare for. Essays are topic based so you must prepare ideas and vocabulary for topics. You must understand the marking criteria for success because it is not entirely based on your English language. See band scores below. The writing test is 1 hour.",
    },
    {
      title: "About IELTS Speaking Test",
      content:
        "This is a face to face, informal speaking test with the examiner either in a room or through video call. It lasts for 11 – 14 mins and has 3 parts. Part 1 and 3 are question/answers. Part 2 is a talk that you give for 2 mins with 1 min preparation. Topics are crucial for your speaking test preparation because it is a topic based test. Topic relevant vocabulary is vital. All candidates take the same test. You must understand the marking criteria.",
    },
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

    // Load Elfsight script
    const loadElfsightScript = () => {
      const script = document.createElement("script");
      script.src = "https://static.elfsight.com/platform/platform.js";
      script.defer = true;
      script.setAttribute("data-use-service-core", "");
      document.body.appendChild(script);

      return () => {
        // Clean up script when component unmounts
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    };

    const cleanup = loadElfsightScript();

    return () => {
      clearInterval(timer);
      cleanup();
    };
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#cc0d09] via-[#d56e1f] to-[#8B4513]">
        {/* Hero content remains the same */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-white/10 rounded-full"
                style={{
                  width: Math.random() * 300 + 50 + "px",
                  height: Math.random() * 300 + 50 + "px",
                  left: Math.random() * 100 + "%",
                  top: Math.random() * 100 + "%",
                  transform: `translate(-50%, -50%) scale(${
                    Math.random() * 0.5 + 0.5
                  })`,
                  opacity: Math.random() * 0.5,
                  animation: `float ${
                    Math.random() * 10 + 10
                  }s infinite ease-in-out`,
                }}
              ></div>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 relative">
          <div
            className={`py-16 flex flex-col md:flex-row items-center gap-8 transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="md:w-1/2 relative z-10">
              <div className="relative">
                <h2 className="text-4xl font-bold mb-6 text-white">
                  Your Journey to
                  <span className="block mt-2 text-5xl bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                    IELTS Success
                  </span>
                </h2>
                <div className="absolute -left-4 -top-4 w-16 h-16 border-2 border-white/20 rounded-lg transform rotate-12"></div>
                <div className="absolute -right-4 -bottom-4 w-16 h-16 border-2 border-white/20 rounded-lg transform -rotate-12"></div>
              </div>
              <div className="mt-4 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <p className="text-white/90 leading-relaxed text-base italic">
                  &quot;I have been teaching English since 2013. My formal
                  experience with IELTS training starts from 2017. I have
                  trained hundreds of students and worked with companies like
                  Hindustan Times Learning Centers, English by Experts.&quot;
                </p>
                <p className="text-white font-semibold mt-2 text-right">
                  - MEENU NARULA
                </p>
              </div>
              <div className="mt-6 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <p className="text-white text-lg font-bold">
                  We&apos;ve helped{" "}
                  <span className="text-2xl text-white">2400+ people</span>{" "}
                  score <span className="text-2xl text-white">8+ bands</span>
                </p>
              </div>
            </div>
            <div className="md:w-1/2 relative z-10">
              <div className="relative max-w-md mx-auto">
                <div className="absolute -inset-3 bg-white/10 rounded-lg backdrop-blur-sm"></div>
                <img
                  src="/meenu-narula.webp"
                  alt="IELTS Training"
                  className="relative rounded-lg shadow-xl w-full transform hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute -right-4 -bottom-4 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <div className="text-white/90 text-xs">Experience</div>
                  <div className="text-white font-bold text-xl">
                    {counts.experience}+ Years
                  </div>
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
            {
              icon: Users,
              count: counts.students,
              label: "Students Trained",
              suffix: "+",
            },
            {
              icon: Trophy,
              count: counts.success,
              label: "Success Rate",
              suffix: "%",
            },
            {
              icon: GraduationCap,
              count: counts.experience,
              label: "Years Experience",
              suffix: "+",
            },
            {
              icon: Star,
              count: counts.satisfaction,
              label: "Student Satisfaction",
              suffix: "%",
            },
          ].map((stat, index) => (
            <div key={index} className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#cc0d09] via-[#d56e1f] to-[#8B4513] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
              <div className="relative p-8 bg-white rounded-lg shadow-lg transform hover:-translate-y-2 transition-all duration-300">
                <stat.icon className="w-12 h-12 mx-auto mb-4 text-[#d56e1f]" />
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {stat.count}
                  {stat.suffix}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* IELTS Test Information Accordion Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-[#cc0d09] via-[#d56e1f] to-[#8B4513] bg-clip-text text-transparent">
            IELTS Test Information
          </h2>
          <div className="space-y-4">
            {accordionData.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <button
                  className="w-full p-4 text-left bg-white hover:bg-gray-50 flex justify-between items-center"
                  onClick={() => toggleSection(index)}
                >
                  <h3 className="font-bold text-lg text-gray-800">
                    {item.title}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                      openSection === index ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`px-4 overflow-hidden transition-all duration-300 ${
                    openSection === index ? "max-h-96 py-4" : "max-h-0 py-0"
                  }`}
                >
                  <p className="text-gray-600">{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Elfsight Google Reviews Widget Section */}
      <section id="success-stories" className="py-16 max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-[#cc0d09] via-[#d56e1f] to-[#8B4513] bg-clip-text text-transparent">
          Success Stories
        </h2>
        <div className="elfsight-app-d1308ecc-ede2-4180-a34d-7a3b82f32886"></div>
      </section>
        {/* Elfsight Widget Container */}
    </div>
  );
};

export default AboutUs;
