import {
  FlagFilled,
  FlagOutlined,
  HomeFilled,
  HomeOutlined,
  HomeTwoTone,
} from "@ant-design/icons";
import { Badge, Card } from "antd";
import React, { useState } from "react";
import { nodeProps } from "../interfaces/nodeData";

function getNodeColor(selected: boolean, visited: boolean | undefined): string {
  if (selected === true) return "lightgreen";
  if (visited === true) return "lightblue";
  return "lightgrey";
}

const GraphNode: React.FC<nodeProps> = ({ x, y, id, visited, actions }) => {
  const nodeStyle = {
    borderRadius: "50%",
    position: "absolute",
    width: 50,
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: visited ? "1px solid lightgrey" : "none",
    backgroundColor: getNodeColor(actions.selected === id, visited),
  } as React.CSSProperties;

  return (
    <Card
      className="GraphNode"
      style={{ ...nodeStyle, left: x, top: y }}
      bordered={false}
      hoverable
      draggable
      onDragStart={(event) => {
        event.dataTransfer.dropEffect = "move";
        event.dataTransfer.setData("type", "node");
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
      {id === actions.start && (
        <HomeFilled
          style={{
            position: "absolute",
            top: -5,
            right: 0,
            fontSize: 20,
            color: "#1677ff",
          }}
        />
      )}
      {id === actions.end && (
        <FlagFilled
          style={{
            position: "absolute",
            top: -5,
            right: 0,
            fontSize: 20,
            color: "#1677ff",
          }}
        />
      )}
      {id}
    </Card>
  );
};

export default GraphNode;
