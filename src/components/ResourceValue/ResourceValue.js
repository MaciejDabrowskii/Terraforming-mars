import React from "react";
import { GlobalStatesMethods } from "../../Contexts/Global-state-context";

function ResourceValue({ player, resource })
{
  const { addResourceValue, subtractResourceValue } = GlobalStatesMethods();

  const { name, resources } = player;

  return (
    <div>
      <button
        onClick={() => addResourceValue(name, resource)}
        type="button"
      >
        +
      </button>
      {resources[resource].value }
      <button
        onClick={() => subtractResourceValue(name, resource)}
        type="button"
      >
        -
      </button>
    </div>
  );
}

export default ResourceValue;
