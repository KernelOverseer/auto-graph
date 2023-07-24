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
  return (
    <div style={barStyle}>
      <Button.Group>
        <Button icon={<StepBackwardFilled />}>Prev</Button>
        <Button icon={<CaretRightFilled />}>Start</Button>
        <Button icon={<StepForwardFilled />}>Next</Button>
      </Button.Group>
    </div>
  );
};

export default ControlBar;
