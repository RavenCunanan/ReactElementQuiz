import React from 'react';

export default function Question({ question, options, onAnswer }) {
  return (
    <div className="quiz-container">
      <h2>{question}</h2>
      <div className="button-group">
        {options.map((option, index) => (
          <button key={index} onClick={() => onAnswer(option)}>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
