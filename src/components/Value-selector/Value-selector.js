import React from "react";
import { GlobalStatesMethods } from "../../Contexts/Global-state-context";
import "./Value-selector.css";

function ValueSelector({ player })
{
  const { setValueNumbers } = GlobalStatesMethods();

  const { valueNumbers: { values, selectedValue } } = player;

  return (
    <div className="valueSelector-container">
      {values.map((value) => (
        <button
          className={
            selectedValue === value
              ? "valueSelector-btn selected"
              : "valueSelector-btn"
          }
          type="button"
          onClick={() => setValueNumbers(player.name, value)}
        >
          {value}
        </button>
      ))}
    </div>
  );
}

export default ValueSelector;
