/* eslint-disable max-len */
/* eslint-disable consistent-return */
import React, { useEffect } from "react";
import { onSnapshot, doc, collection } from "firebase/firestore";
import { GlobalStatesMethods } from "../../Contexts/Global-state-context";
import Player from "../Player/Player";
import GenerationBar from "../Generation-bar/Generation-bar";
import { database } from "../../Firebase/Firebase-init";

function Game()
{
  const {
    gameState, gameID, addGeneration, addProductionToValue, setGameState,
  } = GlobalStatesMethods();

  const { players } = gameState;

  const endGeneration = () =>
  {
    players.forEach((player) =>
    {
      const { name } = player;

      const resources = Object.keys(player.resources);

      resources.forEach((resource) => addProductionToValue(name, resource));
    });
    addGeneration();
  };

  useEffect(() =>
  {
    const unsubscribe = onSnapshot(doc(database, "TerraformingMars", gameID), (data) => setGameState(data.data()));

    return () =>
    {
      unsubscribe();
    };
  }, []);
  return (

    <div className="game-container">
      {gameID
        ? (
          <>
            <GenerationBar barText={`Game id: ${gameID}`} />
            <div className="Players-container">
              {players.map((player) => (<Player player={player} />))}
            </div>
            <button
              type="button"
              onClick={() => endGeneration()}
            >
              End Generation
            </button>
          </>
        )
        : <p>waiting...</p>}

    </div>
  );
}

export default Game;
