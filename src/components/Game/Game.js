import React, { useEffect } from "react";
import { firebaseMethods } from "../../Contexts/Firebase-context";
import { GlobalStatesMethods } from "../../Contexts/Global-state-context";

function Game()
{
  const { addData } = firebaseMethods();

  const { gameState } = GlobalStatesMethods();

  const newGame = async () =>
  {
    await addData(gameState)
      .then((docRef) => console.log(docRef))
      .catch((err) => console.log(err));
    // await checkIfDocumentExists("fffff")
    //   .then((res) => console.log(res));
  };

  useEffect(() =>
  {
    if (gameState) return newGame;
  }, []);

  return (
    <div>Game</div>
  );
}

export default Game;
