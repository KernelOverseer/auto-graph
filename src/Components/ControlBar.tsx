import {
  CaretRightFilled,
  PauseOutlined,
  StepBackwardFilled,
  StepForwardFilled,
} from "@ant-design/icons";
import { Affix, AutoComplete, Button, Card } from "antd";
import React from "react";
import { actionProps } from "../interfaces/nodeData";

const barStyle = {
  position: "absolute",
  bottom: 50,
  left: 0,
  right: 0,
  margin: "auto",
} as React.CSSProperties;

const ControlBar: React.FC<actionProps> = ({ actions }) => {
  const disabled = actions.running === undefined;
  return (
    <div style={barStyle}>
      <Button.Group>
        {actions.stepDelay === 0 ? (
          <Button
            key="start-pause"
            icon={<CaretRightFilled />}
            disabled={disabled}
          >
            Start
          </Button>
        ) : (
          <Button
            key="start-pause"
            icon={<PauseOutlined />}
            disabled={disabled}
          >
            Pause
          </Button>
        )}
        <Button
          key="step"
          id="control-next-step"
          icon={<StepForwardFilled />}
          disabled={disabled}
        >
          Step
        </Button>
      </Button.Group>
    </div>
  );
};

export default ControlBar;
