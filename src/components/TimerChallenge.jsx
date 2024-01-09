import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

const TimerChallenge = ({ title, targetTime }) => {
  const timer = useRef();
  const dialog = useRef();

  // const [timerStarted, setTimerStarted] = useState(false);
  // const [timerExpired, setTimerExpired] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    
    dialog.current.open();
  }

  const handleReset = () => {
    setTimeRemaining(targetTime * 1000);
  }

  const handleStart = () => {
    // We can now use this timer and set timer.current
    // because you always must target this current property
    // as you learned and set this equal to the timer.
    // Now we can clear the timeout by clearing it with timer.current (in handleStop)
    // because in this current property, we'll store this pointer at this timer.

    timer.current = setInterval(() => {
      // setTimerExpired(true);
      // dialog.current.open();
      // Since we changed setTimeout with setInterval we don't need the previous states anymore, just time remaining now.
      // We set the interval at 10 milliseconds and we calculate the time remaining from stopping - 10.
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);

      // Instead of using open inside the dialog element in the ResultModal component,
      // we create a ref called dialog and passed it as prop, which will then be used in the dialog element as ref (built-in prop for dialog).
      // Then here we use showModal() because the built-in dialog element has such a method which you can call to show it.
      // We now need to make sure below that the ResultModal is always visible and not conditionally rendered.
      // UPDATE: We replaced showModal() with open() which is now in ResultModal inside the useImperativeHandle
    }, 10);

    // setTimerStarted(true);
  };

  // IMPORTANT: Every component instance of this TimerChallenge component will get its own timer ref that works totally independent
  // from the other refs that belong to the other instances of that component.
  // Another special thing about refs like state values, the value here is not lost when this component function re-executes.
  // But unlike state, setting this value also doesn't cause this component function to execute again
  // and therefore, now with that, finally, we can save this and start and stop this and we don't get you lost.

  const handleStop = () => {
    // clearTimeout(timer.current);
    dialog.current.open();
    clearInterval(timer.current);
  };

  return (
    <>
      {/* 
    We conditionally render the ResultModal component and pass targetTime={targetTime}
    */}
      {/* {timerExpired && (
        <ResultModal ref={dialog} targetTime={targetTime} result="lost" />
      )} */}
      <ResultModal ref={dialog} targetTime={targetTime} remainingTime={timeRemaining} onReset={handleReset} />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Time is running..." : "Timer Inactive"}
        </p>
      </section>
    </>
  );
};

export default TimerChallenge;
