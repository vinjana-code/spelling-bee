import React, { useState, useEffect } from 'react';
import words from './words.json'; // Import the JSON file with words

const SpellingBee = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    speakWord(words[currentWordIndex]);
  }, [currentWordIndex]);

  const speakWord = (word) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.rate = 0.4;
    utterance.pitch = 0.9;    
    window.speechSynthesis.speak(utterance);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    if (input.trim().toLowerCase() === words[currentWordIndex].toLowerCase()) {
      setResult('✔️ Correct!');
    } else {
      setResult('❌ Wrong!');
    }
    setTimeout(() => {
      setResult('');
      setInput('');
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000);
  };

  const handleNext = () => {
    setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
  };

  const handlePrevious = () => {
    setCurrentWordIndex((prevIndex) => (prevIndex - 1 + words.length) % words.length);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Spelling Bee</h1>
      <button onClick={() => speakWord(words[currentWordIndex])}>🔊 Listen</button>
      <div style={{ margin: '20px 0' }}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          autoFocus
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <button onClick={handleSubmit} style={{ marginLeft: '10px', padding: '10px', fontSize: '16px' }}>
          Submit
        </button>
      </div>
      {result && <div style={{ fontSize: '24px', margin: '20px 0' }}>{result}</div>}
      <div>
        <button onClick={handlePrevious} style={{ marginRight: '10px', padding: '10px', fontSize: '16px' }}>
          Previous
        </button>
        <button onClick={handleNext} style={{ padding: '10px', fontSize: '16px' }}>
          Next
        </button>
      </div>
    </div>
  );
};

export default SpellingBee;
