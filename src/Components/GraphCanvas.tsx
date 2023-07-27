import { message } from "antd";
import { endianness } from "os";
import React, { useState } from "react";
import { mouseModes, nodeActions } from "../interfaces/nodeActions";
import { lineData, nodeData, nodeProps } from "../interfaces/nodeData";
import ControlBar from "./ControlBar";
import GraphLink from "./GraphLink";
import GraphNode from "./GraphNode";
import OptionsMenu from "./OptionsMenu";
import { defaultLinks, defaultNodes } from "../logic/preset";
import { transforms } from "../interfaces/transforms";
import { getCoordsFromDisplay } from "../logic/transforms";
import AlgoMenu from "./AlgoMenu";

const containerStyle = {
  width: "100vw",
  height: "calc(100vh - 64px)",
  overflow: "hidden",
  backgroundImage: "url(grid.svg)",
  backgroundSize: 30,
};

const GraphCanvas: React.FC = () => {
  const [nodes, setNodes] = useState<nodeData[]>(defaultNodes);
  const [links, setLinks] = useState<lineData[]>(defaultLinks);
  const [selected, setSelected] = useState<string | undefined>(undefined);
  const [mode, setMode] = useState<mouseModes>("idle");
  const [startNode, setStartNode] = useState<string | undefined>(undefined);
  const [endNode, setEndNode] = useState<string | undefined>(undefined);
  const [stepDelay, setStepDelay] = useState<number>(100);
  const [running, setRunning] = useState<string | undefined>();
  const [transform, setTransform] = useState<transforms>({
    offX: 0,
    offY: 0,
    zoom: 1.0,
    dragOn: false,
  });
  const [_refresh, setRefresh] = useState<number>(0);

  function hardRefresh() {
    setRefresh((old) => old + 1);
  }

  function getNode(id: string): nodeData | undefined {
    return nodes.find((value) => value.id === id);
  }

  function nodeGetChildren(parent: nodeData | undefined): string[] | undefined {
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
    if (duplicateNode !== undefined) {
      message.error("node with same id already exists");
      return undefined;
    } else {
      const coords = getCoordsFromDisplay(100, 100, transform);
      const node: nodeData = { x: coords.x, y: coords.y, id: id };
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
      //if the node is a start or end node, handle it
      if (actions.start === id) setStartNode(undefined);
      if (actions.end === id) setEndNode(undefined);
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
        const nextStep = () => {
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
  (window as any).getChildren = async (node: nodeData): Promise<string[]> => {
    // if (node !== undefined && node.visited !== true) {
    //   visitNode(node.id);
    //   await handleStepping();
    // }
    let children = nodeGetChildren(node);
    if (children === undefined) return [];
    return children;
  };
  (window as any).getNode = async (
    id: string
  ): Promise<nodeData | undefined> => {
    let node = getNode(id);
    if (node !== undefined && node.visited !== true) {
      visitNode(id);
      await handleStepping();
    }
    return node;
  };
  (window as any).getStart = () => actions.start;
  (window as any).getEnd = () => actions.end;
  (window as any).export = () => {
    console.log(nodes, links);
  };

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
    transform: transform,
    setTransform: setTransform,
  };

  function dataToProps(data: nodeData): nodeProps {
    return {
      ...data,
      actions: actions,
    } as nodeProps;
  }

  function handleMouseDown(event: React.MouseEvent) {
    if (event.button === 1) {
      setTransform((transform) => ({ ...transform, dragOn: true }));
    }
  }

  function handleMouseUp(event: React.MouseEvent) {
    if (event.button === 1) {
      setTransform((transform) => ({ ...transform, dragOn: false }));
    }
  }

  function handleMouseMove(event: React.MouseEvent) {
    if (transform.dragOn) {
      setTransform((transform) => ({
        ...transform,
        offX: transform.offX + event.movementX,
        offY: transform.offY + event.movementY,
      }));
    }
  }

  function handleMouseWheel(event: React.WheelEvent) {
    if (event.deltaY > 0)
      setTransform((transform) => ({
        ...transform,
        zoom: transform.zoom * 0.9,
      }));
    else if (event.deltaY < 0)
      setTransform((transform) => ({
        ...transform,
        zoom: transform.zoom * 1.1,
      }));
  }

  return (
    <>
      <div
        style={containerStyle}
        onDrop={(event) => {
          //check if it's dropping random things and not nodes.
          if (event.dataTransfer.getData("type") !== "node") return;
          const movedId: string = event.dataTransfer.getData("id");
          const offset = JSON.parse(event.dataTransfer.getData("offset"));
          const coords = getCoordsFromDisplay(
            event.clientX - offset.x,
            event.clientY - offset.y,
            transform
          );
          moveNode(movedId, coords.x, coords.y);
        }}
        onDragOver={(event) => {
          event.preventDefault();
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onWheel={handleMouseWheel}
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
                actions={actions}
              />
            );
          }
          return <></>;
        })}
        {nodes.map((node) => (
          <GraphNode key={node.id} {...dataToProps(node)} />
        ))}
      </div>
      <OptionsMenu actions={actions} />
      <AlgoMenu actions={actions} />
      <ControlBar actions={actions} />
    </>
  );
};

export default GraphCanvas;
