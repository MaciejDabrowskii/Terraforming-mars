import "./App.css";
import uniqid from "uniqid";
import React, { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { GlobalStatesMethods } from "./Contexts/Global-state-context";
import HomePage from "./components/Home-page/Home-page";
import { firebaseMethods } from "./Contexts/Firebase-context";

function App()
{
  const {
    gameID,
    players,
    gameState,
    setGameID,
    setPlayers,
    setGameState,
    addResourceValue,
    subtractResourceValue,
    addResourceProduction,
    subtractResourceProduction,
    addGeneration,
  } = GlobalStatesMethods();

  const { addData, addDataa, checkIfDocumentExists } = firebaseMethods();

  const setupPlayer = (name) =>
  {
    setGameState((prevState) => (
      {
        ...prevState,
        players: [
          ...prevState.players,
          {
            name,
            resources: {
              money: { production: 0, value: 0 },
              steel: { production: 0, value: 0 },
              titanium: { production: 0, value: 0 },
              vegetation: { production: 0, value: 0 },
              electricity: { production: 0, value: 0 },
              heat: { production: 0, value: 0 },
              terrafomLev: { production: 0, value: 0 },
            },
          },
        ],
      }
    ));
  };

  const newGame = async () =>
  {
    players.forEach(setupPlayer);
    await addData(gameState)
      .then((docRef) => console.log(docRef))
      .catch((err) => console.log(err));
    // await checkIfDocumentExists("fffff")
    //   .then((res) => console.log(res));
  };

  return (
    <div className="App">
      <button onClick={newGame} type="button">Generate</button>
      {!isEmpty(gameState.players)
      && (
      <div>
        {gameState.players.map((player) => (
          <ul>
            {Object.keys(player.resources)
              .map((resource) => (
                <li key={uniqid()}>
                  {resource
                  + player.resources[resource].production
                  + player.resources[resource].value }
                  <button
                    onClick={() => addResourceValue(player.name, resource)}
                    type="button"
                  >
                    addV
                  </button>
                  <button
                    onClick={() => subtractResourceValue(player.name, resource)}
                    type="button"
                  >
                    subtractV
                  </button>
                  <button
                    onClick={() => addResourceProduction(player.name, resource)}
                    type="button"
                  >
                    addP
                  </button>
                  <button
                    onClick={() => subtractResourceProduction(player.name, resource)}
                    type="button"
                  >
                    subtractP
                  </button>
                </li>
              ))}
          </ul>
        ))}

      </div>
      )}
      <h1>{gameID}</h1>
    </div>
  );

  // return (
  //   <div>
  //     <HomePage />
  //     {gameState.players.map((player) => (<h3>{player.name}</h3>))}
  //     <h1>{gameID}</h1>
  //     {players.map((player) => (<h1>{player}</h1>))}
  //   </div>
  // );
}

export default App;
