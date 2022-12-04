import React from "react";
import { GlobalStatesMethods } from "../../Contexts/Global-state-context";
import "./ResourceValue.css";

function ResourceValue({ player, resource })
{
  const {
    addResourceValue,
    subtractResourceValue,
  } = GlobalStatesMethods();

  const {
    name,
    resources,
    valueNumbers: { selectedValue },
  } = player;

  return (
    <div className="resource-value">
      <p>Value:</p>
      <div className="resource-value-btn-wrapper">
        <button
          onClick={() => addResourceValue(name, resource, selectedValue)}
          type="button"
        >
          +
        </button>
        <div className="value">
          {resources[resource].value }
        </div>
        <button
          onClick={() => subtractResourceValue(name, resource, selectedValue)}
          type="button"
        >
          -
        </button>
      </div>
    </div>
  );
}

export default ResourceValue;
