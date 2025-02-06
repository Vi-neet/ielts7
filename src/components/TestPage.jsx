import { useLocation, useNavigate } from "react-router-dom";
import  {useState, useEffect, useRef } from "react";

const TestPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const test = location.state?.test;
  const question = location.state?.questions;
  const [answers, setAnswers] = useState({});
  const questionsContainerRef = useRef(null);

  useEffect(() => {
    // Find all input elements after the HTML is rendered
    if (questionsContainerRef.current) {
      const inputs = questionsContainerRef.current.querySelectorAll('input');
      const selects = questionsContainerRef.current.querySelectorAll('select');
      
      // Add event listeners to all input elements
      inputs.forEach(input => {
        input.addEventListener('change', (e) => {
          const questionId = e.target.name || e.target.id;
          setAnswers(prev => ({
            ...prev,
            [questionId]: e.target.value
          }));
          console.log('Input changed:', {
            questionId,
            value: e.target.value,
            type: e.target.type
          });
        });
      });

      // Add event listeners to all select elements
      selects.forEach(select => {
        select.addEventListener('change', (e) => {
          const questionId = e.target.name || e.target.id;
          setAnswers(prev => ({
            ...prev,
            [questionId]: e.target.value
          }));
          console.log('Select changed:', {
            questionId,
            value: e.target.value
          });
        });
      });
    }
  }, [question]); // Re-run when question content changes

  const handleSubmit = () => {
    console.log('All answers:', answers);
    // Here you can add your validation logic
  };

  const renderListeningContent = () => {
    return (
      <div className="w-full">
        <div className="mb-8">
          <audio controls className="w-full mb-4">
            <source src={test} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-6">Questions</h2>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div 
              ref={questionsContainerRef}
              dangerouslySetInnerHTML={{ __html: question }} 
            />
          </div>
        </div>
      </div>
    );
  };

  const renderReadingContent = () => {
    return (
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/2">
          <div className="mt-4" dangerouslySetInnerHTML={{ __html: test }} />
        </div>
        <div className="lg:w-1/2">
          <h2 className="text-2xl font-bold mb-6">Questions</h2>
          <div className="space-y-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div 
                ref={questionsContainerRef}
                dangerouslySetInnerHTML={{ __html: question }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (!test) {
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

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-500 hover:underline mb-6"
      >
        ← Go back
      </button>

      <h1 className="text-3xl font-bold mb-6 text-center">
        {location.state.title}
      </h1>

      {location.state.type === "listening" 
        ? renderListeningContent()
        : renderReadingContent()
      }

      <div className="mt-6 flex justify-center">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Submit Test
        </button>
      </div>
    </div>
  );
};

export default TestPage;