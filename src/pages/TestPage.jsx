/* eslint-disable no-unused-vars */
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import AudioPlayer from "../components/AudioPlayer";
import QuestionSection from "../components/QuestionSection";
import DebugPanel from "../components/DebugPanel";
import { useAnswerValidation } from "../hooks/userAnswerValidation";

const TestPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const test = location.state?.test;
  const question = location.state?.questions;
  const [userAnswers, setUserAnswers] = useState({});
  const [correctAnswers, setCorrectAnswers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [debugMode, setDebugMode] = useState(false);

  console.log(userAnswers);
  const { results, validateAnswers } = useAnswerValidation(correctAnswers);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("debug") === "true") {
      setDebugMode(true);
    }
  }, [location]);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const { id, type, title, testNumber } = location.state || {};
        if (!id || !type || !title || testNumber == null) {
          console.error("Missing required data in location.state");
          return;
        }

        const yearMatch = title.match(/\b(1[3-9]|20)\b/);
        const year = yearMatch ? yearMatch[0] : null;
        if (!year) {
          console.error("Could not extract year from title:", title);
          return;
        }

        const answerDocRef = doc(db, `cambridge_${year}_${type}`, id);
        const answerSnap = await getDoc(answerDocRef);

        if (answerSnap.exists()) {
          const data = answerSnap.data();
          const answerKey = `answer_${testNumber}`;
          setCorrectAnswers(data[answerKey]);
        }
      } catch (error) {
        console.error("Error fetching answers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnswers();
  }, [location.state]);

  const handleAnswerChange = (questionNumber, answer) => {
    setUserAnswers((prev) => {
      if (answer.type === "checkbox") {
        const currentAnswers = prev[questionNumber] || {
          type: "checkbox",
          values: [],
          questionText: answer.questionText,
        };

        let updatedValues = [...currentAnswers.values];
        if (answer.isChecked) {
          updatedValues.push(answer.value);
        } else {
          updatedValues = updatedValues.filter((v) => v !== answer.value);
        }

        return {
          ...prev,
          [questionNumber]: {
            ...currentAnswers,
            values: updatedValues,
          },
        };
      }

      return {
        ...prev,
        [questionNumber]: answer,
      };
    });
  };

  const handleSubmit = () => {
    validateAnswers(userAnswers);
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

      {location.state.type === "listening" ? (
        <div className="w-full">
          <AudioPlayer audioUrl={test} />
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Questions</h2>
            <QuestionSection
              html={question}
              onAnswerChange={handleAnswerChange}
              debugMode={debugMode}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/2">
            <div className="mt-4" dangerouslySetInnerHTML={{ __html: test }} />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-2xl font-bold mb-6">Questions</h2>
            <QuestionSection
              html={question}
              onAnswerChange={handleAnswerChange}
              debugMode={debugMode}
            />
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Submit Test
        </button>
      </div>

      {debugMode && (
        <DebugPanel userAnswers={userAnswers} correctAnswers={correctAnswers} />
      )}
    </div>
  );
};

export default TestPage;
