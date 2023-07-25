import React from "react";
import { nodeOperations } from "../interfaces/nodeActions";
import { nodeData } from "../interfaces/nodeData";

// need to provide a better graph api
export async function reorderGraph(): Promise<void> {
  const graph: nodeOperations = window as any;
  const start = graph.getStart();
  const end = graph.getEnd();
  if (start === undefined || end === undefined) return;

  let stack: string[] = [start];
  let current: string | undefined;

  while (stack.length > 0) {
    current = stack.pop();
    if (current === undefined) break;
    let node = await graph.getNode(current);
    if (current === end) break;
    console.log("current node is", current, node);
    if (node?.visited !== true) {
      let children = graph.getChildren(current);
      stack.push(...children!);
    }
  }
}
