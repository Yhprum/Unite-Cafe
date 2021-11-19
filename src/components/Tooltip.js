import React from "react";
import ReactTooltip from 'react-tooltip';

function Tooltip(props) {

  return (
    <span className="tooltip-info" data-tip={props.type}>
      {props.text}
      <ReactTooltip effect="solid" />
    </span>
  );
}

export default Tooltip;