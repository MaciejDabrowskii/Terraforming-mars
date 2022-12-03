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

function Game()
{
  const {
    gameState,
    gameID,
    addGeneration,
    addProductionToValue,
    addSpecificResourceValue,
    subtractSpecificResourceValue,
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

          addSpecificResourceValue(name, "Heat", ElectricityValue);
          subtractSpecificResourceValue(name, "Electricity", ElectricityValue);
        }
      });
      resources.forEach((resource) => addProductionToValue(name, resource));
    });
    addGeneration();
    showToastInfoMessage("Generation Ended");
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
        showOverlay={showOverlay}
        setShowOverlay={setShowOverlay}
        endGeneration={endGeneration}
      />
      )}
      {gameID
        ? (
          <>
            <GenerationBar
              barText={{ value: gameID, type: "id" }}
              displayGenerationIndicator
              showToastInfoMessage={showToastInfoMessage}
            />
            <div className="Players-container">
              {players.map((player) => (<Player player={player} displayIndicator={false} />))}
            </div>
            <button
              type="button"
              onClick={() => setShowOverlay(true)}
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
