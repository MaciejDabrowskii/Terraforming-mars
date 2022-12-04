/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import Switch from "react-switch";
import { GlobalStatesMethods } from "../../Contexts/Global-state-context";
import "./Switch-btn.css";

function SwitchBtn()
{
  const {
    staticBackground,
    switchBackground,
  } = GlobalStatesMethods();

  return (
    <label htmlFor="material-switch" className="Switch-btn-label">
      <span>STATIC BACKGROUND</span>
      <Switch
        checked={staticBackground}
        onChange={() => switchBackground()}
        onColor="#84e22b"
        onHandleColor="#ee7752"
        handleDiameter={30}
        uncheckedIcon={false}
        checkedIcon={false}
        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
        height={20}
        width={48}
        className="react-switch"
        id="material-switch"
      />
    </label>
  );
}

export default SwitchBtn;
