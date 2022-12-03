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
              Money: { production: 0, value: 0, index: 1 },
              Steel: { production: 0, value: 0, index: 2 },
              Titanium: { production: 0, value: 0, index: 3 },
              Vegetation: { production: 0, value: 0, index: 4 },
              Electricity: { production: 0, value: 0, index: 5 },
              Heat: { production: 0, value: 0, index: 6 },
              "Terraformation level": { production: 0, value: 0, index: 7 },
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

  const subtractSpecificResourceValue = (playerName, resource, specificValue) =>
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
                value: player.resources[resource].value - specificValue,
              },
            },
          }
          : player
      )),
    }));
  };

  const addSpecificResourceValue = (playerName, resource, specificValue) =>
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
                value: player.resources[resource].value + specificValue,
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

  const removePlayer = (playerName) => setGameState((prevState) => ({
    ...prevState,
    players: prevState.players.filter((player) => player.name !== playerName),
  }));

  const methods = {
    gameID,
    gameState,
    setGameID,
    setGameState,
    addResourceValue,
    subtractResourceValue,
    addSpecificResourceValue,
    subtractSpecificResourceValue,
    addResourceProduction,
    subtractResourceProduction,
    addGeneration,
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
