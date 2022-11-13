/* eslint-disable no-unused-expressions */
import React from "react";
import { Link } from "react-router-dom";
import JoinGame from "../Join-game/Join-game";

function HomePage()
{
  return (

    <div className="home-page">
      <h1 className="home-page-title">Terraforming Mars</h1>
      <div className="home-page-options">
        <Link to="/New-game">New Game</Link>
        <JoinGame />
      </div>
    </div>

  );
}

export default HomePage;
