import React from "react";
import { GlobalStatesMethods } from "../../Contexts/Global-state-context";

function Player()
{
  const { gameState } = GlobalStatesMethods();

  return (
    <div>Player</div>
  );
}

export default Player;
