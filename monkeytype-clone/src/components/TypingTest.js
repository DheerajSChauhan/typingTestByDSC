import React from 'react';
// It's good practice to create a separate CSS file for component-specific styles
// e.g., import './TypingTest.css'; // We will add styles to App.css for this task

function TypingTest({ textToType, userInput, onUserInputChange, gameState }) {
  const characters = textToType.split('').map((char, index) => {
    let className = 'char-pending'; // Default class for characters not yet typed
    if (index < userInput.length) {
      if (userInput[index] === char) {
        className = 'char-correct';
      } else {
        className = 'char-incorrect';
      }
    } else if (index === userInput.length && gameState !== 'finished') { // also check gameState
      className = 'char-current'; // Class for the current character (cursor position)
    }

    // Special handling for spaces to make them visible if incorrect or current
    if (char === ' ') {
      if (className === 'char-incorrect') {
        return <span key={index} className={`${className} space-char`}>&nbsp;</span>; // Show incorrect space
      } else if (className === 'char-current') {
         return <span key={index} className={`${className} space-char`}>&nbsp;</span>; // Show current space
      }
      // Correct or pending spaces can remain as they are, or also use &nbsp; if desired for consistency
    }

    return (
      <span key={index} className={className}>
        {char}
      </span>
    );
  });

  return (
    <div className="typing-test">
      <div className="text-display"> {/* Wrapper for the characters */}
        {characters}
      </div>
      <input
        type="text"
        value={userInput}
        onChange={onUserInputChange}
        placeholder="Start typing here..."
        readOnly={gameState === 'finished'}
        // Auto-focus might be useful here, but handle carefully with re-renders
        // autoFocus
      />
    </div>
  );
}

export default TypingTest;
