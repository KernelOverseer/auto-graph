import { lineData, nodeData } from "../interfaces/nodeData";

export const defaultNodes: nodeData[] = [
  {
    x: 449,
    y: 401,
    id: "Agadir",
  },
  {
    x: 442,
    y: 334,
    id: "Essaouira",
  },
  {
    x: 600,
    y: 173,
    id: "Rabat",
  },
  {
    x: 700,
    y: 173,
    id: "Fes",
  },
  {
    x: 558,
    y: 201,
    id: "Casablanca",
  },
  {
    x: 681,
    y: 71,
    id: "Tetouan",
  },
  {
    x: 867,
    y: 131,
    id: "Oujda",
  },
  {
    x: 539,
    y: 327,
    id: "Marrakech",
  },
  {
    x: 596,
    y: 370,
    id: "Ouarzazate",
  },
  {
    x: 427,
    y: 495,
    id: "Guelmim",
  },
  {
    x: 107,
    y: 808,
    id: "Dakhla",
  },
  {
    x: 65,
    y: 909,
    id: "Bir Gandouz",
  },
  {
    x: 752,
    y: 362,
    id: "Merzouga",
  },
  {
    x: 730,
    y: 305,
    id: "Errachidia",
  },
  {
    x: 669,
    y: 186,
    id: "Meknes",
  },
  {
    x: 469,
    y: 286,
    id: "Safi",
  },
  {
    x: 443,
    y: 449,
    id: "Tiznit",
  },
  {
    x: 466,
    y: 544,
    id: "Zag",
  },
  {
    x: 340,
    y: 631,
    id: "Samara",
  },
  {
    x: 256,
    y: 607,
    id: "Laayoune",
  },
  {
    x: 371,
    y: 527,
    id: "Tantan",
  },
];

export const defaultLinks: lineData[] = [
  {
    node1: "Bir Gandouz",
    node2: "Dakhla",
  },
  {
    node1: "Guelmim",
    node2: "Tiznit",
  },
  {
    node1: "Tiznit",
    node2: "Agadir",
  },
  {
    node1: "Agadir",
    node2: "Essaouira",
  },
  {
    node1: "Essaouira",
    node2: "Safi",
  },
  {
    node1: "Safi",
    node2: "Casablanca",
  },
  {
    node1: "Tetouan",
    node2: "Rabat",
  },
  {
    node1: "Rabat",
    node2: "Casablanca",
  },
  {
    node1: "Tetouan",
    node2: "Oujda",
  },
  {
    node1: "Oujda",
    node2: "Merzouga",
  },
  {
    node1: "Merzouga",
    node2: "Errachidia",
  },
  {
    node1: "Errachidia",
    node2: "Ouarzazate",
  },
  {
    node1: "Ouarzazate",
    node2: "Agadir",
  },
  {
    node1: "Agadir",
    node2: "Marrakech",
  },
  {
    node1: "Marrakech",
    node2: "Casablanca",
  },
  {
    node1: "Marrakech",
    node2: "Ouarzazate",
  },
  {
    node1: "Errachidia",
    node2: "Meknes",
  },
  {
    node1: "Fes",
    node2: "Meknes",
  },
  {
    node1: "Fes",
    node2: "Oujda",
  },
  {
    node1: "Merzouga",
    node2: "Guelmim",
  },
  {
    node1: "Zag",
    node2: "Guelmim",
  },
  {
    node1: "Dakhla",
    node2: "Laayoune",
  },
  {
    node1: "Tantan",
    node2: "Laayoune",
  },
  {
    node1: "Tantan",
    node2: "Guelmim",
  },
  {
    node1: "Samara",
    node2: "Tantan",
  },
  {
    node1: "Samara",
    node2: "Laayoune",
  },
];
