import { useState, useEffect } from "react";

const WatchAndLearn = () => {
  const [activeTab, setActiveTab] = useState("videos");
  const [isVisible, setIsVisible] = useState(false);

  // Generate unique animation keyframes for floating elements
  const generateKeyframes = () => {
    let styles = "";
    for (let i = 0; i < 12; i++) {
      const x1 = Math.random() * 20 - 10;
      const y1 = Math.random() * 20 - 10;
      const x2 = Math.random() * 20 - 10;
      const y2 = Math.random() * 20 - 10;

      styles += `
        @keyframes float-${i} {
          0% { transform: translate(calc(-50% + ${x1}px), calc(-50% + ${y1}px)) rotate(${Math.random() * 360}deg); }
          50% { transform: translate(calc(-50% + ${x2}px), calc(-50% + ${y2}px)) rotate(${Math.random() * 360}deg); }
          100% { transform: translate(calc(-50% + ${x1}px), calc(-50% + ${y1}px)) rotate(${Math.random() * 360}deg); }
        }
        
        @keyframes pulse-${i} {
          0% { opacity: ${0.1 + Math.random() * 0.2}; }
          100% { opacity: ${0.2 + Math.random() * 0.3}; }
        }
      `;
    }
    return styles;
  };

  useEffect(() => {
    setIsVisible(true);
    
    // Add keyframes to document
    const style = document.createElement("style");
    style.textContent = generateKeyframes();
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const videos = [
    {
      id: 1,
      title: "Understanding Essay Structure",
      description: "Learn the fundamentals of structuring your academic essays effectively",
      videoId: "XZkDb4rLSp0",
    },
    {
      id: 2,
      title: "Mastering Academic Writing",
      description: "Essential tips and techniques for academic writing excellence",
      videoId: "XZkDb4rLSp0",
    },
    {
      id: 3,
      title: "Research Paper Guidelines",
      description: "Step-by-step guide to writing outstanding research papers",
      videoId: "XZkDb4rLSp0",
    },
    {
      id: 4,
      title: "Citation and Referencing",
      description: "Learn proper citation methods and reference formatting",
      videoId: "XZkDb4rLSp0",
    },
  ];

  const essays = [
    {
      id: 1,
      title: "The Impact of Technology on Modern Education",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      id: 2,
      title: "Environmental Sustainability in the 21st Century",
      content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      id: 3,
      title: "The Role of Artificial Intelligence in Healthcare",
      content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <style jsx>{`
        @keyframes gradientBorder {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .nav-button {
          position: relative;
          z-index: 1;
        }

        .nav-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 9999px;
          padding: 2px;
          background: linear-gradient(
            to right,
            #cc0d09,
            #d56e1f,
            #8B4513,
            #cc0d09
          );
          -webkit-mask: 
            linear-gradient(#fff 0 0) content-box, 
            linear-gradient(#fff 0 0);
          mask: 
            linear-gradient(#fff 0 0) content-box, 
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          background-size: 300% 300%;
          animation: gradientBorder 8s linear infinite;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .nav-button:hover::before {
          opacity: 1;
        }

        .nav-button.active::before {
          opacity: 0;
        }
      `}</style>

      {/* Hero Section - Full Width */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#cc0d09] via-[#d56e1f] to-[#8B4513] min-h-[50vh] w-full">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/10"></div>
          {/* Animated geometric patterns */}
          <div className="absolute inset-0">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  width: Math.random() * 200 + 100 + "px",
                  height: Math.random() * 200 + 100 + "px",
                  left: Math.random() * 100 + "%",
                  top: Math.random() * 100 + "%",
                  transform: `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`,
                  border: "2px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: Math.random() > 0.5 ? "50%" : "0%",
                  animation: `float-${i} ${Math.random() * 20 + 10}s infinite ease-in-out`,
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0))",
                    transform: `rotate(${Math.random() * 360}deg)`,
                    animation: `pulse-${i} ${Math.random() * 4 + 2}s infinite ease-in-out alternate`,
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className={`py-20 text-center transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            <div className="relative inline-block">
              <h1 className="text-6xl font-bold text-white mb-6">
                Free Learning
                <span className="block mt-2 text-7xl bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  Resources
                </span>
              </h1>
              <div className="absolute -left-4 -top-4 w-20 h-20 border-2 border-white/20 rounded-lg transform rotate-12"></div>
              <div className="absolute -right-4 -bottom-4 w-20 h-20 border-2 border-white/20 rounded-lg transform -rotate-12"></div>
            </div>
            <p className="text-white/90 text-xl max-w-2xl mx-auto mt-6">
              Access our comprehensive collection of educational videos and sample essays to enhance your academic writing skills.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12">
          <div className="relative group p-1 rounded-full">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#cc0d09] via-[#d56e1f] to-[#8B4513] rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
            <div className="relative flex space-x-4 bg-white rounded-full shadow-md p-1">
              <button
                onClick={() => setActiveTab("videos")}
                className={`nav-button px-8 py-3 rounded-full transition-all ${
                  activeTab === "videos"
                    ? "bg-gradient-to-r from-[#cc0d09] via-[#d56e1f] to-[#8B4513] text-white active"
                    : "text-gray-600 hover:text-[#d56e1f]"
                }`}
              >
                Videos
              </button>
              <button
                onClick={() => setActiveTab("essays")}
                className={`nav-button px-8 py-3 rounded-full transition-all ${
                  activeTab === "essays"
                    ? "bg-gradient-to-r from-[#cc0d09] via-[#d56e1f] to-[#8B4513] text-white active"
                    : "text-gray-600 hover:text-[#d56e1f]"
                }`}
              >
                Essays
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        {activeTab === "videos" ? (
          <div className="space-y-24">
            {videos.map((video, index) => (
              <div
                key={video.id}
                className={`flex flex-col ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-center gap-8 md:gap-16`}
              >
                <div className="w-full md:w-1/2 relative">
                  <div className="aspect-video w-full">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.videoId}`}
                      title={video.title}
                      className="w-full h-full rounded-lg shadow-lg"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2 text-center md:text-left">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">{video.title}</h2>
                  <p className="text-gray-600 mb-6">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {essays.map((essay) => (
              <div key={essay.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold text-gray-800 mb-4">{essay.title}</h3>
                <p className="text-gray-600 mb-6">{essay.content}</p>
                <button className="text-[#d56e1f] font-medium hover:text-[#cc0d09] transition-colors">
                  Read More →
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchAndLearn;