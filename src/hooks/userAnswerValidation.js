import { useState } from 'react';

export const useAnswerValidation = (correctAnswers) => {
  const [results, setResults] = useState(null);

  const validateAnswers = (userAnswers) => {
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
      let questionNumber = questionKey.split('-')[0];
      const correctAnswer = correctAnswers[questionNumber];

      if (correctAnswer === undefined) {
        console.warn(`No correct answer found for question ${questionNumber}`);
        return;
      }

      let isCorrect = false;

      if (answer.type === "radio") {
        const userValue = isNaN(answer.value) ? answer.value : Number(answer.value);
        const correctValue = isNaN(correctAnswer) ? correctAnswer : Number(correctAnswer);
        isCorrect = userValue === correctValue;
      } else if (answer.type === "checkbox") {
        let correctValues = typeof correctAnswer === 'string' 
          ? correctAnswer.split(',').map(v => v.trim().toLowerCase())
          : correctAnswer;
        
        if (Array.isArray(correctValues)) {
          const userValuesSet = new Set(answer.values);
          const correctValuesSet = new Set(correctValues);
          isCorrect = userValuesSet.size === correctValuesSet.size && 
                     answer.values.every(v => correctValuesSet.has(v));
        }
      } else if (answer.type === "text") {
        const userValue = answer.value.trim().toLowerCase();
        const correctValue = String(correctAnswer).trim().toLowerCase();
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

    setResults(results);
    return results;
  };

  return { results, validateAnswers };
};