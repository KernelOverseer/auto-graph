import React from "react";
import { nodeOperations } from "../interfaces/nodeActions";
import { nodeData } from "../interfaces/nodeData";
import { message } from "antd";

function requireStartEnd(start: boolean, end: boolean) {
  if (start) message.warning("Please select a starting node");
  if (end) message.warning("Please select an end node");
}

export async function depthFirstSearch(): Promise<void> {
  const graph: nodeOperations = window as any;
  const start = graph.getStart();
  const end = graph.getEnd();

  if (start === undefined || end === undefined) {
    requireStartEnd(true, true);
    return;
  }

  let stack: string[] = [start];
  let current: string | undefined;

  while (stack.length > 0) {
    current = stack.pop();
    if (current === undefined) break;
    let node = await graph.getNode(current);
    if (current === end) break;
    if (node?.visited !== true) {
      let children = graph.getChildren(current);
      stack.push(...children!);
    }
  }
}

export async function breadthFirstSearch(): Promise<void> {
  const graph: nodeOperations = window as any;
  const start = graph.getStart();
  const end = graph.getEnd();

  if (start === undefined || end === undefined) {
    requireStartEnd(true, true);
    return;
  }

  let queue: string[] = [start];
  let current: string | undefined;

  while (queue.length > 0) {
    current = queue[0];
    queue = queue.slice(1);
    if (current === undefined) break;
    let node = await graph.getNode(current);
    if (current === end) break;
    if (node?.visited !== true) {
      let children = graph.getChildren(current);
      queue.push(...children!);
    }
  }
}
