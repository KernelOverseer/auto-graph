import {
  PlusCircleFilled,
  PlusCircleOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { Affix, Button, Card, Collapse, CollapseProps } from "antd";
import React from "react";

const floatingMenuStyle = {
  position: "fixed",
  top: 100,
  right: 10,
  width: 200,
} as React.CSSProperties;

const ActionsMenu: React.FC = () => {
  return (
    <div>
      <Button icon={<PlusCircleOutlined />}>Add node</Button>
    </div>
  );
};

const NodeOptions: React.FC = () => {
  return (
    <div style={{ textAlign: "center", padding: 20 }}>
      <SmileOutlined style={{ fontSize: 20 }} />
      <p>Select a node</p>
    </div>
  );
};

const menuItems: CollapseProps["items"] = [
  {
    key: "1",
    label: "Actions",
    children: <ActionsMenu />,
  },
  {
    key: "2",
    label: "Options",
    children: <NodeOptions />,
  },
];

const OptionsMenu: React.FC = () => {
  return (
    <div style={floatingMenuStyle}>
      <Collapse items={menuItems} defaultActiveKey={["1", "2"]} />
    </div>
  );
};

export default OptionsMenu;
