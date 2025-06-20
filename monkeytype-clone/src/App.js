import React, { useState, useEffect } from 'react';
import './App.css';
import TypingTest from './components/TypingTest';
import Controls from './components/Controls';
import Stats from './components/Stats';

const SAMPLE_TEXTS = [
  "The quick brown fox jumps over the lazy dog.",
  "Pack my box with five dozen liquor jugs.",
  "How vexingly quick daft zebras jump.",
  "Bright vixens jump; dozy fowl quack.",
  "Sphinx of black quartz, judge my vow."
];

function App() {
  const [currentText, setCurrentText] = useState(() => SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)]);
  const [userInput, setUserInput] = useState("");
  const [selectedDuration, setSelectedDuration] = useState(60);
  const [timerValue, setTimerValue] = useState(selectedDuration);
  const [selectedMode, setSelectedMode] = useState("time");
  const [stats, setStats] = useState({ wpm: 0, accuracy: 0, errors: 0 });
  const [gameState, setGameState] = useState("notStarted");
  const [theme, setTheme] = useState('light'); // 'light' or 'dark'

  // Theme toggle function
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Effect to update body attribute for theme
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  // Timer effect
  useEffect(() => {
    let intervalId;
    if (gameState === "inProgress" && timerValue > 0) {
      intervalId = setInterval(() => {
        setTimerValue(prevTimerValue => prevTimerValue - 1);
      }, 1000);
    } else if (timerValue === 0 && gameState === "inProgress") {
      setGameState("finished");
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [gameState, timerValue]); // Removed setGameState, setTimerValue from deps as they are setters

  // Stats calculation effect
  useEffect(() => {
    if (gameState === "finished") {
      const typedChars = userInput.length;
      if (typedChars === 0) {
        setStats({ wpm: 0, accuracy: 0, errors: 0 });
        return;
      }
      let errorCount = 0;
      for (let i = 0; i < typedChars; i++) {
        if (i < currentText.length && userInput[i] !== currentText[i]) {
          errorCount++;
        } else if (i >= currentText.length) {
          errorCount++;
        }
      }
      const correctChars = typedChars - errorCount;
      const calculatedAccuracy = typedChars > 0 ? (correctChars / typedChars) * 100 : 0;
      const timeInMinutes = selectedDuration / 60;
      const calculatedWpm = timeInMinutes > 0 ? (typedChars / 5) / timeInMinutes : 0;
      setStats({
        wpm: Math.round(calculatedWpm),
        accuracy: parseFloat(calculatedAccuracy.toFixed(2)),
        errors: errorCount,
      });
    }
  }, [gameState, userInput, currentText, selectedDuration]); // Removed setStats from deps

  const handleUserInputChange = (event) => {
    const value = event.target.value;
    setUserInput(value);
    if (gameState === "notStarted" && value.length > 0) {
      setGameState("inProgress");
    }
  };

  const resetTest = () => {
    setGameState("notStarted");
    setUserInput("");
    setCurrentText(SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)]);
    setTimerValue(selectedDuration);
    setStats({ wpm: 0, accuracy: 0, errors: 0 });
  };

  const handleDurationChange = (newDuration) => {
    setSelectedDuration(newDuration);
    if (gameState === 'notStarted') {
      setTimerValue(newDuration);
    }
  };

  return (
    <div className="App">
      <h1>MonkeyType Clone</h1>
      <Controls
        timerValue={timerValue}
        selectedDuration={selectedDuration}
        onDurationChange={handleDurationChange}
        onResetTest={resetTest}
        gameState={gameState}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <TypingTest
        textToType={currentText}
        userInput={userInput}
        onUserInputChange={handleUserInputChange}
        gameState={gameState}
      />
      <Stats stats={stats} gameState={gameState} />
    </div>
  );
}

export default App;
