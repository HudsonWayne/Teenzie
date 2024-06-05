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

import React, { useEffect, useState } from "react"; // Import useState hook
import "../../tenzies/src/App.css"; // Import your CSS file (assuming path is correct)
import Die from "../../tenzies/src/Die"; // Import Die component

function App() {
  const [dice, setDice] = useState([]); // Initialize state with random dice values

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(Math.floor(Math.random() * 6));
    }
     console.log("new dice ", newDice)
    return newDice;
  }

  useEffect(()=>{

    setDice(allNewDice())
  },[])
  function rollDice(){
    setDice(old =>{
      return allNewDice()
    })
  }

  return (
    <main>
      <div className="dice-container">
        { dice.map((die , index) => <Die value={die} key={index.value} />)}
      </div>
      <button className="roll-dice" onClick={rollDice}>Roll</button>
    </main>
  );
}

export default App;