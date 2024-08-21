import "./ToolTipStyle.css";
import React from "react";

function ToolTip({TooltipTitle, TooltipContent}) {

  return (
    <div className="tooltip">
        <TooltipTitle/>
      <span className="tooltip-text">
        <TooltipContent/>
      </span>
    </div>
  );
}

export default ToolTip;