import React from "react";
import { nodeActions } from "./nodeActions";

export interface nodeData {
  x: number;
  y: number;
  id: string;
  visited?: boolean;
}

export interface lineData {
  node1: string;
  node2: string;
  flag?: boolean;
}

export interface nodeProps extends nodeData {
  actions: nodeActions;
}

export interface actionProps {
  actions: nodeActions;
}

export interface lineProps {
  node1: nodeData;
  node2: nodeData;
  flag?: boolean;
}
