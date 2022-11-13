import React, { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { GlobalStatesMethods } from "../../Contexts/Global-state-context";
import { firebaseMethods } from "../../Contexts/Firebase-context";

function JoinGame()
{
  const [formVisible, setFormVisible] = useState(false);

  const [showAlert, setShowAlert] = useState(false);

  const { fetchDocumentData, checkIfDocumentExists } = firebaseMethods();

  const {
    gameState,
    setGameState,
    setGameID,
    setPlayers,
  } = GlobalStatesMethods();

  const textField = useRef();

  const navigateTo = useNavigate();

  const toggleForm = () => setFormVisible((prevState) => !prevState);

  const alert = () =>
  {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const onSubmit = async (e) =>
  {
    e.preventDefault();

    if (await checkIfDocumentExists(textField.current.value))
    {
      await fetchDocumentData(textField.current.value)
        .then((res) => setGameState(res))
        .catch((err) => console.log(err));
      setGameID(textField.current.value);
      setPlayers(() => gameState.players.map((player) => player.name));
      navigateTo("/Select-player");
    }
    else alert();
  };

  return (
    <div className="join-game-container">
      <button type="button" onClick={toggleForm}>Join Existing Game</button>
      { formVisible && (
      <form>
        <input
          type="text"
          className="game-id-input"
          placeholder="Game ID"
          ref={textField}
        />
        <button type="submit" className="" onClick={onSubmit}>Confirm</button>
        {showAlert && <span>*no documento</span>}
      </form>
      )}
    </div>
  );
}

export default JoinGame;
