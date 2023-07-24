import { lineData, nodeData } from "./nodeData";

export type mouseModes = "idle" | "link" | "unlink"

export interface nodeActions{
    add: (id: string) => nodeData | undefined;
    get: (id: string) => nodeData | undefined;
    move: (id: string, x: number, y: number) => void;
    select: (id: string) => boolean;
    addLink: (id1: string, id2: string) => boolean;
    renameNode: (id: string, newId: string) => boolean;
    removeNode: (id: string) => boolean;
    selected?: string;
    start?: string;
    setStart: (id: string) => void;
    setEnd: (id: string) => void;
    end?: string;
    mode: mouseModes;
    setMode: (mode: mouseModes) => void;
    nodes: nodeData[];
    links: lineData[];
}