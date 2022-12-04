import React from "react";
import { GlobalStatesMethods } from "../../Contexts/Global-state-context";
import "./Generation-bar.css";

function GenerationBar({
  barText,
  displayGenerationIndicator,
  showToastInfoMessage,
})
{
  const { gameState: { generation } } = GlobalStatesMethods();

  const handleClick = () =>
  {
    navigator.clipboard.writeText(barText);
    showToastInfoMessage("Copied to Clipboard!");
  };

  return (
    <div className="generation-bar-container">

      <button
        type="button"
        onClick={handleClick}
        className="generation-bar-btn"
      >
        ID:
        {" "}
        {barText}
      </button>

      {displayGenerationIndicator
      && (
        <div className="generation-indicator">
          Generation:
          {" "}
          {generation}
        </div>
      )}
    </div>
  );
}

export default GenerationBar;
