import React from "react";
import { GlobalStatesMethods } from "../../Contexts/Global-state-context";

function ResourceValue({ player, resource })
{
  const {
    addResourceProduction,
    subtractResourceProduction,
  } = GlobalStatesMethods();

  const { name, resources } = player;

  return (
    <li>
      <button
        onClick={() => addResourceProduction(name, resource)}
        type="button"
      >
        +
      </button>
      {resources[resource].production }
      <button
        onClick={() => subtractResourceProduction(name, resource)}
        type="button"
      >
        -
      </button>
    </li>
  );
}

export default ResourceValue;
