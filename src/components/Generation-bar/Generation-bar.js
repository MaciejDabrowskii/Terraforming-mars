import React from "react";
import { GlobalStatesMethods } from "../../Contexts/Global-state-context";

function GenerationBar({ barText })
{
  const { gameState: { generation } } = GlobalStatesMethods();

  return (
    <div className="generation-bar-container">
      <div className="left">
        {barText}
      </div>
      <div className="generation-indicator">{generation}</div>
      <div className="right" />
    </div>
  );
}

export default GenerationBar;
