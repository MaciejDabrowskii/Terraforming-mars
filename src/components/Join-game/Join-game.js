import React, { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { GlobalStatesMethods } from "../../Contexts/Global-state-context";
import { firebaseMethods } from "../../Contexts/Firebase-context";
import "react-toastify/dist/ReactToastify.css";
import "./Join-game.css";

function JoinGame()
{
  const [formVisible, setFormVisible] = useState(false);

  const { fetchDocumentData, checkIfDocumentExists } = firebaseMethods();

  const {
    setGameState,
    setGameID,
  } = GlobalStatesMethods();

  const textField = useRef();

  const navigateTo = useNavigate();

  const toggleForm = () => setFormVisible((prevState) => !prevState);

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

  const onSubmit = async (e) =>
  {
    e.preventDefault();

    if (await checkIfDocumentExists(textField.current.value))
    {
      await fetchDocumentData(textField.current.value)
        .then((res) => setGameState(res))
        .catch((err) => console.log(err));
      setGameID(textField.current.value);
      navigateTo("/Select-player");
    }
    else showToastErrorMessage("Wrong Id");
  };

  return (
    <div className="join-game-container">
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
      <button
        type="button"
        onClick={toggleForm}
        className={formVisible ? "join-btn visible" : "join-btn"}
      >
        JOIN EXISTING GAME
      </button>
      <form className={formVisible ? "join-form" : "join-form hidden"}>
        <input
          type="text"
          className="game-id-input"
          placeholder=" ENTER GAME ID"
          ref={textField}
        />
        <button type="submit" onClick={onSubmit}>CONFIRM</button>
      </form>
    </div>
  );
}

export default JoinGame;
