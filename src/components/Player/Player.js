import React from "react";
import GenerationBar from "../Generation-bar/Generation-bar";
import ResourceValue from "../ResourceValue/ResourceValue";
import ResourceProduction from "../ResourceProduction/ResourceProduction";

function Player({ player, displayGenerationIndicator })
{
  const { resources, name } = player;

  const resourcesKeys = Object.keys(resources)
    .sort((a, b) => resources[a].index - resources[b].index);

  return (
    <div className="player-card">
      <GenerationBar
        barText={{ value: name, type: "name" }}
        displayGenerationIndicator={displayGenerationIndicator}
      />
      <ul className="resources">
        {resourcesKeys.map((resource) => (
          resource !== "Terraformation level"
            ? (
              <li key={resources[resource].index}>
                {resource}
                <ResourceProduction resource={resource} player={player} />
                <ResourceValue resource={resource} player={player} />
              </li>
            )
            : (
              <li key={resources[resource].index}>
                {resource}
                <ResourceValue resource={resource} player={player} />
              </li>
            )
        ))}
      </ul>
    </div>
  );
}

export default Player;
