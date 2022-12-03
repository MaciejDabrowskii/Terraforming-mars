import React from "react";

function GenerationEndOverlay({ setShowOverlay, endGeneration })
{
  const handleConfirm = () =>
  {
    endGeneration();
    setShowOverlay(false);
  };

  return (
    <div className="generatoion-overlay-container">
      End generation?
      <div>
        <button type="button" onClick={handleConfirm}>Yes</button>
        <button type="button" onClick={() => setShowOverlay(false)}>No</button>

      </div>
    </div>
  );
}

export default GenerationEndOverlay;
