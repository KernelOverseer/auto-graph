import { Card, Collapse, CollapseProps } from "antd";
import React from "react";

const floatingMenuStyle = {
  position: "fixed",
  top: 100,
  right: 10,
  width: 200,
} as React.CSSProperties;

const menuItems: CollapseProps["items"] = [
  {
    key: "1",
    label: "Editing",
    children: <p>EDITING PANEL</p>,
  },
];

const OptionsMenu: React.FC = () => {
  return (
    <div style={floatingMenuStyle}>
      <Collapse items={menuItems} />
    </div>
  );
};

export default OptionsMenu;
