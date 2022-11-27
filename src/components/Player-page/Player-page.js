/* eslint-disable max-len */
import React, { useEffect } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import Player from "../Player/Player";
import { database } from "../../Firebase/Firebase-init";
import { GlobalStatesMethods } from "../../Contexts/Global-state-context";

function PlayerPage({ player })
{
  const { gameID, setGameState } = GlobalStatesMethods();

  useEffect(() =>
  {
    const unsubscribe = onSnapshot(doc(database, "TerraformingMars", gameID), (data) => setGameState(data.data()));

    return () =>
    {
      unsubscribe();
    };
  }, []);

  return (
    <div className="player-page">
      <Player player={player} />
    </div>
  );
}

export default PlayerPage;
// useEffect(() =>
// {
//   const unsubscribe = onSnapshot(doc(database, "TerraformingMars", gameID), (data) =>
//   {
//     setGameState({
//       ...data.data(),
//       players: data.data().players.map((dataPlayer) =>
//       {
//         const sortedRescources = Object.entries(dataPlayer.resources)
//           .sort(([, a], [, b]) => a.index - b.index)
//           .reduce((object, [key, value]) => ({ ...object, [key]: value }), {});

//         console.log(sortedRescources);

//         return { ...dataPlayer, resources: sortedRescources };
//       }),
//     });
//   });
