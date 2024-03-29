import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

// We cannot just pass a ref from another component as a prop, we need to use forwardRef.
// Step 1 - import forwardRef and wrap the function below inside.
// Step 2 - the new function now takes 2 parameters, the props and then ref as shown below.

const ResultModal = forwardRef(function ResultModal(
  { result, targetTime, remainingTime, onReset },
  ref
) {
  const dialog = useRef();
  const userLost = remainingTime <= 0;
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);
  // We can call this hook in this component function to define properties and methods that should be accessible
  // on this component from outside this component. Now, useImperativeHandle needs two arguments
  // FIRST - must be this ref which you get from forwardRef.
  // SECOND - must be a function that then returns an object which groups all the properties
  // and methods that should be exposed by this component to other components.
  // In this case the open() method which will replace the showModal() in the parent component.

  // The idea now is to detach this dialog element from any other outer component.
  // Step 1 - We import useRef and add it at the top with name dialog.
  // Step 2 - We replace ref={ref} with ref={dialog} inside dialog below.
  // Step 3 - I now use dialog.current.showModal() inside the open() below.
  // Now we have passed the dialog in the TimerChallenge component and through useImperativeHandle the connection is established,
  // we detached the TimerChallenge component from the dialog element in this ResultModal component.

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });
  // We use portals to move code inside specific elements of the DOM.
  // In our case we used it to move the modal inside a different <div> and not inside the content, in the HTML file.
  // IMPORTANT: Import createPortal from 'react-dom', then return createPortal like below and pass the entire JSX code inside
  // as first argument, the second argument is the element you want to move the code to, in our case the <div> with ID modal.
  return createPortal(
    // Dialog is a built-in element which by default is invisible, but we can make it visible by adding the 'open' attribute.
    // IMPORTANT: the dialog element actually comes with a built-in backdrop element that will be displayed behind the dialog
    // but unfortunately this built-in backdrop will not be shown if you force the dialog to be visible
    // by setting open to true like we did initially below.

    // IMPORTANT: dialog can be close with escape(ESC), however it won't trigger the onReset,
    // therefore we need to pass it inside the built-in onClose prop like below.
    <dialog ref={dialog} className="result-modal" onClose={onReset}>
      {userLost ? <h2>You lost</h2> : <h2>Your Score: {score}</h2>}
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with{" "}
        <strong>{formattedRemainingTime} seconds left.</strong>
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default ResultModal;
