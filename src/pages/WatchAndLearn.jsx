import { useState, useEffect } from "react";

const WatchAndLearn = () => {
  const [activeTab, setActiveTab] = useState("videos");
  const [isVisible, setIsVisible] = useState(false);
  const [selectedEssay, setSelectedEssay] = useState(null);

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
          0% { transform: translate(calc(-50% + ${x1}px), calc(-50% + ${y1}px)) rotate(${
        Math.random() * 360
      }deg); }
          50% { transform: translate(calc(-50% + ${x2}px), calc(-50% + ${y2}px)) rotate(${
        Math.random() * 360
      }deg); }
          100% { transform: translate(calc(-50% + ${x1}px), calc(-50% + ${y1}px)) rotate(${
        Math.random() * 360
      }deg); }
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
      title: "IELTS || Essential Tips for Success!",
      description: "Learn the fundamentals of scoring high in the IELTS exam",
      videoId: "XZkDb4rLSp0",
    },
    {
      id: 2,
      title: "Mastering Speaking Skills",
      description:
        "Essential tips and techniques for Ielts Speaking excellence",
      videoId: "3aBQYrkKZUE",
    },
    {
      id: 3,
      title: "Mastering Ielts Writing",
      description: "Learn the essentials of Ielts Writing and score high",
      videoId: "UAVsXoCnZMc",
    },
    {
      id: 4,
      title: "A FREE listening test",
      description: "Practice your listening skills with this free test",
      videoId: "nx8req42cj8",
    },
  ];

  const essays = [
    {
      id: 1,
      title: "IELTS Bar Chart Sample Answer",
      content:
        "he chart illustrates the amount of money spent on five consumer goods (cars, computers, books, perfume and cameras) in France and the UK in 2010. Units are measured in pounds sterling.Overall, the UK spent more money on consumer goods than France in the period gi...",
      fullContent: `The chart illustrates the amount of money spent on five consumer goods (cars, computers, books, perfume and cameras) in France and the UK in 2010. Units are measured in pounds sterling.<br/><br/>

Overall, the UK spent more money on consumer goods than France in the period given. Both the British and the French spent most of their money on cars whereas the least amount of money was spent on perfume in the UK compared to cameras in France. Furthermore, the most significant difference in expenditure between the two countries was on cameras.<br/><br/>

In terms of cars, people in the UK spent about £450,000 on this as opposed to the French at £400,000. Similarly, the British expenditure was higher on books than the French (around £400,000 and £300,000 respectively). In the UK, expenditure on cameras (just over £350,000) was over double that of France, which was only £150,000.<br/>

<br/>On the other hand, the amount of money paid out on the remaining goods was higher in France. Above £350,000 was spent by the French on computers which was slightly more than the British who spent exactly £350,000. Neither of the countries spent much on perfume which accounted for £200,000 of expenditure in France but under £150,000 in the UK.`,
      image: "/essay-1.png",
    },
    {
      id: 2,
      title: "IELTS Table Model Answer 2",
      content:
        "The table illustrates the proportion of consumer expenditure in Ireland, Italy, Spain, Sweden and Turkey on three types of consumer goods in 200...",
      fullContent: `The table illustrates the proportion of consumer expenditure in Ireland, Italy, Spain, Sweden and Turkey on three types of consumer goods in 2002.<br/><br/>

Overall, the category of consumer goods that all countries spent most on was food, drinks and tobacco, which was three times higher than on the other types of goods. The lowest spending could be seen in the category of leisure and education in all five countries. The outlay of Turkey was generally higher than the other four countries.<br/><br/>

In terms of food, drinks and tobacco, Turkey spent the most at 32.14%. The expenditure of Ireland was also high (28.91%) compared to Sweden which spent the least (15.77%). Spain and Italy spent 18.80% and 16.36% respectively. On the other hand, the lowest expenditure was on leisure and education which accounted for under 5% in all countries. Turkey spent most on these items at just 4.35% of their national expenditure which is around double that of Spain (1.98%).<br/><br/>

Clothing and footwear was the third category of consumer goods and outlays for those items were between 9% in Italy and 5.40% in Sweden.  The national spending in this area for the remaining countries averaged around 6.5%.`,
      image: "/essay-2.png",
    },
    {
      id: 3,
      title: "Pie Chart Sample Answer",
      content:
        "The two pie charts illustrate the proportion of five sources of energy production (co...",
      fullContent: `The two pie charts illustrate the proportion of five sources of energy production (coal, gas, nuclear, petrol and other sources) in France in two years (1995 and 2005). <br/><br/>

Overall, in both years coal and gas accounted for over half of all energy production, while the least was other energy sources. There was only a very minimal increase in production from gas and coal, whereas nuclear and other sources almost doubled. Petrol was the only energy source to decrease over the period.<br/><br/>

Energy produced by coal comprised of 29.80% in 1995 and by 2005, it increased by about 1% to 30.9%. Likewise, the amount of energy generated by gas went up by approximately 1% from 29.63% in the first year to 30.1% by the final year. The use of nuclear power rose significantly from 6.40% in 1995 to 10.10% in 2005. Other sources of energy production accounted for 4.90% but then climbed to 9.10%.<br/><br/>

Petrol, on the other hand, produced 29.27% of all energy in 1995 but 10 years later only 19.55% of energy came from this source. `,
      image: "/essay-3.png",
    },
  ];

  const handleBackToEssays = () => {
    setSelectedEssay(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
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
                  transform: `translate(-50%, -50%) rotate(${
                    Math.random() * 360
                  }deg)`,
                  border: "2px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: Math.random() > 0.5 ? "50%" : "0%",
                  animation: `float-${i} ${
                    Math.random() * 20 + 10
                  }s infinite ease-in-out`,
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0))",
                    transform: `rotate(${Math.random() * 360}deg)`,
                    animation: `pulse-${i} ${
                      Math.random() * 4 + 2
                    }s infinite ease-in-out alternate`,
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div
            className={`py-20 text-center transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
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
              Access our comprehensive collection of educational videos and
              sample essays to enhance your academic writing skills.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Navigation Tabs - Only show when no essay is selected */}
        {!selectedEssay && (
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
        )}

        {/* Content */}
        {!selectedEssay ? (
          <>
            {activeTab === "videos" ? (
              <div className="space-y-16">
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
                          className="w-full h-full rounded-lg shadow-lg video-container"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>
                    <div className="w-full md:w-1/2 text-center md:text-left">
                      <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        {video.title}
                      </h2>
                      <p className="text-gray-600 mb-6">{video.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {essays.map((essay) => (
                  <div
                    key={essay.id}
                    className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
                  >
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      {essay.title}
                    </h3>
                    <p className="text-gray-600 mb-6">{essay.content}</p>
                    <button
                      onClick={() => setSelectedEssay(essay)}
                      className="text-[#d56e1f] font-medium hover:text-[#cc0d09] transition-colors"
                    >
                      Read More →
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          // Full Essay View
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <button
              onClick={handleBackToEssays}
              className="text-blue-500 hover:underline mb-6 flex items-center"
            >
              ← Back to Essays
            </button>

            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              {selectedEssay.title}
            </h1>

            <div className="mb-8">
              <img
                src={selectedEssay.image}
                alt={selectedEssay.title}
                className="w-full rounded-lg shadow-md"
              />
            </div>

            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: selectedEssay.fullContent }}
            >
              {/* <p>{selectedEssay.fullContent}</p> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchAndLearn;
