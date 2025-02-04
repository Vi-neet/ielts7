import { useLocation, useNavigate } from "react-router-dom";

const TestPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const test = location.state?.test;
  
  // Access questions the same way as test
  const question1 = location.state?.question_1;
  const question2 = location.state?.question_2;
  const question3 = location.state?.question_3;
  const question4 = location.state?.question_4;

  if (!test) {
    return (
      <div className="text-center p-4">
        <button onClick={() => navigate(-1)} className="text-blue-500 hover:underline">
          ← Go back
        </button>
        <p className="mt-4">Test not found</p>
      </div>
    );
  }

  const renderTestContent = () => {
    if (location.state.type === "listening") {
      return (
        <>
          <audio controls className="w-full mb-4">
            <source src={test.content} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
          <div className="mt-4 text-gray-600">
            Listening {test.testNumber.replace("_", " ")}
          </div>
        </>
      );
    }

    return (
      <div className="mt-4" dangerouslySetInnerHTML={{ __html: test.content }} />
    );
  };

  const renderQuestions = () => {
    const questions = [question1, question2, question3, question4];
    
    return (
      <div className="space-y-6">
        {questions.map((question, index) => (
          question && (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Question {index + 1}</h3>
              <div dangerouslySetInnerHTML={{ __html: question.content }} />
            </div>
          )
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <button onClick={() => navigate(-1)} className="text-blue-500 hover:underline mb-6">
        ← Go back
      </button>
      
      {/* Responsive layout container */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Test section */}
        <div className="lg:w-1/2">
          <h1 className="text-3xl font-bold mb-6 text-center">{test.title}</h1>
          {renderTestContent()}
        </div>
        
        {/* Questions section */}
        <div className="lg:w-1/2">
          <h2 className="text-2xl font-bold mb-6 text-center">Questions</h2>
          {renderQuestions()}
        </div>
      </div>
    </div>
  );
};

export default TestPage;