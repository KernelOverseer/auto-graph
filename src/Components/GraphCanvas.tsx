import { message } from "antd";
import React, { useState } from "react";
import { lineData, nodeData, nodeProps } from "../interfaces/nodeData";
import ControlBar from "./ControlBar";
import GraphLink from "./GraphLink";
import GraphNode from "./GraphNode";
import OptionsMenu from "./OptionsMenu";

const containerStyle = {
  width: "100%",
  height: "100%",
  overflow: "hidden",
  backgroundColor: "white",
  backgroundImage: "url(grid.svg)",
  backgroundSize: 30,
};

let testNodes: nodeData[] = [
  {
    x: 100,
    y: 100,
    id: "A",
  },
  {
    x: 100,
    y: 200,
    id: "B",
  },
  {
    x: 200,
    y: 100,
    id: "C",
  },
];

let testLinks: lineData[] = [
  {
    node1: "A",
    node2: "B",
  },
  {
    node1: "B",
    node2: "C",
  },
  {
    node1: "C",
    node2: "D",
  },
];

function dataToProps(data: nodeData): nodeProps {
  return data as nodeProps;
}

const GraphCanvas: React.FC = () => {
  const [nodes, setNodes] = useState<nodeData[]>(testNodes);
  const [links, setLinks] = useState<lineData[]>(testLinks);
  const [_refresh, setRefresh] = useState<number>(0);

  function hardRefresh() {
    setRefresh((old) => old + 1);
  }

  function getNode(id: string): nodeData | undefined {
    return testNodes.find((value) => value.id === id);
  }

  // maybe needs to refresh
  function addNode(id: string): nodeData | undefined {
    const duplicateNode = getNode(id);
    if (duplicateNode === undefined) {
      message.error("node with same id already exists");
      return undefined;
    } else {
      const node: nodeData = { x: 100, y: 100, id: id };
      setNodes((nodes) => {
        nodes.push(node);
        return nodes;
      });
      return node;
    }
  }

  function moveNode(id: string, x: number, y: number) {
    const index = testNodes.findIndex((value) => value.id === id);
    testNodes[index].x = x;
    testNodes[index].y = y;
    setNodes(testNodes);
    hardRefresh();
  }

  return (
    <div
      style={containerStyle}
      onDrop={(event) => {
        const movedId: string = event.dataTransfer.getData("id");
        const offset = JSON.parse(event.dataTransfer.getData("offset"));
        moveNode(movedId, event.clientX - offset.x, event.clientY - offset.y);
      }}
      onDragOver={(event) => {
        event.preventDefault();
      }}
    >
      {links.map((link) => {
        const node1 = getNode(link.node1);
        const node2 = getNode(link.node2);
        if (node1 && node2) {
          return <GraphLink node1={node1} node2={node2} />;
        }
      })}
      {nodes.map((node) => (
        <GraphNode {...dataToProps(node)} />
      ))}

      <OptionsMenu />
      <ControlBar />
    </div>
  );
};

export default GraphCanvas;
