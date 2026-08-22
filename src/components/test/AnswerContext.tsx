"use client";

import React, { createContext, useContext } from "react";

export interface AnswerContextType {
  answers: Record<number, string>;
  setAnswer: (num: number, val: string) => void;
  disabled: boolean;
  isSubmitted: boolean;
}

export const AnswerContext = createContext<AnswerContextType | null>(null);

export function useAnswers() {
  const context = useContext(AnswerContext);
  return context;
}
