import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);
  let timer;

  useEffect(() => {
    // Start the timer when the component mounts
    timer = setTimeout(() => {
      onAnswered(false); // Trigger incorrect answer after 10 seconds
      setTimeRemaining(10); // Reset timer to 10 seconds
    }, 10000);

    // Decrement the timer by 1 second every second
    const intervalId = setInterval(() => {
      setTimeRemaining(prevTime => {
        if (prevTime <= 1) {
          clearInterval(intervalId); // Clear the interval when the timer reaches 0 or unmounts
          return 10; // Reset timer to 10 seconds
        } else {
          return prevTime - 1; // Decrement timer
        }
      });
    }, 1000);

    return () => {
      clearTimeout(timer); // Clear the timeout when the component unmounts
      clearInterval(intervalId); // Clear the interval when the component unmounts
    };
  }, [onAnswered]);

  function handleAnswer(isCorrect) {
    clearTimeout(timer);
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
