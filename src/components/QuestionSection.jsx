/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";

const QuestionSection = ({ html, onAnswerChange, debugMode }) => {
  const sectionRef = useRef(null);

  const getQuestionNumberFromInput = (input) => {
    if (!input) return null;

    // For text inputs with array notation, extract the full name pattern
    if (input.name && input.name.match(/question(\d+)\[\]/)) {
      return input.name.match(/question(\d+)\[\]/)[1] + "[]";
    }

    if (input.name && input.name.startsWith("question")) {
      return input.name.replace("question", "");
    }

    if (input.id) {
      const match = input.id.match(/question(\d+)(?:_\d+)?$/);
      if (match && match[1]) {
        return match[1];
      }
    }

    return null;
  };

  const handleTextInput = (input, section, index) => {
    if (!input) return;

    const questionNumber = getQuestionNumberFromInput(input);

    if (questionNumber) {
      input.addEventListener("change", (e) => {
        const questionText =
          section.textContent?.trim() ||
          section.querySelector(".mlw_qmn_new_question")?.textContent?.trim();

        // Construct the key with array notation and index
        const key = `${questionNumber}-${index}`;

        onAnswerChange(key, {
          type: "text",
          value: e.target.value.trim().toLowerCase(),
          questionText: questionText,
        });
      });
    }
  };

  const handleRadioInput = (input, section, questionNumber) => {
    if (!input.id.includes("none")) {
      input.addEventListener("change", (e) => {
        onAnswerChange(questionNumber, {
          type: "radio",
          value: e.target.value.toLowerCase(),
          questionText: section
            .querySelector(".mlw_qmn_new_question")
            ?.textContent?.trim(),
        });
      });
    }
  };

  // const handleCheckboxInput = (input, section, questionNumber) => {
  //   if (!input.id.includes("none")) {
  //     input.addEventListener("change", (e) => {
  //       const value = e.target.value.toLowerCase();
  //       const isChecked = e.target.checked;

  //       onAnswerChange(questionNumber, {
  //         type: "checkbox",
  //         value,
  //         isChecked,
  //         questionText: section
  //           .querySelector(".mlw_qmn_new_question")
  //           ?.textContent?.trim(),
  //       });
  //     });
  //   }
  // };

  useEffect(() => {
    if (sectionRef.current) {
      const sections = sectionRef.current.querySelectorAll(".quiz_section, p");
      const cleanupFunctions = [];

      sections.forEach((section) => {
        // Handle text inputs
        const textInputs = section.querySelectorAll('input[type="text"]');
        textInputs.forEach((input, index) =>
          handleTextInput(input, section, index)
        );

        // Handle radio inputs
        const radioInputs = section.querySelectorAll('input[type="radio"]');
        const radioQuestionNumber = getQuestionNumberFromInput(radioInputs[0]);
        radioInputs.forEach((input) =>
          handleRadioInput(input, section, radioQuestionNumber)
        );

        // Handle checkbox inputs
        const checkboxInputs = section.querySelectorAll(
          'input[type="checkbox"]'
        );
        const checkboxQuestionNumber = getQuestionNumberFromInput(
          checkboxInputs[0]
        );

        checkboxInputs.forEach((input) => {
          if (!input.id.includes("none")) {
            const changeHandler = (e) => {
              const value = e.target.value.toLowerCase();
              const isChecked = e.target.checked;

              onAnswerChange(checkboxQuestionNumber, {
                type: "checkbox",
                value,
                isChecked,
                questionText: section
                  .querySelector(".mlw_qmn_new_question")
                  ?.textContent?.trim(),
              });
            };

            input.addEventListener("change", changeHandler);
            cleanupFunctions.push(() =>
              input.removeEventListener("change", changeHandler)
            );
          }
        });
      });

      // Cleanup function to remove all event listeners
      return () => {
        cleanupFunctions.forEach((cleanup) => cleanup());
      };
    }
  }, []);

  if (!html) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg">
        No question content available
      </div>
    );
  }

  return (
    <div
      ref={sectionRef}
      className="p-4 bg-gray-50 rounded-lg"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default QuestionSection;
