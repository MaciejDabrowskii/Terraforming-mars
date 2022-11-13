/* eslint-disable max-len */
/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState, useContext } from "react";

const GlobalStateContext = React.createContext();

export function GlobalStatesMethods()
{
  return useContext(GlobalStateContext);
}

export function GlobalStateProvider({ children })
{
  const [gameID, setGameID] = useState(null);

  const [players, setPlayers] = useState([]);

  const [gameState, setGameState] = useState(
    {
      players: [],
      generation: 1,
    },
  );

  const setupPlayer = (name) =>
  {
    setGameState((prevState) => (
      {
        ...prevState,
        players: [
          ...prevState.players,
          {
            name,
            resources: {
              Money: { production: 0, value: 0 },
              Steel: { production: 0, value: 0 },
              Titanium: { production: 0, value: 0 },
              Vegetation: { production: 0, value: 0 },
              Electricity: { production: 0, value: 0 },
              Heat: { production: 0, value: 0 },
              "Terraformation level": { production: 0, value: 0 },
            },
          },
        ],
      }
    ));
  };

  const addGeneration = () => setGameState((prevState) => (
    { ...prevState, generation: prevState.generation + 1 }));

  const addResourceValue = (playerName, resource) =>
  {
    setGameState((prevState) => ({
      ...prevState,
      players: prevState.players.map((player) => (
        player.name === playerName
          ? {
            ...player,
            resources: {
              ...player.resources,
              [resource]: {
                ...player.resources[resource],
                value: player.resources[resource].value + 1,
              },
            },
          }
          : player
      )),
    }));
  };

  const subtractResourceValue = (playerName, resource) =>
  {
    setGameState((prevState) => ({
      ...prevState,
      players: prevState.players.map((player) => (
        player.name === playerName
          ? {
            ...player,
            resources: {
              ...player.resources,
              [resource]: {
                ...player.resources[resource],
                value: player.resources[resource].value - 1,
              },
            },
          }
          : player
      )),
    }));
  };

  const addResourceProduction = (playerName, resource) =>
  {
    setGameState((prevState) => ({
      ...prevState,
      players: prevState.players.map((player) => (
        player.name === playerName
          ? {
            ...player,
            resources: {
              ...player.resources,
              [resource]: {
                ...player.resources[resource],
                production: player.resources[resource].production + 1,
              },
            },
          }
          : player
      )),
    }));
  };

  const subtractResourceProduction = (playerName, resource) =>
  {
    setGameState((prevState) => ({
      ...prevState,
      players: prevState.players.map((player) => (
        player.name === playerName
          ? {
            ...player,
            resources: {
              ...player.resources,
              [resource]: {
                ...player.resources[resource],
                production: player.resources[resource].production - 1,
              },
            },
          }
          : player
      )),
    }));
  };

  const addProductionToValue = (playerName, resource) =>
  {
    setGameState((prevState) => ({
      ...prevState,
      players: prevState.players.map((player) => (
        player.name === playerName
          ? {
            ...player,
            resources: {
              ...player.resources,
              [resource]: {
                ...player.resources[resource],
                value: player.resources[resource].value + player.resources[resource].production,
              },
            },
          }
          : player
      )),
    }));
  };

  const addPlayer = (newPlayer) => setPlayers([...players, newPlayer]);

  const removePlayer = (playerName) => setPlayers(players.filter((player) => player !== playerName));

  const methods = {
    gameID,
    players,
    gameState,
    setGameID,
    setPlayers,
    setGameState,
    addResourceValue,
    subtractResourceValue,
    addResourceProduction,
    subtractResourceProduction,
    addGeneration,
    addPlayer,
    removePlayer,
    setupPlayer,
    addProductionToValue,
  };

  return (
    <GlobalStateContext.Provider value={methods}>
      {children}
    </GlobalStateContext.Provider>
  );
}

// export default GlobalStateProvider;
/* eslint-disable max-len */
/* eslint-disable react/jsx-no-constructed-context-values */
// import React, { useState, useContext, useEffect } from "react";

// const GlobalStateContext = React.createContext();

// export function GlobalStatesMethods()
// {
//   return useContext(GlobalStateContext);
// }

// export function GlobalStateProvider({ children })
// {
//   const [gameID, setGameID] = useState("JqrJKPocT9vaK1Yo7mNN");

//   const [players, setPlayers] = useState([]);

