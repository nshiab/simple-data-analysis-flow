import { Edge, Node } from "@xyflow/react";

const initialNodes: Node[] = [
  {
    id: "node1",
    type: "SDB",
    position: { x: 0, y: -100 },
    data: { instance: null },
    origin: [0.5, 0],
  },
  {
    id: "node2",
    type: "ST",
    position: { x: -100, y: 50 },
    data: { instance: null },
    origin: [0.5, 0],
  },
  {
    id: "node3",
    type: "FetchData",
    position: { x: -150, y: 300 },
    data: { instance: null },
    origin: [0.5, 0],
  },
  {
    id: "node4",
    type: "AddColumn",
    position: { x: -100, y: 600 },
    data: { instance: null },
    origin: [0.5, 0],
  },
];
const initialEdges: Edge[] = [
  {
    id: "edge1",
    source: "node1",
    target: "node2",
  },
  {
    id: "edge2",
    source: "node2",
    target: "node3",
  },
  {
    id: "edge3",
    source: "node3",
    target: "node4",
  },
];

export { initialNodes, initialEdges };
