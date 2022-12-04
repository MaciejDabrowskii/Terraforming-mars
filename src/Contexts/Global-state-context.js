/* eslint-disable max-len */
/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState, useContext, useEffect } from "react";

const GlobalStateContext = React.createContext();

export function GlobalStatesMethods()
{
  return useContext(GlobalStateContext);
}

export function GlobalStateProvider({ children })
{
  const [gameID, setGameID] = useState(() => (localStorage.getItem("gameID") !== null
    ? JSON.parse(localStorage.getItem("gameID"))
    : null));

  const [staticBackground, setStaticBackground] = useState(false);

  const [gameState, setGameState] = useState(
    () => (localStorage.getItem("gameState") !== null
      ? JSON.parse(localStorage.getItem("gameState"))
      : {
        players: [],
        generation: 1,
      }),

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
            valueNumbers: {
              values: [1, 5, 10],
              selectedValue: 1,
            },
            resources: {
              MegaCredits: { production: 0, value: 0, index: 1 },
              Steel: { production: 0, value: 0, index: 2 },
              Titanium: { production: 0, value: 0, index: 3 },
              Plants: { production: 0, value: 0, index: 4 },
              Energy: { production: 0, value: 0, index: 5 },
              Heat: { production: 0, value: 0, index: 6 },
              "Terraform rating": { production: 0, value: 0, index: 7 },
            },
          },
        ],
      }
    ));
  };

  const setLocalStorageData = () =>
  {
    localStorage.setItem("gameID", JSON.stringify(gameID));
    localStorage.setItem("gameState", JSON.stringify(gameState));
  };

  useEffect(() =>
  {
    setLocalStorageData();
  }, [gameID, gameState]);

  const addGeneration = () => setGameState((prevState) => (
    { ...prevState, generation: prevState.generation + 1 }));

  const setValueNumbers = (playerName, value) =>
  {
    setGameState((prevState) => ({
      ...prevState,
      players: prevState.players.map((player) => (
        player.name === playerName
          ? {
            ...player,
            valueNumbers: {
              ...player.valueNumbers,
              selectedValue: value,
            },
          }
          : player
      )),
    }));
  };

  const addResourceValue = (playerName, resource, value) =>
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
                value: player.resources[resource].value + value,
              },
            },
          }
          : player
      )),
    }));
  };

  const subtractResourceValue = (playerName, resource, value) =>
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
                value: player.resources[resource].value - value,
              },
            },
          }
          : player
      )),
    }));
  };

  const addResourceProduction = (playerName, resource, value) =>
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
                production: player.resources[resource].production + value,
              },
            },
          }
          : player
      )),
    }));
  };

  const subtractResourceProduction = (playerName, resource, value) =>
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
                production: player.resources[resource].production - value,
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

  const removePlayer = (playerName) => setGameState((prevState) => ({
    ...prevState,
    players: prevState.players.filter((player) => player.name !== playerName),
  }));

  const switchBackground = () =>
  {
    setStaticBackground((prevState) => !prevState);
  };

  const methods = {
    gameID,
    gameState,
    staticBackground,
    setGameID,
    setGameState,
    addResourceValue,
    subtractResourceValue,
    addResourceProduction,
    subtractResourceProduction,
    addGeneration,
    removePlayer,
    setupPlayer,
    addProductionToValue,
    setStaticBackground,
    switchBackground,
    setValueNumbers,
  };

  return (
    <GlobalStateContext.Provider value={methods}>
      {children}
    </GlobalStateContext.Provider>
  );
}
