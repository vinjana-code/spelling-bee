import React, { useState, useEffect, useCallback  } from 'react';
import useSound from 'use-sound';
import correctSound from './sounds/correct.mp3';
import wrongSound from './sounds/wrong.mp3';
import booSound from './sounds/boo.m4a';
import clapSound from './sounds/clap.m4a';
import './SpellingBee.css';
import Snowflake from './snowflake';

const SpellingBee = ({ test }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typedWord, setTypedWord] = useState('');
  const [results, setResults] = useState([]);
  const [percent,setPercent] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [showSnowflakes, setShowSnowflakes] = useState(false);
  const [finish,setFinish] = useState(false);

  const [playCorrect] = useSound(correctSound);
  const [playWrong] = useSound(wrongSound);
  const [playBoo] = useSound(booSound);
  const [playClap] = useSound(clapSound);


  const currentWord = test.exams[currentIndex]?.word;
  const currentDefinition = test.exams[currentIndex].definition;
  const currentSentence = test.exams[currentIndex].sentence;


  const speakWord = () => {
    const utterance = new SpeechSynthesisUtterance(currentWord);
    utterance.rate = 0.4;
    utterance.pitch = 0.9; 
    speechSynthesis.speak(utterance);
  };

  const speakDefinition = () => {
    const utterance = new SpeechSynthesisUtterance(currentDefinition);
    utterance.rate = 0.5;
    speechSynthesis.speak(utterance);
  };

  const speakSentence = () => {
    const utterance = new SpeechSynthesisUtterance(currentSentence);
    utterance.rate = 0.4;
    utterance.pitch = 0.9; 
    speechSynthesis.speak(utterance);
  };

  const nextQuestion = () => {
    if (currentIndex < test.exams.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {      
      setFinish(true);
    }
  }

  const checkSpelling = () => {  
    const isCorrect = typedWord.toLowerCase() === currentWord.toLowerCase();
    const updatedResults = [
      ...results,
      { word: currentWord, correct: isCorrect,answerTyped:typedWord }
    ];
    setResults(updatedResults);
    if (isCorrect) {  

      playCorrect();
      setFeedback('correct');     
      setShowSnowflakes(true);
      setTimeout(() => {            
        setFeedback('');
        setTypedWord('');
        setShowSnowflakes(false);
        nextQuestion();     
      }, 2500);
    } else {
      
      playWrong();
      setFeedback('wrong');
      setTimeout(() => {             
          setFeedback('');
          setTypedWord('');       
          nextQuestion(); 
      }, 3000);
    }

   
  };
  const getRandomMessage = (messages) => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
  };

  const handleFinish = useCallback(() => {
    const correctAnswers = results.filter(result => result.correct).length;
    const score = (correctAnswers / test.exams.length) * 100;
    const roundedScore = Math.floor(score);
    setPercent(roundedScore);
    
    const fullscoreMessages = ['Absolutely phenomenal! You have achieved perfection!','Outstanding performance! You have achieved perfection! ','You have mastered everything! Perfect score!'];
    const excellentMessages = ['Incredible job! Just a step away from perfection!', 'Fantastic effort! You have excelled beyond expectations!', 'Superb performance! You are almost at the top!'];
    const goodMessages = ['Amazing work! You are in the top grade!', 'Great job! You have done exceptionally well!', 'You are almost perfect! Keep up the excellent work!'];
    const improvingMessages = ['Keep improving!', 'You are doing better!', 'Progressing well!'];
    const badMessages = ['Not so great, keep working!', 'Keep working. Donot give up!', 'You can do it! Keep working. '];
    const worstMessages = ['Not so great, Every effort counts!', 'Stay positive! You will get better with each step!', 'Do not give up! You are making progress! '];
    let message;
    if (score >= 100) {
      playClap();   
      message =  getRandomMessage(fullscoreMessages);
    } else if (score >= 95 && score < 100) {
      playClap();   
      message =  getRandomMessage(excellentMessages);
    } else if (score >= 90 && score < 95) {
      playClap();   
      message = getRandomMessage(goodMessages);
    } else if (score >= 80 && score < 90) {
      playClap();   
      message = getRandomMessage(improvingMessages);
    } else if (score >= 60 && score < 80) {
      playBoo();
      message = getRandomMessage(badMessages);
    } else {
      playBoo();
      message = getRandomMessage(worstMessages);
    }
   
   
    const currentMessag = `You scored ${roundedScore}%. ${message}`;
    const currentScore = `You answered ${correctAnswers} correct}`;
    const speakAnswers = new SpeechSynthesisUtterance(currentScore);
    setTimeout(() => {             
      speechSynthesis.speak(speakAnswers);
  }, 8000);  
    const speakMessage = new SpeechSynthesisUtterance(currentMessag);
    setTimeout(() => {             
      speechSynthesis.speak(speakMessage);
    }, 10000);
    
  }, [results, test.exams.length]);

  const handleNext = () => {
    if (currentIndex < test.exams.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    if (finish) {
    handleFinish();
    }
  }, [finish, handleFinish]);

  return (
    <div className="spelling-bee">
      {showSnowflakes && <Snowflake />}
      {!finish ? (
      <div>
      <h1>Spelling Bee {test.name}</h1>
      <button className="listen" onClick={speakWord}>🔊 Listen</button>
      <input
        type="text"
        value={typedWord}
        onChange={(e) => setTypedWord(e.target.value)}
        spellcheck="false"
      />
       <button onClick={checkSpelling} style={{ marginLeft: '10px', padding: '10px', fontSize: '16px' }}>
          Submit
        </button>
      <div className={`feedback ${feedback}`}>
        {feedback === 'correct' && <h2>✔️ Correct!</h2>}
        {feedback === 'wrong' && <h2>❌ Wrong!</h2>}
      </div>
      {/*<button onClick={handleNext}>Next</button>
      <button onClick={handlePrevious}>Previous</button>*/}
      <button onClick={speakDefinition}>
      🔊 Definition
      </button>   
      <button onClick={speakSentence}>
      🔊 Sentence
      </button>  
      </div>
        ) : (
          <div>
          <h2>Results</h2>          
          <center>
          <div class="flip-circle">
        <div class="circle">
            <div class="side front">{percent}%</div>
            <div class="side back">{results.filter(result => result.correct).length} / {test.exams.length}</div>
        </div>
    </div>
         
          <table className="results-table">
      <thead>
        <tr>
          <th>Typed Answer</th>
          <th>Result</th>
          <th>Correct Answer</th>          
        </tr>
      </thead>
      <tbody>
        {results.map((result, index) => (
          <tr key={index} className={result.correct ? 'rcorrect' : 'rwrong'}>
            
            <td className={result.correct ? '':'wrong-alert'}>{result.answerTyped}</td>
            <td>{result.correct ? '✔️' : '❌'}</td>
            <td className={result.correct ? '':'correct-alert'}>{result.word}</td>
            
          </tr>
        ))}
      </tbody>
    </table>
          </center>
        
        </div>
      )} 
    </div>
  );
};

export default SpellingBee;
