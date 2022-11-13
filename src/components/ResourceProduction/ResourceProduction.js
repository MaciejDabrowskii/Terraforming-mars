import React from "react";
import { GlobalStatesMethods } from "../../Contexts/Global-state-context";

function ResourceProduction({ player, resource })
{
  const {
    addResourceProduction,
    subtractResourceProduction,
  } = GlobalStatesMethods();

  const { name, resources } = player;

  return (
    <div className="resource-production">
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
    </div>
  );
}

export default ResourceProduction;
