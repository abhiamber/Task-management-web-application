import React, { useState } from "react";
import { Tooltip } from "reactstrap";
import AddTask from "./form/AddTask";

const Tooltips = (props) => {
  let [tooltipOpen, settooltipOpen] = useState(false);

  let toggle = () => {
    settooltipOpen(!tooltipOpen);
  };

  return (
    <span>
      <i
        className="fas fa-question-circle"
        id={"Tooltip-" + props.id}
        data-toggle="tooltip"
      ></i>
      <Tooltip
        placement={props.placement}
        isOpen={tooltipOpen}
        target={"Tooltip-" + props.id}
        toggle={toggle}
      >
        {props.content}
      </Tooltip>

      <AddTask
        setShowFunc={props.setShowFunc}
        storyType={props.storyType}
        status={props.id}
      />
    </span>
  );
};

export default Tooltips;
