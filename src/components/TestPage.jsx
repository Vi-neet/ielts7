import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const TestPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const test = location.state?.test;
  const question = location.state?.questions;
  const [userAnswers, setUserAnswers] = useState({});
  const [correctAnswers, setCorrectAnswers] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const questionsContainerRef = useRef(null);
  console.log(results);
  console.log(loading);
  console.log(location);
  console.log(userAnswers);
  console.log(correctAnswers);
  // Fetch correct answers from Firebase
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
          const answerKey = `answer_${testNumber}`; // Select the correct test's answer object
          console.log(answerKey);
          if (data[answerKey]) {
            console.log(
              `Fetched correct answer object: ${answerKey}`,
              data[answerKey]
            );
            setCorrectAnswers(data[answerKey]);
          } else {
            console.error(`Answers not found for ${answerKey}`);
          }
        } else {
          console.error("No answers document found in Firestore");
        }
      } catch (error) {
        console.error("Error fetching answers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnswers();
  }, [location.state]);

  // Rest of the event handling code remains the same
  useEffect(() => {
    if (questionsContainerRef.current) {
      const questionSections =
        questionsContainerRef.current.querySelectorAll(".quiz_section");

      questionSections.forEach((section) => {
        const questionNumber = getQuestionNumber(section);

        // Handle radio inputs (MCQs, TRUE/FALSE/NG)
        const radioInputs = section.querySelectorAll('input[type="radio"]');
        radioInputs.forEach((input) => {
          if (!input.id.includes("none")) {
            input.addEventListener("change", (e) => {
              setUserAnswers((prev) => ({
                ...prev,
                [questionNumber]: {
                  type: "radio",
                  value: e.target.value.toLowerCase(), // Convert to lowercase for comparison
                  questionText: section
                    .querySelector(".mlw_qmn_new_question")
                    ?.textContent?.trim(),
                },
              }));
            });
          }
        });

        // Handle text inputs (fill-in-the-blanks)
        const textInputs = section.querySelectorAll('input[type="text"]');
        textInputs.forEach((input, index) => {
          // Add index for uniqueness
          input.addEventListener("change", (e) => {
            setUserAnswers((prev) => ({
              ...prev,
              [`${questionNumber}-${index}`]: {
                // ✅ Store separately using questionNumber-index
                type: "text",
                value: e.target.value.trim().toLowerCase(),
                questionText: section
                  .querySelector(".mlw_qmn_new_question")
                  ?.textContent?.trim(),
              },
            }));
          });
        });
      });
    }
  }, [question]);

  const getQuestionNumber = (section) => {
    const questionText = section.querySelector(
      ".mlw_qmn_new_question"
    )?.textContent;

    if (!questionText) return null;

    // Look for "Questions X-Y" or "Question X" and extract the first number after "Questions"
    const match = questionText.match(/Questions?\s+(\d+)/i);

    return match ? match[1] : null; // Return the correct question number
  };

  const validateAnswers = () => {
    if (!correctAnswers) {
      console.error("No correct answers available");
      return null;
    }

    const results = {
      totalQuestions: Object.keys(userAnswers).length,
      correctAnswers: 0,
      answers: [],
      timestamp: new Date().toISOString(),
    };

    Object.entries(userAnswers).forEach(([questionNumber, answer]) => {
      const correctAnswer = correctAnswers[questionNumber]; // Ensure matching key

      if (correctAnswer === undefined) {
        console.warn(`No correct answer found for question ${questionNumber}`);
        return;
      }

      let isCorrect = false;

      if (answer.type === "radio") {
        // Convert both values to numbers to ensure proper comparison
        isCorrect = Number(answer.value) === Number(correctAnswer);
      } else if (answer.type === "text") {
        // Normalize text (trim + lowercase) for case-insensitive comparison
        isCorrect =
          answer.value.trim().toLowerCase() ===
          correctAnswer.trim().toLowerCase();
      }

      results.answers.push({
        questionNumber,
        questionText: answer.questionText,
        userAnswer: answer.value,
        correctAnswer,
        isCorrect,
      });

      if (isCorrect) {
        results.correctAnswers++;
      }
    });

    return results;
  };

  const handleSubmit = () => {
    const validationResults = validateAnswers();
    if (validationResults) {
      setResults(validationResults);
      console.log("Test results:", validationResults);
    } else {
      console.error("Validation failed, no results generated.");
    }
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
  // console.log(loading);
  // console.log(results);
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
        : renderReadingContent()}

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
