/* eslint-disable no-unused-expressions */
import React from "react";
import { Link } from "react-router-dom";
import JoinGame from "../Join-game/Join-game";
import "./Home-page.css";

function HomePage()
{
  return (

    <div className="home-page">
      <div className="home-page-wrapper">
        <h1 className="home-page-title">Terraforming Mars</h1>
        <div className="home-page-options">
          <Link to="/New-game" className="new-game-link">NEW GAME</Link>
          <JoinGame />
        </div>
      </div>
    </div>

  );
}

export default HomePage;
