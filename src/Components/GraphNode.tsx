import { Card } from "antd";
import React, { useState } from "react";
import { nodeProps } from "../interfaces/nodeData";

const GraphNode: React.FC<nodeProps> = ({ x, y, id, actions }) => {
  const nodeStyle = {
    borderRadius: "50%",
    position: "absolute",
    width: 50,
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: actions.selected === id ? "lightgreen" : "lightgrey",
  } as React.CSSProperties;

  return (
    <Card
      className="GraphNode"
      style={{ ...nodeStyle, left: x, top: y }}
      bordered={false}
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
      onClick={() => {
        console.log("selecting");
        actions.select(id);
      }}
    >
      {id}
    </Card>
  );
};

export default GraphNode;
