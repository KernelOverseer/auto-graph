import React from "react";
import { nodeOperations } from "../interfaces/nodeActions";
import { nodeData } from "../interfaces/nodeData";
import { message } from "antd";

export const breadthFirstSearch = `const queue= [start,];

while (queue.length > 0)
{
  const node = await getNode(queue.shift());
  if (node.id === end)
    break; // found the end
  if (node.visited)
    continue; // skip already visited nodes
  
  queue.push(...await getChildren(node));
}`;

export const depthFirstSearch = `const stack = [start,];

while (stack.length > 0)
{
  const node = await getNode(stack.pop());
  if (node.id === end)
    break; // found the end
  if (node.visited)
    continue; // skip already visited nodes
  
  stack.push(...await getChildren(node));
}`;
