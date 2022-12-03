import React from "react";
import { GlobalStatesMethods } from "../../Contexts/Global-state-context";

function GenerationBar({
  barText,
  displayGenerationIndicator,
  showToastInfoMessage,
})
{
  const { gameState: { generation } } = GlobalStatesMethods();

  const { value, type } = barText;

  const handleClick = () =>
  {
    navigator.clipboard.writeText(value);
    showToastInfoMessage("Copied to Clipboard!");
  };

  return (
    <div className="generation-bar-container">
      <div className="left">
        {type === "name"
          ? (<p>{value}</p>)
          : (
            <button
              type="button"
              onClick={handleClick}
            >
              {value}
            </button>
          )}
      </div>
      {displayGenerationIndicator
      && (<div className="generation-indicator">{generation}</div>)}
      <div className="right" />
    </div>
  );
}

export default GenerationBar;
