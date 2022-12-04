/* eslint-disable max-len */
/* eslint-disable consistent-return */
import React, { useEffect, useState } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import { GlobalStatesMethods } from "../../Contexts/Global-state-context";
import Player from "../Player/Player";
import GenerationBar from "../Generation-bar/Generation-bar";
import { database } from "../../Firebase/Firebase-init";
import GenerationEndOverlay from "../Generation-end-overlay/Generation-end-overlay";
import "react-toastify/dist/ReactToastify.css";
import "./Game.css";

function Game()
{
  const {
    gameState,
    gameID,
    addGeneration,
    addProductionToValue,
    addResourceValue,
    subtractResourceValue,
    setGameState,
  } = GlobalStatesMethods();

  const { players } = gameState;

  const [showOverlay, setShowOverlay] = useState(false);

  const showToastInfoMessage = (infoMessage) => toast.info(infoMessage, {
    position: "top-center",
    autoClose: 1500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });

  const endGeneration = () =>
  {
    players.forEach((player) =>
    {
      const { name } = player;

      const resources = Object.keys(player.resources);

      resources.forEach((resource) =>
      {
        if (resource === "Electricity")
        {
          const ElectricityValue = player.resources.Electricity.value;

          addResourceValue(name, "Heat", ElectricityValue);
          subtractResourceValue(name, "Electricity", ElectricityValue);
        }

        if (resource === "Terraformation level")
        {
          const terraformationLevelValue = player.resources["Terraformation level"].value;

          addResourceValue(name, "Money", terraformationLevelValue);
        }
      });
      resources.forEach((resource) => addProductionToValue(name, resource));
    });
    addGeneration();
    showToastInfoMessage("Generation Ended");
  };

  const handleKeyPress = (event) =>
  {
    if (event.key === "Enter") setShowOverlay(true);
  };

  useEffect(() =>
  {
    const unsubscribe = onSnapshot(doc(database, "TerraformingMars", gameID), (data) => setGameState(data.data()));

    document.addEventListener("keydown", handleKeyPress);

    return () =>
    {
      unsubscribe();
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (

    <div className="game-container">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {showOverlay && (
        <GenerationEndOverlay
          setShowOverlay={setShowOverlay}
          endGeneration={endGeneration}
        />
      )}
      {gameID
        ? (
          <>
            <GenerationBar
              barText={gameID}
              displayGenerationIndicator
              showToastInfoMessage={showToastInfoMessage}
            />
            <div className="Players-container">
              {players.map((player) => (<Player key={player.name} player={player} displayIndicator={false} />))}
            </div>
            <button
              type="button"
              className="end-Generation"
              onClick={() => setShowOverlay(true)}
            >
              END GENERATION
            </button>
          </>
        )
        : <p>waiting...</p>}

    </div>
  );
}

export default Game;
