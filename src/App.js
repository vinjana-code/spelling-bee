import React, { useState } from 'react';
import './App.css';
import SpellingBee from './SpellingBee';
import Dashboard from './Dashboard';




function App() {
  const [selectedTest, setSelectedTest] = useState(null);

  const handleTestSelect = (test) => {
    setSelectedTest(test);
  };

  return (
    <div className="App">
      {!selectedTest ? (
        <Dashboard onSelectTest={handleTestSelect} />
      ) : (
        <SpellingBee test={selectedTest} />
      )}
    </div>
  );
}

export default App;

