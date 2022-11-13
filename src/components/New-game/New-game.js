/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef, useState } from "react";
import uniqid from "uniqid";
import { useNavigate } from "react-router";
import { GlobalStatesMethods } from "../../Contexts/Global-state-context";
import { firebaseMethods } from "../../Contexts/Firebase-context";

function NewGAme()
{
  const [nameAlert, setNameAlert] = useState(false);

  const [newGameAlert, setNewGameAlert] = useState(false);

  const navigateTo = useNavigate();

  const textField = useRef();

  const {
    players, gameState, removePlayer, setupPlayer, gameID,
  } = GlobalStatesMethods();

  const { updateDocument, addData } = firebaseMethods();

  const alertName = () =>
  {
    setNameAlert(true);
    setTimeout(() => setNameAlert(false), 3000);
  };

  const alertNewGame = () =>
  {
    setNewGameAlert(true);
    setTimeout(() => setNewGameAlert(false), 3000);
  };

  const onSubmit = (e) =>
  {
    e.preventDefault();
    players.some((player) => player === textField.current.value)
      ? alertName(true)
      : setupPlayer(textField.current.value);
  };

  const newGame = async () =>
  {
    await updateDocument(gameID, gameState)
      .then(navigateTo("/Game"))
      .catch((err) => console.log(err));
  };

  const startGame = async () =>
  {
    gameState.players.length > 1 ? newGame() : alertNewGame();
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
      <form>
        <label>
          Enter player name:
          <input type="text" placeholder="Player Name" ref={textField} />
        </label>
        <button type="submit" onClick={(e) => onSubmit(e)}>Add player</button>
        {nameAlert && <span>Player exist!, please enter alternative name or add number</span>}
      </form>
      <div className="players-container">
        Players:
        <ul className="players-list">
          {gameState.players.map((player) => (
            <ul key={uniqid()}>
              {player.name}
              <button
                type="button"
                onClick={() => removePlayer(player)}
              >
                x
              </button>
            </ul>
          ))}
        </ul>
      </div>
      <button type="button" onClick={startGame}>Start game</button>
      {newGameAlert && <span>min. 2 players to begin</span>}
    </div>
  );
}

export default NewGAme;
