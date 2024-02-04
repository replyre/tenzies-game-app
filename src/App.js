import React from "react";
import "./style.css";
import { Die } from "./library";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [count, setCount] = React.useState(0);
  const [die, setElement] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  React.useEffect(() => {
    const allHeld = die.every((die) => die.isheld);
    const firstValue = die[0].value;
    const allSetValue = die.every((die) => die.value === firstValue);
    if (allHeld && allSetValue) {
      setTenzies(true);
      console.log("You won");
      console.log(count);
    }
  }, [die]);
  // console.log(die);

  function generateDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isheld: false,
      id: nanoid(),
    };
  }
  function allNewDice() {
    const DiceArr = [];
    for (let i = 0; i < 10; i++) {
      DiceArr.push(generateDie());
    }
    return DiceArr;
  }
  function rolldice() {
 if(!tenzies){
  setCount((prevCount) => prevCount + 1)
    setElement((oldDice) =>
      oldDice.map((die) => {
        return die.isheld ? die : generateDie();
      })
    )
  }else{
    setCount(0);
    setTenzies(false);
    setElement(allNewDice());
  }
}

  function holdDice(id) {
    setElement((prevDice) =>
      prevDice.map((die) => {
        return die.id === id ? { ...die, isheld: !die.isheld } : die;
      })
    );
  }

  const diceElement = die.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isheld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <div className="container">
      {tenzies && <Confetti />}
      <h1>Tenzies</h1>
      <p>
        Roll untill all die are the same. Click each die to freeze it at its
        current valuee between rolls.
      </p>
      <div className="die-grid">{diceElement}</div>
      <button className="button" onClick={rolldice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </div>
  );
}
