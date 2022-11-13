/* eslint-disable max-len */
import "./App.css";

import React, { useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onSnapshot, doc, collection } from "firebase/firestore";
import { GlobalStatesMethods } from "./Contexts/Global-state-context";
import HomePage from "./components/Home-page/Home-page";
import { firebaseMethods } from "./Contexts/Firebase-context";
import NewGAme from "./components/New-game/New-game";
import Game from "./components/Game/Game";
import PlayerPage from "./components/Player-page/Player-page";
import PlayerSelect from "./components/Player-select/Player-select";

function App()
{
  const {
    gameState: { players }, gameState, gameID, setGameState,
  } = GlobalStatesMethods();

  const { updateDocument } = firebaseMethods();
  // const {
  //   gameID,
  //   players,
  //   gameState,
  //   setGameID,
  //   setPlayers,
  //   setGameState,
  //   addResourceValue,
  //   subtractResourceValue,
  //   addResourceProduction,
  //   subtractResourceProduction,
  //   addGeneration,
  // } = GlobalStatesMethods();

  // const { addData, addDataa, checkIfDocumentExists } = firebaseMethods();

  // return (
  //   <div className="App">
  //     <button onClick={newGame} type="button">Generate</button>
  //     {!isEmpty(gameState.players)
  //     && (
  //     <div>
  //       {gameState.players.map((player) => (
  //         <ul>
  //           {Object.keys(player.resources)
  //             .map((resource) => (
  //               <li key={uniqid()}>
  //                 {resource
  //                 + player.resources[resource].production
  //                 + player.resources[resource].value }
  //                 <button
  //                   onClick={() => addResourceValue(player.name, resource)}
  //                   type="button"
  //                 >
  //                   addV
  //                 </button>
  //                 <button
  //                   onClick={() => subtractResourceValue(player.name, resource)}
  //                   type="button"
  //                 >
  //                   subtractV
  //                 </button>
  //                 <button
  //                   onClick={() => addResourceProduction(player.name, resource)}
  //                   type="button"
  //                 >
  //                   addP
  //                 </button>
  //                 <button
  //                   onClick={() => subtractResourceProduction(player.name, resource)}
  //                   type="button"
  //                 >
  //                   subtractP
  //                 </button>
  //               </li>
  //             ))}
  //         </ul>
  //       ))}

  //     </div>
  //     )}
  //     <h1>{gameID}</h1>
  //   </div>
  // );

  useEffect(() =>
  {
    updateDocument(gameID, gameState);
  }, [gameState]);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/New-game" element={<NewGAme />} />
        <Route path="/Game" element={<Game />} />
        <Route path="/Select-player" element={<PlayerSelect />} />
        {players.map((player) => (
          <Route
            path={`/${player.name}`}
            key={player.name}
            element={<PlayerPage player={player} />}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
