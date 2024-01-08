import { useState, useRef } from "react";

// You then create a REF value like below and you can store it in a constant or variable and give it any name you want.
// Now here I will create a REF value to, in the end, get the value that will be entered into this input field.
// One thing you will probably do the most with those refs is that you can connect them to JSX elements.
// You can do that with a special prop that's supported by all React Components
// automatically out of the box, the ref prop, which just like the key prop is a special prop.

// <input ref={playerName} .../> and the input component is connected to the useRef

const Player = () => {

  const playerName = useRef();

  const [player, setPlayer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    setSubmitted(false);
    setPlayer(e.target.value);
  };

  const handleClick = () => {
    playerName.current
    // We can now access the input
  };

  return (
    <section id="player">
      <h2>Welcome {submitted ? player : "unknown entity"}</h2>
      <p>
        <input ref={playerName} type="text" onChange={handleChange} value={player} />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
};

export default Player;
