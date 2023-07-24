import { Card } from "antd";
import React, { useState } from "react";
import { nodeProps } from "../interfaces/nodeData";

const nodeStyle = {
  borderRadius: "50%",
  position: "absolute",
  width: 50,
  height: 50,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "lightgrey",
} as React.CSSProperties;

var testVar;

const GraphNode: React.FC<nodeProps> = ({ x, y, id }) => {
  return (
    <Card
      style={{ ...nodeStyle, left: x, top: y }}
      draggable
      onDragStart={(event) => {
        event.dataTransfer.dropEffect = "move";
        event.dataTransfer.setData("id", id);
        const element = event.target as HTMLElement;
        const offset: string = JSON.stringify({
          x: event.clientX - element.getBoundingClientRect().left,
          y: event.clientY - element.getBoundingClientRect().top,
        });
        event.dataTransfer.setData("offset", offset);
      }}
    >
      {id}
    </Card>
  );
};

export default GraphNode;
