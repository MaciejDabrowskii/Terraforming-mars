import React from "react";
import "./Generation-end-overlay.css";

function GenerationEndOverlay({ setShowOverlay, endGeneration })
{
  const handleConfirm = () =>
  {
    endGeneration();
    setShowOverlay(false);
  };

  return (
    <div className="generation-overlay-container">
      <div className="generation-overlay-wrapper">

        END GENERATION?
        <div className="generation-overlay-btn-wrapper">
          <button
            className="generation-overlay-btn"
            type="button"
            onClick={handleConfirm}
          >
            YES
          </button>
          <button
            className="generation-overlay-btn"
            type="button"
            onClick={() => setShowOverlay(false)}
          >
            NO
          </button>
        </div>
      </div>
    </div>
  );
}

export default GenerationEndOverlay;
