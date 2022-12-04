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

    const clearTextfield = () =>
    {
      textField.current.value = "";
    };

    const create = () =>
    {
      textField.current.value !== ""
        ? (
          setupPlayer(textField.current.value),
          showToastSuccessMessage("Player created!"),
          clearTextfield()
        )
        : showToastErrorMessage("Name must be at least 1 character long!");
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
      <form className="player-form">
        <fieldset className="player-form-fieldset">
          <legend className="player-form-legend">ADD NEW PLAYER</legend>
          <label className="player-form-label">
            ENTER PLAYER NAME:
          </label>
          <input
            type="text"
            placeholder="PLAYER NAME"
            ref={textField}
            className="player-form-input"
          />
          <button
            type="submit"
            className="player-form-submit"
            onClick={(e) => onSubmit(e)}
          >
            ADD PLAYER
          </button>
          {gameState.players.length > 0 && (
            <div className="players-container">
              <h3 className="players-header">PLAYERS</h3>
              <ul className="players-list">
                {gameState.players.map((player) => (
                  <ul key={player.name} className="players-list-element">
                    {player.name}
                    <button
                      type="button"
                      className="players-list-btn"
                      onClick={() => removePlayer(player.name)}
                    >
                      <span>✖</span>
                    </button>
                  </ul>
                ))}
              </ul>
              <button
                type="button"
                onClick={startGame}
                className="start-game-btn"
              >
                START GAME
              </button>
            </div>
          )}
        </fieldset>
      </form>

    </div>
  );
}

export default NewGAme;
