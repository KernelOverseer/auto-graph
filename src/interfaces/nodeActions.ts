import { nodeData } from "./nodeData";

export interface nodeActions{
    add: (id: string) => nodeData | undefined;
    get: (id: string) => nodeData | undefined;
    move: (id: string, x: number, y: number) => void;
}