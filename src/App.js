// import React from "react";
// import "../../tenzies/src/App.css"
// import Die from "../../tenzies/src/Die"

// const [dice, setDice] = React.useState(allNewDice())


// export default function App(){
//   function allNewDice(){
//     const newDice = []
//     for (let i = 0; i < 10; i++) {
//       newDice.push(Math.floor(Math.random() * 3));
//     }
//     return newDice
//   }
//   console.log(allNewDice())

//   const diceElements = dice.map(die =><Die value= {die} />)

  

//   return(
//     <main>
//       <div className="dice-container">
//         {diceElements}
        
//       </div>
//     </main>
//   )
// }


// <h1>Tenzies</h1>
//       <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>





// import React, { useEffect, useState } from "react"; // Import useState hook
// import "../../tenzies/src/App.css"; // Import your CSS file (assuming path is correct)
// import Die from "../../tenzies/src/Die"; // Import Die component
// import {nanoid} from 'nanoid'
// function App() {
//   const [dice, setDice] = useState([]); // Initialize state with random dice values

//   function allNewDice() {
//     const newDice = [];
//     for (let i = 0; i < 10; i++) {
//       newDice.push({
//         value: Math.floor(Math.random() * 6), // Random value between 0 (inclusive) and 5 (inclusive)
//         isHeld: false, // Initially not held
//         id: nanoid(), // Generate a unique ID
//       });
//     }
//     console.log("new dice ", newDice);
//     return newDice;
//   }

//   useEffect(()=>{

//     setDice(allNewDice())
//   },[])
//   function rollDice(){
//     setDice(old =>{
//       return allNewDice()
//     })
//   }

//   return (
//     <main>
//       <div className="dice-container">
//         { dice.map((die , index) => <Die value={die.id} key={index.value} />)}
//       </div>
//       <button className="roll-dice" onClick={rollDice}>Roll</button>
//     </main>
//   );
// }

// export default App;
import React, { useEffect, useState } from "react"; // Import useState hook
import "../../tenzies/src/App.css"; // Import your CSS file (assuming path is correct)
import Die from "../../tenzies/src/Die"; // Import Die component
import { nanoid } from "nanoid";

function App() {
  const [dice, setDice] = useState([]); // Initialize state with random dice values
  const [tenzies, setTenzies] = useState(false); // Track Tenzies state (all dice same value and held)

  // Only set initial dice on component mount (no dependency array)
  useEffect(() => {
    setDice(allNewDice());
  }, []);

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function generateNewDie() {
    return {
      value: Math.floor(Math.random() * 6), // Random value between 0 (inclusive) and 5 (inclusive)
      isHeld: false, // Initially not held
      id: nanoid(), // Generate a unique ID
    };
  }

  function rollDice() {
    setDice(oldDice =>
      oldDice.map((die) => (die.isHeld ? die : generateNewDie()))
    );
  }

  function holdDice(id) {
    setDice(prevDice =>
      prevDice.map((die) => (die.id === id ? { ...die, isHeld: !die.isHeld } : die))
    );
  }

  // Check for Tenzies win condition after each dice update
  useEffect(() => {
    const allSameValue = dice.every((die) => die.value === dice[0].value);
    const allHeld = dice.every((die) => die.isHeld);
    setTenzies(allSameValue && allHeld);
  }, [dice]);

  return (
    <main>
      {tenzies && <h1>You Win!</h1>}
      <div className="dice-container">
        {dice.map((die, index) => (
          <Die
            value={die.value}
            key={die.id}
            isHeld={die.isHeld}
            holdDice={() => holdDice(die.id)}
          />
        ))}
      </div>
      <button className="roll-dice" onClick={rollDice} disabled={tenzies}>
        Roll
      </button>
    </main>
  );
}

export default App;
