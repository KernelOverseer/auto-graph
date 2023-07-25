import { lineData, nodeData } from "./nodeData";

export type mouseModes = "idle" | "link" | "unlink";
export type algoFunction = () => Promise<void>;

export interface nodeActions {
  add: (id: string) => nodeData | undefined;
  get: (id: string) => nodeData | undefined;
  move: (id: string, x: number, y: number) => void;
  select: (id: string) => boolean;
  addLink: (id1: string, id2: string) => boolean;
  renameNode: (id: string, newId: string) => boolean;
  removeNode: (id: string) => boolean;
  resetGraph: () => void;
  selected?: string;
  start?: string;
  setStart: (id: string) => void;
  setEnd: (id: string) => void;
  end?: string;
  mode: mouseModes;
  setMode: (mode: mouseModes) => void;
  nodes: nodeData[];
  links: lineData[];
  stepDelay: number;
  setStepDelay: (delay: number) => void;
  running: string | undefined;
  setRunning: (running: string | undefined) => void;
}

export interface nodeOperations {
  getChildren(id: string): string[] | undefined;
  getNode(id: string): Promise<nodeData | undefined>;
  getStart(): string | undefined;
  getEnd(): string | undefined;
}
