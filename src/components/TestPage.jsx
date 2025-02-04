import { useLocation, useNavigate } from "react-router-dom";

const TestPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const test = location.state?.test;

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

  const renderContent = () => {
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

  return (
    <div className="container mx-auto p-4">
      <button onClick={() => navigate(-1)} className="text-blue-500 hover:underline mb-6">
        ← Go back
      </button>
      <h1 className="text-3xl font-bold mb-6 text-center">{test.title}</h1>
      {renderContent()}
    </div>
  );
};

export default TestPage;