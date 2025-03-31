import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import QuestionSection from "@/components/QuestionSection";

const TestPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { test, questions, answers, type, title } = location.state || {};
  const [showAnswers, setShowAnswers] = useState(false);
  
  console.log("TestPage location state:", location.state);
  console.log("TestPage test:", test);  
  console.log("TestPage questions:", questions);
  console.log("TestPage answers:", answers);
  console.log("TestPage type:", type);
  
  useEffect(() => {
    if (type === "listening") {
      // Add a style tag to hide the specific submit button
      const style = document.createElement("style");
      style.textContent = `
        .qsm-btn.qsm-submit-btn.qmn_btn {
          display: none !important;
        }
      `;
      document.head.appendChild(style);

      // Clean up when component unmounts
      return () => {
        document.head.removeChild(style);
      };
    }
  }, [type]);

  // Toggle answer modal visibility
  const toggleAnswers = () => {
    setShowAnswers(!showAnswers);
  };

  if (!test || !questions) {
    return (
      <div className="text-center p-4">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-500 hover:underline"
        >
          ← Go back
        </button>
        <p className="mt-4">Test not found</p>
      </div>
    );
  }

  // Render answer content based on the data type
  const renderAnswerContent = () => {
    if (!answers) {
      return <p className="text-center py-8 text-gray-500">No answers available for this test.</p>;
    }

    // If answers is an object/map (from Firebase)
    if (typeof answers === 'object' && answers !== null) {
      return (
        <div className="space-y-4">
          {Object.entries(answers).map(([key, value], index) => (
            <div key={index} className="border-b pb-4">
              <div className="font-semibold text-gray-700 mb-2">Question {key.replace('_', ' ')}:</div>
              <div className="ml-4">
                {typeof value === 'string' ? (
                  // If the value is a simple string
                  <span>{value}</span>
                ) : typeof value === 'object' ? (
                  // If the value is another nested object/map
                  <ul className="list-disc ml-4">
                    {Object.entries(value).map(([subKey, subValue], subIndex) => (
                      <li key={subIndex}>
                        <span className="font-medium">{subKey}:</span> {subValue}
                      </li>
                    ))}
                  </ul>
                ) : (
                  // Fallback for other types
                  <span>{String(value)}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      );
    }

    // If answers is a string with HTML (same as test and questions)
    if (typeof answers === 'string') {
      return <div dangerouslySetInnerHTML={{ __html: answers }} />;
    }

    // Fallback
    return <pre className="text-sm overflow-auto">{JSON.stringify(answers, null, 2)}</pre>;
  };

  // Answer Modal Component
  const AnswerModal = () => {
    if (!showAnswers) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-auto">
          <div className="sticky top-0 bg-white z-10 border-b border-gray-200">
            <div className="flex justify-between items-center p-6">
              <h2 className="text-xl font-bold">Answers for {title}</h2>
              <button 
                onClick={toggleAnswers}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          <div className="p-6">
            {renderAnswerContent()}
          </div>
        </div>
      </div>
    );
  };

  // Show Answer Button
  const AnswerButton = () => (
    <button
      onClick={toggleAnswers}
      className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg flex items-center"
    >
      <span className="mr-1">Show Answers</span>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
      </svg>
    </button>
  );

  // Listening test layout - use direct HTML display
  if (type === "listening") {
    return (
      <div className="container mx-auto p-4 bg-gradient-to-r from-gray-50 to-gray-100 min-h-screen">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-500 hover:underline mb-6"
        >
          ← Go back
        </button>
        <h1 className="text-3xl font-bold mb-6 text-center">{title}</h1>

        <div className="w-full">
          <div className="audio-player-container mb-6">
            <audio controls className="w-full">
              <source src={test} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
          <div className="w-full p-4 relative">
            <div className="h-full rounded-xl bg-white shadow-lg p-6 overflow-auto max-h-[600px]">
              {/* Direct HTML display for listening section */}
              <div dangerouslySetInnerHTML={{ __html: questions }} />
            </div>
          </div>
        </div>
        
        {/* Show answer button and modal */}
        <AnswerButton />
        <AnswerModal />
      </div>
    );
  }

  // Reading test layout - using split screen approach with iframe
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="container mx-auto p-4">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-500 hover:underline mb-6"
        >
          ← Go back
        </button>
        <h1 className="text-3xl font-bold mb-6 text-center">{title}</h1>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Left side - Reading content */}
        <div className="lg:w-1/2 p-4">
          <div
            className="bg-white rounded-xl shadow-lg p-6 overflow-auto max-h-[800px]"
            dangerouslySetInnerHTML={{ __html: test }}
          />
        </div>

        {/* Right side - Form section */}
        <div className="lg:w-1/2 p-4 relative">
          <div className="rounded-xl bg-white shadow-lg p-2">
            <QuestionSection formIframeHtml={questions} />
          </div>
        </div>
      </div>
      
      {/* Show answer button and modal */}
      {/* <AnswerButton />
      <AnswerModal /> */}
    </div>
  );
};

export default TestPage;