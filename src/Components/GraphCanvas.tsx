import { message } from "antd";
import { endianness } from "os";
import React, { useState } from "react";
import { mouseModes, nodeActions } from "../interfaces/nodeActions";
import { lineData, nodeData, nodeProps } from "../interfaces/nodeData";
import ControlBar from "./ControlBar";
import GraphLink from "./GraphLink";
import GraphNode from "./GraphNode";
import OptionsMenu from "./OptionsMenu";

const containerStyle = {
  width: "100vw",
  height: "calc(100vh - 64px)",
  overflow: "hidden",
  backgroundImage: "url(grid.svg)",
  backgroundSize: 30,
};

let testNodes: nodeData[] = [
  {
    x: 500,
    y: 500,
    id: "A",
  },
  {
    x: 600,
    y: 500,
    id: "B",
  },
  {
    x: 500,
    y: 600,
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
];

const GraphCanvas: React.FC = () => {
  const [nodes, setNodes] = useState<nodeData[]>(testNodes);
  const [links, setLinks] = useState<lineData[]>(testLinks);
  const [selected, setSelected] = useState<string | undefined>(undefined);
  const [mode, setMode] = useState<mouseModes>("idle");
  const [startNode, setStartNode] = useState<string | undefined>(undefined);
  const [endNode, setEndNode] = useState<string | undefined>(undefined);
  const [stepDelay, setStepDelay] = useState<number>(0);
  const [running, setRunning] = useState<string | undefined>();
  const [_refresh, setRefresh] = useState<number>(0);

  function hardRefresh() {
    setRefresh((old) => old + 1);
  }

  function getNode(id: string): nodeData | undefined {
    return nodes.find((value) => value.id === id);
  }

  function getChildren(id: string): string[] | undefined {
    const parent = getNode(id);
    if (parent === undefined) return undefined;
    else {
      let children: string[] = [];
      links.forEach((link) => {
        if (link.node1 === parent.id) children.push(link.node2);
        else if (link.node2 === parent.id) children.push(link.node1);
      });
      return [...new Set(children)];
    }
  }

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

  function visitNode(id: string) {
    setNodes((old) =>
      old.map((oldNode) =>
        oldNode.id === id ? { ...oldNode, visited: true } : oldNode
      )
    );
    hardRefresh();
  }

  function renameNode(id: string, newId: string): boolean {
    let node = getNode(id);
    let duplicateNode = getNode(newId);
    if (duplicateNode !== undefined) {
      message.error("A node with that ID already exists");
      return false;
    }
    if (node !== undefined) {
      setNodes((old) =>
        old.map((oldNode) =>
          oldNode.id === id ? { ...oldNode, id: newId } : oldNode
        )
      );
      setLinks((old) =>
        old.map((oldLink) => {
          if (oldLink.node1 === id) oldLink.node1 = newId;
          else if (oldLink.node2 === id) oldLink.node2 = newId;
          return oldLink;
        })
      );
      setSelected(newId);
      hardRefresh();
      return true;
    }
    return false;
  }

  function removeNode(id: string): boolean {
    let node = getNode(id);
    if (node !== undefined) {
      setNodes((old) => old.filter((node) => node.id !== id));
      if (selected === id) setSelected(undefined);
      setLinks((old) =>
        old.filter((link) => link.node1 !== id && link.node2 !== id)
      );
      hardRefresh();
      return true;
    }
    return false;
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

  function flagLink(id1: string, id2: string, flag: boolean) {
    setLinks((links) =>
      links.map((link) => {
        if (
          (link.node1 === id1 && link.node2 === id2) ||
          (link.node1 === id2 && link.node2 === id1)
        ) {
          link.flag = flag;
        }
        return link;
      })
    );
    hardRefresh();
  }

  function resetGraph() {
    setNodes((nodes) => nodes.map((node) => ({ ...node, visited: false })));
    setLinks((links) => links.map((link) => ({ ...link, flag: false })));
    hardRefresh();
  }

  // stepper function
  async function handleStepping() {
    if (stepDelay === 0) {
      await new Promise<void>((resolve) => {
        console.log("creating promise");
        const nextStep = () => {
          console.log("NEXT");
          document
            .getElementById("control-next-step")
            ?.removeEventListener("click", nextStep);
          resolve();
        }; // Resolve the promise when the button is pressed
        document
          .getElementById("control-next-step")
          ?.addEventListener("click", nextStep);
      });
    } else await new Promise((resolve) => setTimeout(resolve, stepDelay));
  }

  //exposing functions to window
  (window as any).getChildren = (id: string): string[] => {
    let children = getChildren(id);
    if (children === undefined) return [];
    return children;
  };
  (window as any).getNode = async (
    id: string
  ): Promise<nodeData | undefined> => {
    let node = getNode(id);
    if (node !== undefined) {
      visitNode(id);
      // here introduce either a delay, or blockage to progress steps
      await handleStepping();
    }
    return node;
  };
  (window as any).getStart = () => actions.start;
  (window as any).getEnd = () => actions.end;

  const actions: nodeActions = {
    add: addNode,
    get: getNode,
    move: moveNode,
    select: selectNode,
    selected: selected,
    start: startNode,
    setStart: setStartNode,
    end: endNode,
    setEnd: setEndNode,
    addLink: addLink,
    renameNode: renameNode,
    removeNode: removeNode,
    resetGraph: resetGraph,
    nodes: nodes,
    links: links,
    mode: mode,
    setMode: setMode,
    stepDelay: stepDelay,
    setStepDelay: setStepDelay,
    running: running,
    setRunning: setRunning,
  };

  function dataToProps(data: nodeData): nodeProps {
    return { ...data, actions: actions } as nodeProps;
  }

  return (
    <div
      style={containerStyle}
      onDrop={(event) => {
        //check if it's dropping random things and not nodes.
        if (event.dataTransfer.getData("type") !== "node") return;
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
              flag={link.flag}
            />
          );
        }
        return <></>;
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
