import { lineData, nodeData } from "./nodeData";

export type mouseModes = "idle" | "link" | "unlink"

export interface nodeActions{
    add: (id: string) => nodeData | undefined;
    get: (id: string) => nodeData | undefined;
    move: (id: string, x: number, y: number) => void;
    select: (id: string) => boolean;
    addLink: (id1: string, id2: string) => boolean;
    selected?: string;
    mode: mouseModes;
    setMode: (mode: mouseModes) => void;
    nodes: nodeData[];
    links: lineData[];
}