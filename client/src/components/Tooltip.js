import React, { useState } from "react";
import { Tooltip } from "reactstrap";
import AddTask from "./form/AddTask";

const Tooltips = ({ selectedStory, id, placement, setShowFunc, content }) => {
  let [tooltipOpen, settooltipOpen] = useState(false);

  let toggle = () => {
    settooltipOpen(!tooltipOpen);
  };

  return (
    <span>
      <i
        className="fas fa-question-circle"
        id={"Tooltip-" + id}
        data-toggle="tooltip"
      />
      <Tooltip
        placement={placement}
        isOpen={tooltipOpen}
        target={"Tooltip-" + id}
        toggle={toggle}
      >
        {content}
      </Tooltip>

      <AddTask
        setShowFunc={setShowFunc}
        selectedStory={selectedStory}
        status={id}
      />
    </span>
  );
};

export default Tooltips;
