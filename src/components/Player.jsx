import { useState, useRef } from "react";

// You then create a REF value like below and you can store it in a constant or variable and give it any name you want.
// Now here I will create a REF value to, in the end, get the value that will be entered into this input field.
// One thing you will probably do the most with those refs is that you can connect them to JSX elements.
// You can do that with a special prop that's supported by all React Components
// automatically out of the box, the ref prop, which just like the key prop is a special prop.

// <input ref={playerName} .../> and the input component is connected to the useRef

const Player = () => {
  const playerName = useRef();

  const [player, setPlayer] = useState(null);
  // const [submitted, setSubmitted] = useState(false);

  // const handleChange = (e) => {
  //   e.preventDefault();
  //   setSubmitted(false);
  //   setPlayer(e.target.value);
  // };

  const handleClick = () => {
    setPlayer(playerName.current.value);
    // We now get access to the input element. First, we have to access a current property.
    // This ref value you are getting back from useRef will always be a JavaScript object
    // that will always have only a current property.
    // It is in the current property that the actual ref value (connected input in this case) will be stored.
    // We can now update the state and pass this value which we are getting directly from the input field as value
    // playerName.current.value
    // We can get rid of both handleChange function and submitted state, the ref is enough.

    // IMPORTANT: We have to use a state because if we pass playerName.current.value directly below it doesn't work,
    // because when we render the code for the first time, the connection is not established yet and therefore
    // playerName.current would be undefined. It is in the next render cycle that we will be able to reach the value.
    // Another key thing is that whenever ref changes, the component function doesn't re-execute whereas state does.
    playerName.current.value = '';
  };

  return (
    <section id="player">
      {/* 
      ?? is a ternary shortcut, if player is truthy render it, otherwise "unknown entity"
      */}
      <h2>Welcome {player ?? 'unknown entity'}</h2>
      <p>
        <input ref={playerName} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
};

export default Player;
