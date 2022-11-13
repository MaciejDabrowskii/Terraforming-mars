/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState } from "react";
import uniqid from "uniqid";
import { GlobalStatesMethods } from "../../Contexts/Global-state-context";

function NewGAme()
{
  const [nameAlert, setNameAlert] = useState(false);

  const [newGameAlert, setNewGameAlert] = useState(false);

  const textField = useRef();

  const {
    players, gameState, addPlayer, removePlayer, setupPlayer,
  } = GlobalStatesMethods();

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
    return players.some((player) => player === textField.current.value)
      ? alertName(true)
      : addPlayer(textField.current.value);
  };

  const startGame = () => (players.length > 1 ? players.forEach(setupPlayer) : alertNewGame());

  return (
    <div className="New-game-container">
      <form>
        <label>
          Enter player name:
          <input type="text" placeholder="Player Name" ref={textField} />
          {nameAlert && <span>Player exist!, please enter alternative name or add number</span>}
        </label>
        <button type="submit" onClick={onSubmit}>Add player</button>
      </form>
      <div className="players-container">
        Players:
        <ul className="players-list">
          {players.map((player) => (
            <ul key={uniqid()}>
              <button
                type="button"
                onClick={() => removePlayer(player)}
              >
                x
              </button>
              {player}
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
