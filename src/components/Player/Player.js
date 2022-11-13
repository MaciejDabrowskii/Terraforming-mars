import React from "react";
import GenerationBar from "../Generation-bar/Generation-bar";
import ResourceValue from "../ResourceValue/ResourceValue";
import ResourceProduction from "../ResourceProduction/ResourceProduction";

function Player({ player })
{
  const { resources, name } = player;

  return (
    <div className="player-card">
      <GenerationBar barText={name} />
      <ul className="resources">
        {Object.keys(resources)
          .map((resource) => (
            resource !== "Terraformation level"
              ? (
                <li key={resource}>
                  {resource}
                  {" "}
                  Production:
                  <ResourceProduction resource={resource} player={player} />
                  Value:
                  <ResourceValue resource={resource} player={player} />
                </li>
              )
              : (
                <li key={resource}>
                  {resource}
                  Value:
                  <ResourceValue resource={resource} player={player} />
                </li>
              )
          ))}
      </ul>
    </div>
  );
}

export default Player;
