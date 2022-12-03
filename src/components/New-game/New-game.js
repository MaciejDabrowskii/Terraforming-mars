/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { GlobalStatesMethods } from "../../Contexts/Global-state-context";
import { firebaseMethods } from "../../Contexts/Firebase-context";
import "react-toastify/dist/ReactToastify.css";
import "./New-game.css";

function NewGAme()
{
  const navigateTo = useNavigate();

  const textField = useRef();

  const {
    gameState, removePlayer, setupPlayer, gameID,
  } = GlobalStatesMethods();

  const { updateDocument, addData } = firebaseMethods();

  const showToastErrorMessage = (errorMessage) => toast.error(errorMessage, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });

  const showToastSuccessMessage = (successMessage) => toast.success(successMessage, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });

  const onSubmit = (e) =>
  {
    e.preventDefault();

    const { players } = gameState;

    const create = () =>
    {
      setupPlayer(textField.current.value);
      showToastSuccessMessage("Player created!");
    };

    players.some((player) => player.name === textField.current.value)
      ? showToastErrorMessage("Player exist!, please enter alternative name or add number")
      : create();
  };

  const newGame = async () =>
  {
    await updateDocument(gameID, gameState)
      .then(navigateTo("/Game"))
      .catch((err) => console.log(err));
  };

  const startGame = async () =>
  {
    const { players } = gameState;

    players.length > 1
      ? newGame()
      : showToastErrorMessage("min. 2 players to begin");
  };

  useEffect(() =>
  {
    if (!gameID)
    {
      addData({});
    }
  }, []);

  return (
    <div className="New-game-container">
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
      <form>
        <label>
          Enter player name:
          <input type="text" placeholder="Player Name" ref={textField} />
        </label>
        <button type="submit" onClick={(e) => onSubmit(e)}>Add player</button>
      </form>
      <div className="players-container">
        Players:
        <ul className="players-list">
          {gameState.players.map((player) => (
            <ul key={player.name}>
              {player.name}
              <button
                type="button"
                onClick={() => removePlayer(player.name)}
              >
                x
              </button>
            </ul>
          ))}
        </ul>
      </div>
      <button type="button" onClick={startGame}>Start game</button>
    </div>
  );
}

export default NewGAme;
