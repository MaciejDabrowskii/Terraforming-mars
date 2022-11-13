/* eslint-disable no-unused-expressions */
import React, { useRef, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { firebaseMethods } from "../../Contexts/Firebase-context";
import { GlobalStatesMethods } from "../../Contexts/Global-state-context";

function HomePage()
{
  const { fetchDocumentData, checkIfDocumentExists } = firebaseMethods();

  const {
    gameState,
    setGameState,
    gameID,
    setGameID,
    setPlayers,
  } = GlobalStatesMethods();

  const textField = useRef();

  const [formVisible, setFormVisible] = useState(false);

  const [showAlert, setShowAlert] = useState(false);

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
    }
    else alert();
  };

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div className="home-page">
        <h1 className="home-page-title">Terraforming Mars</h1>
        <div className="home-page-options">
          <button type="button">Create New Game</button>
          <button type="button" onClick={toggleForm}>Join Existing Game</button>
          { formVisible && (
          <form>
            <input
              type="text"
              className="asd"
              placeholder="Type game ID"
              ref={textField}
            />
            <button type="submit" className="" onClick={onSubmit}>Confirm</button>
            {showAlert && <span>*no documento</span>}
          </form>
          )}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default HomePage;
