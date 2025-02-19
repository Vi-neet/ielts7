/* eslint-disable react/prop-types */

const DebugPanel = ({ userAnswers, correctAnswers }) => {
  return (
    <div className="mt-6 p-4 border border-gray-300 rounded">
      <h3 className="font-bold">Debug Information</h3>
      <p>User Answers: {Object.keys(userAnswers).length}</p>
      <p>Correct Answers: {correctAnswers ? Object.keys(correctAnswers).length : 0}</p>
      <pre className="mt-2 bg-gray-100 p-2 rounded text-xs">
        {JSON.stringify(userAnswers, null, 2)}
      </pre>
    </div>
  );
};

export default DebugPanel;