//   const [gameState, setGameState] = useState(
//     {
//       players: [{
//         name: "kasd",
//         resources: {
//           Money: { production: 0, value: 0 },
//           Steel: { production: 0, value: 0 },
//           Titanium: { production: 0, value: 0 },
//           Vegetation: { production: 0, value: 0 },
//           Electricity: { production: 0, value: 0 },
//           Heat: { production: 0, value: 0 },
//           "Terraformation level": { production: 0, value: 0 },
//         },
//       },
//       {
//         name: "asfasfaf",
//         resources: {
//           money: { production: 0, value: 0 },
//           steel: { production: 0, value: 0 },
//           titanium: { production: 0, value: 0 },
//           vegetation: { production: 0, value: 0 },
//           electricity: { production: 0, value: 0 },
//           heat: { production: 0, value: 0 },
//           "Terraformation level": { production: 0, value: 0 },
//         },
//       },
//       ],
//       generation: 1,
//     },
//   );

//   const setupPlayer = (name) =>
//   {
//     setGameState((prevState) => (
//       {
//         ...prevState,
//         players: [
//           ...prevState.players,
//           {
//             name,
//             resources: {
//               money: { production: 0, value: 0 },
//               steel: { production: 0, value: 0 },
//               titanium: { production: 0, value: 0 },
//               vegetation: { production: 0, value: 0 },
//               electricity: { production: 0, value: 0 },
//               heat: { production: 0, value: 0 },
//               terrafomLev: { production: 0, value: 0 },
//             },
//           },
//         ],
//       }
//     ));
//   };

//   const addGeneration = () => setGameState((prevState) => (
//     { ...prevState, generation: prevState.generation + 1 }));

//   const addResourceValue = (playerName, resource) =>
//   {
//     setGameState((prevState) => ({
//       ...prevState,
//       players: prevState.players.map((player) => (
//         player.name === playerName
//           ? {
//             ...player,
//             resources: {
//               ...player.resources,
//               [resource]: {
//                 ...player.resources[resource],
//                 value: player.resources[resource].value + 1,
//               },
//             },
//           }
//           : player
//       )),
//     }));
//   };

//   const addProductionToValue = (playerName, resource) =>
//   {
//     setGameState((prevState) => ({
//       ...prevState,
//       players: prevState.players.map((player) => (
//         player.name === playerName
//           ? {
//             ...player,
//             resources: {
//               ...player.resources,
//               [resource]: {
//                 ...player.resources[resource],
//                 value: player.resources[resource].value + player.resources[resource].production,
//               },
//             },
//           }
//           : player
//       )),
//     }));
//   };

//   const subtractResourceValue = (playerName, resource) =>
//   {
//     setGameState((prevState) => ({
//       ...prevState,
//       players: prevState.players.map((player) => (
//         player.name === playerName
//           ? {
//             ...player,
//             resources: {
//               ...player.resources,
//               [resource]: {
//                 ...player.resources[resource],
//                 value: player.resources[resource].value - 1,
//               },
//             },
//           }
//           : player
//       )),
//     }));
//   };

//   const addResourceProduction = (playerName, resource) =>
//   {
//     setGameState((prevState) => ({
//       ...prevState,
//       players: prevState.players.map((player) => (
//         player.name === playerName
//           ? {
//             ...player,
//             resources: {
//               ...player.resources,
//               [resource]: {
//                 ...player.resources[resource],
//                 production: player.resources[resource].production + 1,
//               },
//             },
//           }
//           : player
//       )),
//     }));
//   };

//   const subtractResourceProduction = (playerName, resource) =>
//   {
//     setGameState((prevState) => ({
//       ...prevState,
//       players: prevState.players.map((player) => (
//         player.name === playerName
//           ? {
//             ...player,
//             resources: {
//               ...player.resources,
//               [resource]: {
//                 ...player.resources[resource],
//                 production: player.resources[resource].production - 1,
//               },
//             },
//           }
//           : player
//       )),
//     }));
//   };

//   const addPlayer = (newPlayer) => setPlayers([...players, newPlayer]);

//   const removePlayer = (playerName) => setPlayers(players.filter((player) => player !== playerName));

//   const methods = {
//     gameID,
//     players,
//     gameState,
//     setGameID,
//     setPlayers,
//     setGameState,
//     addResourceValue,
//     subtractResourceValue,
//     addResourceProduction,
//     subtractResourceProduction,
//     addProductionToValue,
//     addGeneration,
//     addPlayer,
//     removePlayer,
//     setupPlayer,
//   };

//   return (
//     <GlobalStateContext.Provider value={methods}>
//       {children}
//     </GlobalStateContext.Provider>
//   );
// }

// export default GlobalStateProvider;
