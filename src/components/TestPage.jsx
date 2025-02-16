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
  const [debugMode, setDebugMode] = useState(false); // Debug mode for logging
  const questionsContainerRef = useRef(null);
  console.log(userAnswers)
  useEffect(() => {
    // Check for debug parameter in URL
    const params = new URLSearchParams(location.search);
    if (params.get('debug') === 'true') {
      setDebugMode(true);
    }
  }, [location]);

  if (debugMode) {
    console.log("Current state:", {
      results,
      loading,
      location,
      userAnswers,
      correctAnswers
    });
  }

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
          if (debugMode) console.log("Looking for answer key:", answerKey);
          
          if (data[answerKey]) {
            if (debugMode) {
              console.log(`Fetched correct answer object: ${answerKey}`, data[answerKey]);
            }
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
  }, [location.state, debugMode]);

  // Updated: Improved function to extract question number from input ID or name
  const getQuestionNumberFromInput = (input) => {
    // First try to get number from name attribute (most reliable)
    if (input.name && input.name.startsWith("question")) {
      return input.name.replace("question", "");
    }
    
    // Then try to get from ID if available
    if (input.id) {
      // Try to match format like 'question1018' or 'question1018_2'
      const match = input.id.match(/question(\d+)(?:_\d+)?$/);
      if (match && match[1]) {
        return match[1];
      }
    }
    
    return null;
  };

  useEffect(() => {
    if (questionsContainerRef.current) {
      const questionSections =
        questionsContainerRef.current.querySelectorAll(".quiz_section");

      questionSections.forEach((section) => {
        /** ✅ Handle Radio Buttons */
        let radioQuestionNumber = getRadioQuestionNumber(section);
        const radioInputs = section.querySelectorAll('input[type="radio"]');

        if (radioInputs.length > 0 && debugMode) {
          console.log(`Found ${radioInputs.length} radio inputs for question ${radioQuestionNumber || 'unknown'}`);
        }

        radioInputs.forEach((input) => {
          if (!input.id.includes("none")) {
            // Get question number from input first, then fall back to section extraction
            const inputQuestionNumber = getQuestionNumberFromInput(input);
            const questionNumber = inputQuestionNumber || radioQuestionNumber;
            
            if (questionNumber) {
              input.addEventListener("change", (e) => {
                setUserAnswers((prev) => ({
                  ...prev,
                  [questionNumber]: {
                    type: "radio",
                    value: e.target.value.toLowerCase(),
                    questionText: section
                      .querySelector(".mlw_qmn_new_question")
                      ?.textContent?.trim(),
                  },
                }));
              });
              
              if (debugMode && inputQuestionNumber) {
                console.log(`Using question number ${questionNumber} from input`, input);
              }
            } else if (debugMode) {
              console.warn("Could not determine question number for radio input", input);
            }
          }
        });

        /** ✅ Handle Checkboxes */
        let checkboxQuestionNumber = getCheckboxQuestionNumber(section);
        const checkboxInputs = section.querySelectorAll('input[type="checkbox"]');
        
        if (checkboxInputs.length > 0 && debugMode) {
          console.log(`Found ${checkboxInputs.length} checkbox inputs for question ${checkboxQuestionNumber || 'unknown'}`);
        }

        if (checkboxInputs.length > 0) {
          // Try to get question number from first checkbox
          const firstCheckboxNumber = checkboxInputs[0] ? getQuestionNumberFromInput(checkboxInputs[0]) : null;
          checkboxQuestionNumber = firstCheckboxNumber || checkboxQuestionNumber;
          
          if (checkboxQuestionNumber) {
            // Initialize checkbox answers array if it doesn't exist
            setUserAnswers((prev) => {
              if (!prev[checkboxQuestionNumber]) {
                return {
                  ...prev,
                  [checkboxQuestionNumber]: {
                    type: "checkbox",
                    values: [],
                    questionText: section
                      .querySelector(".mlw_qmn_new_question")
                      ?.textContent?.trim(),
                  },
                };
              }
              return prev;
            });

            checkboxInputs.forEach((input) => {
              if (!input.id.includes("none")) {
                input.addEventListener("change", (e) => {
                  setUserAnswers((prev) => {
                    const currentAnswers = prev[checkboxQuestionNumber] || {
                      type: "checkbox",
                      values: [],
                      questionText: section
                        .querySelector(".mlw_qmn_new_question")
                        ?.textContent?.trim(),
                    };
                    
                    let updatedValues = [...currentAnswers.values];
                    const value = e.target.value.toLowerCase();
                    
                    if (e.target.checked) {
                      // Add value if checked and not already in the array
                      if (!updatedValues.includes(value)) {
                        updatedValues.push(value);
                      }
                    } else {
                      // Remove value if unchecked
                      updatedValues = updatedValues.filter(v => v !== value);
                    }
                    
                    return {
                      ...prev,
                      [checkboxQuestionNumber]: {
                        ...currentAnswers,
                        values: updatedValues,
                      },
                    };
                  });
                });
              }
            });
          } else if (debugMode) {
            console.warn("Could not determine question number for checkbox inputs", checkboxInputs);
          }
        }

        /** ✅ Handle Input Boxes */
        let textQuestionNumber = getTextQuestionNumber(section);
        const textInputs = section.querySelectorAll('input[type="text"]');

        if (textInputs.length > 0 && debugMode) {
          console.log(`Found ${textInputs.length} text inputs for question ${textQuestionNumber || 'unknown'}`);
        }

        // Try to get question number from first text input
        const firstTextInputNumber = textInputs[0] ? getQuestionNumberFromInput(textInputs[0]) : null;
        textQuestionNumber = firstTextInputNumber || textQuestionNumber;

        if (textQuestionNumber) {
          textInputs.forEach((input, index) => {
            input.addEventListener("change", (e) => {
              const key = textInputs.length > 1 ? `${textQuestionNumber}-${index}` : textQuestionNumber;
              setUserAnswers((prev) => ({
                ...prev,
                [key]: {
                  type: "text",
                  value: e.target.value.trim().toLowerCase(),
                  questionText: section
                    .querySelector(".mlw_qmn_new_question")
                    ?.textContent?.trim(),
                },
              }));
            });
          });
        } else if (textInputs.length > 0 && debugMode) {
          console.warn("Could not determine question number for text inputs", textInputs);
        }
      });
    }
  }, [question, debugMode]);

  const getTextQuestionNumber = (section) => {
    const questionText = section.querySelector(
      ".mlw_qmn_new_question"
    )?.textContent;

    if (!questionText) {
      if (debugMode) console.warn("No question text found in section", section);
      return null;
    }

    // Look for "Questions X-Y" or "Question X" and extract the first number after "Questions"
    const match = questionText.match(/Questions?\s+(\d+)/i);

    if (debugMode) {
      console.log("Text question text:", questionText);
      console.log("Extracted text question number:", match ? match[1] : "none");
    }

    return match ? match[1] : null; // Return the correct question number
  };

  const getRadioQuestionNumber = (section) => {
    const questionText = section.querySelector(
      ".mlw_qmn_new_question"
    )?.textContent;
    
    if (!questionText) {
      if (debugMode) console.warn("No question text found in section", section);
      return null;
    }
    
    // Look for specific patterns like "Question X" or just the number at the beginning
    const questionMatch = questionText.match(/Question\s+(\d+)/i);
    if (questionMatch) return questionMatch[1];
    
    // If no explicit "Question X" format, look for first number after common prefixes
    const prefixMatch = questionText.match(/^([^0-9]*?)(\d+)/);
    
    if (debugMode) {
      console.log("Radio question text:", questionText);
      console.log("Extracted radio question number:", 
        questionMatch ? questionMatch[1] : 
        prefixMatch ? prefixMatch[2] : "none");
    }
    
    if (prefixMatch) return prefixMatch[2];
    
    return null;
  };

  const getCheckboxQuestionNumber = (section) => {
    // Reuse the same logic as radio buttons
    return getRadioQuestionNumber(section);
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

    Object.entries(userAnswers).forEach(([questionKey, answer]) => {
      // Extract base question number (handle cases like "1-0" for text inputs)
      let questionNumber = questionKey.split('-')[0];
      
      const correctAnswer = correctAnswers[questionNumber];

      if (correctAnswer === undefined) {
        console.warn(`No correct answer found for question ${questionNumber} (key: ${questionKey})`);
        return;
      }

      let isCorrect = false;

      if (answer.type === "radio") {
        // Convert both values to numbers if possible for proper comparison
        const userValue = isNaN(answer.value) ? answer.value : Number(answer.value);
        const correctValue = isNaN(correctAnswer) ? correctAnswer : Number(correctAnswer);
        isCorrect = userValue === correctValue;
      } else if (answer.type === "checkbox") {
        // For checkboxes, correctAnswer should be an array or comma-separated string
        let correctValues = correctAnswer;
        if (typeof correctAnswer === 'string') {
          correctValues = correctAnswer.split(',').map(v => v.trim().toLowerCase());
        }
        
        // Check if arrays match (order-independent)
        if (Array.isArray(correctValues)) {
          const userValuesSet = new Set(answer.values);
          const correctValuesSet = new Set(correctValues);
          
          // Check if sets have same size and all user values are in correct values
          isCorrect = 
            userValuesSet.size === correctValuesSet.size && 
            answer.values.every(v => correctValuesSet.has(v));
        }
      } else if (answer.type === "text") {
        // Normalize text (trim + lowercase) for case-insensitive comparison
        const userValue = answer.value.trim().toLowerCase();
        const correctValue = 
          typeof correctAnswer === 'string' 
            ? correctAnswer.trim().toLowerCase() 
            : String(correctAnswer).trim().toLowerCase();
        
        isCorrect = userValue === correctValue;
      }

      results.answers.push({
        questionKey,
        questionNumber,
        questionText: answer.questionText,
        userAnswer: answer.type === 'checkbox' ? answer.values : answer.value,
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
      if (debugMode) console.log("Test results:", validationResults);
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
      
      {debugMode && (
        <div className="mt-6 p-4 border border-gray-300 rounded">
          <h3 className="font-bold">Debug Information</h3>
          <p>User Answers: {Object.keys(userAnswers).length}</p>
          <p>Correct Answers: {correctAnswers ? Object.keys(correctAnswers).length : 0}</p>
          <pre className="mt-2 bg-gray-100 p-2 rounded text-xs">
            {JSON.stringify(userAnswers, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default TestPage;