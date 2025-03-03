/* eslint-disable react/prop-types */
// QuestionSection.jsx - simplified
import { useRef, useEffect } from "react";
// QuestionSection component
const QuestionSection = ({ formIframeHtml }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && formIframeHtml) {
      containerRef.current.innerHTML = formIframeHtml;
    }
  }, [formIframeHtml]);

  if (!formIframeHtml) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg">
        No question form available
      </div>
    );
  }

  return <div ref={containerRef} className="w-full h-screen" />;
};

export default QuestionSection;
