/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import MarkdownIt from 'markdown-it';


const md = new MarkdownIt();


function TextParser({ text }) {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    const content = md.render(text);
    setHtmlContent(content);
  }, [text]);

  return (
    <div 
      dangerouslySetInnerHTML={{ __html: htmlContent }} 
      className="prose max-w-none"
    />
  );
}

export default TextParser;