import { useLocation, useNavigate } from "react-router-dom";
import '../tests.css';
// import { useState, useEffect } from "react";
import QuestionSection from "@/components/QuestionSection";
const TestPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { test, questions, type, title } = location.state || {};

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

  // Listening test layout
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
            <div className="h-full rounded-xl bg-white shadow-lg p-2">
              <QuestionSection formIframeHtml={questions} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Reading test layout - using split screen approach
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
        <div >
          <div className="w:2/3  p-4 relative">
            {/* <div className="rounded-xl bg-white shadow-lg p-2"> */}
              <QuestionSection formIframeHtml={questions} />
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
