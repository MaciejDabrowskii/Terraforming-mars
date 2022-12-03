/* eslint-disable max-len */
import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { GlobalStatesMethods } from "./Contexts/Global-state-context";
import HomePage from "./components/Home-page/Home-page";
import { firebaseMethods } from "./Contexts/Firebase-context";
import NewGame from "./components/New-game/New-game";
import Game from "./components/Game/Game";
import PlayerPage from "./components/Player-page/Player-page";
import PlayerSelect from "./components/Player-select/Player-select";

function App()
{
  const {
    gameState: { players }, gameState, gameID,
  } = GlobalStatesMethods();

  const { updateDocument } = firebaseMethods();

  useEffect(() =>
  {
    if (players.length <= 1) return;
    updateDocument(gameID, gameState);
  }, [gameState]);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/New-game"
          element={(<NewGame />)}
        />
        <Route path="/Game" element={<Game />} />
        <Route path="/Select-player" element={<PlayerSelect />} />
        { (players.length > 1) && (players.map((player) => (
          <Route
            path={`/${player.name}`}
            key={player.name}
            element={<PlayerPage player={player} />}
          />
        )))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
