import React from "react";
import { GlobalStatesMethods } from "../../Contexts/Global-state-context";

function ResourceValue({ player, resource })
{
  const { addResourceValue, subtractResourceValue } = GlobalStatesMethods();

  const { name, resources } = player;

  return (
    <div>
      <p>Value:</p>
      <div className="button-wrapper">
        <button
          onClick={() => addResourceValue(name, resource)}
          type="button"
        >
          +
        </button>
        <div className="value">
          {resources[resource].value }
        </div>
        <button
          onClick={() => subtractResourceValue(name, resource)}
          type="button"
        >
          -
        </button>
      </div>
    </div>
  );
}

export default ResourceValue;
