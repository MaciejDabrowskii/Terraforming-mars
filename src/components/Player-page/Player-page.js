/* eslint-disable max-len */
import React, { useEffect } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import Player from "../Player/Player";
import { database } from "../../Firebase/Firebase-init";
import { GlobalStatesMethods } from "../../Contexts/Global-state-context";
import "react-toastify/dist/ReactToastify.css";

function PlayerPage({ player })
{
  const {
    gameID, gameState, setGameState, setGameID,
  } = GlobalStatesMethods();

  const { generation } = gameState;

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

  useEffect(() =>
  {
    if (generation > 1) showToastInfoMessage("Generation Ended");
  }, [generation]);

  useEffect(() =>
  {
    const unsubscribe = onSnapshot(doc(database, "TerraformingMars", gameID), (data) => setGameState(data.data()));

    if (localStorage.getItem("gameState") !== null) setGameState(JSON.parse(localStorage.getItem("gameState")));
    if (localStorage.getItem("gameID") !== null) setGameID(JSON.parse(localStorage.getItem("gameID")));

    return () =>
    {
      unsubscribe();
    };
  }, []);

  return (
    <div className="player-page">
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
      <Player
        player={player}
        displayGenerationIndicator
      />
    </div>
  );
}

export default PlayerPage;
