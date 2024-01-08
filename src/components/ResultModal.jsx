import { forwardRef } from "react";

// We cannot just pass a ref from another component as a prop, we need to use forwardRef.
// Step 1 - import forwardRef and wrap the function below inside.
// Step 2 - the new function now takes 2 parameters, the props and then ref as shown below.

const ResultModal = forwardRef(function ResultModal(
  { result, targetTime },
  ref
) {
  return (
    // Dialog is a built-in element which by default is invisible, but we can make it visible by adding the 'open' attribute.
    // IMPORTANT: the dialog element actually comes with a built-in backdrop element that will be displayed behind the dialog
    // but unfortunately this built-in backdrop will not be shown if you force the dialog to be visible
    // by setting open to true like we did initially below.
    <dialog ref={ref} className="result-modal">
      <h2>You {result}</h2>
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with <strong>X seconds left.</strong>
      </p>
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>
  );
});

export default ResultModal;
