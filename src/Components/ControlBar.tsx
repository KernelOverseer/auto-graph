import {
  CaretRightFilled,
  PauseOutlined,
  StepBackwardFilled,
  StepForwardFilled,
} from "@ant-design/icons";
import {
  Affix,
  AutoComplete,
  Button,
  Card,
  Col,
  Divider,
  InputNumber,
  Row,
  Space,
  Typography,
} from "antd";
import React, { useState } from "react";
import { actionProps } from "../interfaces/nodeData";

const barStyle = {
  position: "absolute",
  bottom: 50,
  left: 0,
  right: 0,
  margin: "auto",
  height: 50,
  width: 500,
  cursor: "default",
} as React.CSSProperties;

const barBodyStyle = {
  padding: 8,
};

const ControlBar: React.FC<actionProps> = ({ actions }) => {
  const disabled = actions.running === undefined;
  const [oldStepDelay, saveStepDelay] = useState<number>(100);
  return (
    <Card bordered={false} hoverable style={barStyle} bodyStyle={barBodyStyle}>
      <Row align="middle">
        <Col span={10}>
          <Button.Group>
            {actions.stepDelay === 0 ? (
              <Button
                key="start-pause"
                icon={<CaretRightFilled />}
                onClick={() => {
                  actions.setStepDelay(oldStepDelay);
                  document.getElementById("control-next-step")?.click();
                }}
                disabled={disabled}
              >
                Start
              </Button>
            ) : (
              <Button
                key="start-pause"
                icon={<PauseOutlined />}
                onClick={() => {
                  saveStepDelay(actions.stepDelay);
                  actions.setStepDelay(0);
                }}
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
        </Col>
        <Col span={4}>
          <Divider type="vertical" />
        </Col>
        <Col span={8}>
          <InputNumber
            min={1}
            max={1000}
            step={100}
            value={actions.stepDelay}
            defaultValue={100}
            onChange={(value) => {
              actions.setStepDelay(value!);
            }}
            addonBefore="Delay"
            addonAfter="ms"
          />
        </Col>
      </Row>
    </Card>
  );
};

export default ControlBar;
