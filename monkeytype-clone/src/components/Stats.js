import React from 'react';
// import './Stats.css'; // Optional: for styling stats

function Stats({ stats, gameState }) {
  if (gameState !== 'finished') {
    // Optionally, display a message or different content when test is not finished
    // return <div className="stats-display placeholder">Complete the test to see your stats.</div>;
    return null;
  }

  return (
    <div className="stats-display">
      <h2>Results:</h2>
      <p>WPM: {stats.wpm}</p>
      <p>Accuracy: {stats.accuracy}%</p>
      <p>Errors: {stats.errors}</p>
    </div>
  );
}

export default Stats;
