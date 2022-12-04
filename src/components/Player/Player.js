import React from "react";
import ResourceValue from "../ResourceValue/ResourceValue";
import ResourceProduction from "../ResourceProduction/ResourceProduction";
import ValueSelector from "../Value-selector/Value-selector";
import "./Player.css";

function Player({ player })
{
  const { resources, name } = player;

  const resourcesKeys = Object.keys(resources)
    .sort((a, b) => resources[a].index - resources[b].index);

  return (
    <div className="player-card">
      <div className="header-wrapper">
        <h3>{name}</h3>
        <ValueSelector player={player} />
      </div>
      <div className="resources">
        {resourcesKeys.map((resource) => (
          resource !== "Terraformation level"
            ? (
              <form className="player-resource" key={resources[resource].index}>
                <fieldset className="player-resource-fieldset">
                  <legend className="player-resource-legend">{resource}</legend>
                  <ResourceValue resource={resource} player={player} />
                  <ResourceProduction resource={resource} player={player} />
                </fieldset>
              </form>
            )
            : (

              <form className="player-resource" key={resources[resource].index}>
                <fieldset className="player-resource-fieldset">
                  <legend className="player-resource-legend">{resource}</legend>
                  <ResourceValue resource={resource} player={player} />
                </fieldset>
              </form>
            )
        ))}
      </div>
    </div>
  );
}

export default Player;
