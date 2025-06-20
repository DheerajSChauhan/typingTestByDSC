import React from 'react';

function Controls({ timerValue, selectedDuration, onDurationChange, onResetTest, gameState, theme, onToggleTheme }) {
  const durations = [15, 30, 60]; // Available durations

  return (
    <div className="controls">
      <div className="timer">Time: {timerValue}s</div>
      <div className="duration-options">
        {durations.map(duration => (
          <button
            key={duration}
            onClick={() => onDurationChange(duration)}
            className={selectedDuration === duration ? 'active' : ''}
            disabled={gameState === 'inProgress'}
          >
            {duration}s
          </button>
        ))}
      </div>
      <button onClick={onToggleTheme} className="theme-toggle-button">
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </button>
      <button onClick={onResetTest} className="restart-button">
        Restart
      </button>
    </div>
  );
}

export default Controls;
