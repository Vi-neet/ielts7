/* eslint-disable react/prop-types */
// QuestionSection.jsx - simplified
import { useRef, useEffect } from "react";
// QuestionSection component
const QuestionSection = ({ formIframeHtml }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && formIframeHtml) {
      // Create styles for specific elements
      const styleTag = `
        <style>
          p {
            margin-top: 15px;
            margin-bottom: 15px;
          }
          span {
            margin-top: 10px;
            margin-bottom: 10px;
          }
          strong {
            margin-top: 10px;
            margin-bottom: 10px;
          }
        </style>
      `;
      
      // Inject both the style tag and the form HTML
      containerRef.current.innerHTML = styleTag + formIframeHtml;
    }
  }, [formIframeHtml]);

  if (!formIframeHtml) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg">
        No question form available
      </div>
    );
  }

  return <div ref={containerRef} className="w-full h-screen " />;
};

export default QuestionSection;
