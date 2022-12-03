/* eslint-disable max-len */
import React from "react";
import { Link } from "react-router-dom";
import { GlobalStatesMethods } from "../../Contexts/Global-state-context";

function PlayerSelect()
{
  const { gameState: { players } } = GlobalStatesMethods();

  return (
    <div className="player-select-container">
      <h1>Select Player</h1>
      {players.map((player) => (<Link key={player.name} to={`/${player.name}`}>{player.name}</Link>))}
    </div>
  );
}

export default PlayerSelect;
