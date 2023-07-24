import { message } from "antd";
import React, { useState } from "react";
import { mouseModes, nodeActions } from "../interfaces/nodeActions";
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

const GraphCanvas: React.FC = () => {
  const [nodes, setNodes] = useState<nodeData[]>(testNodes);
  const [links, setLinks] = useState<lineData[]>(testLinks);
  const [selected, setSelected] = useState<string | undefined>(undefined);
  const [mode, setMode] = useState<mouseModes>("idle");
  const [_refresh, setRefresh] = useState<number>(0);

  function hardRefresh() {
    setRefresh((old) => old + 1);
  }

  function getNode(id: string): nodeData | undefined {
    return nodes.find((value) => value.id === id);
  }

  // maybe needs to refresh
  function addNode(id: string): nodeData | undefined {
    const duplicateNode = getNode(id);
    console.log("duplicate is ", duplicateNode);
    if (duplicateNode !== undefined) {
      message.error("node with same id already exists");
      return undefined;
    } else {
      const node: nodeData = { x: 100, y: 100, id: id };
      setNodes((old) => [...old, node]);
      hardRefresh();
      return node;
    }
  }

  function deselectNodes() {
    setSelected(undefined);
  }

  // maybe needs to refresh
  function selectNode(id: string) {
    const node = getNode(id);
    console.log("SELECTING", node, id);
    if (node !== undefined) {
      if (selected === id) {
        // deselect node
        setSelected(undefined);
        deselectNodes();
        hardRefresh();
        return false;
      } else {
        if (selected !== undefined) {
          if (mode === "link") {
            addLink(selected, id);
            // adding a link if in link mode
          } else if (mode === "unlink") {
            removeLink(selected, id);
            //removing link if in unlink mode
          }
        }
        // select node
        setSelected(id);
        hardRefresh();
        return true;
      }
    }
    return false;
  }

  function moveNode(id: string, x: number, y: number) {
    const newNodes = nodes.map((node) =>
      node.id === id ? { ...node, x: x, y: y } : node
    );
    console.log(newNodes);
    setNodes(newNodes);
    hardRefresh();
  }

  function addLink(id1: string, id2: string) {
    // links go both ways for now
    const duplicateLink = links.find(
      (link) =>
        (link.node1 === id1 && link.node2 === id2) ||
        (link.node1 === id2 && link.node2 === id1)
    );
    console.log("duplicate", duplicateLink);
    if (duplicateLink !== undefined) {
      return false;
    }
    setLinks((old) => [...old, { node1: id1, node2: id2 }]);
    return true;
  }

  function removeLink(id1: string, id2: string) {
    setLinks((links) =>
      links.filter(
        (link) =>
          !(
            (link.node1 === id1 && link.node2 === id2) ||
            (link.node1 === id2 && link.node2 === id1)
          )
      )
    );
  }

  const actions: nodeActions = {
    add: addNode,
    get: getNode,
    move: moveNode,
    select: selectNode,
    selected: selected,
    addLink: addLink,
    nodes: nodes,
    links: links,
    mode: mode,
    setMode: setMode,
  };

  function dataToProps(data: nodeData): nodeProps {
    return { ...data, actions: actions } as nodeProps;
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
          return (
            <GraphLink
              key={`${node1.id}+${node2.id}`}
              node1={node1}
              node2={node2}
            />
          );
        }
      })}
      {nodes.map((node) => (
        <GraphNode key={node.id} {...dataToProps(node)} />
      ))}

      <OptionsMenu actions={actions} />
      <ControlBar actions={actions} />
    </div>
  );
};

export default GraphCanvas;
