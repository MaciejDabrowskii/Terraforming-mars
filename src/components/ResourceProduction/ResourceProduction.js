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
      <p>Production:</p>
      <div className="button-wrapper">
        <button
          onClick={() => addResourceProduction(name, resource)}
          type="button"
        >
          +
        </button>
        <div className="value">{resources[resource].production }</div>
        <button
          onClick={() => subtractResourceProduction(name, resource)}
          type="button"
        >
          -
        </button>
      </div>
    </div>
  );
}

export default ResourceProduction;
