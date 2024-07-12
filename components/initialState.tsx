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
    type: "ST",
    position: { x: 250, y: 50 },
    data: { instance: null },
    origin: [0.5, 0],
  },
  {
    id: "node5",
    type: "FetchGeoData",
    position: { x: 500, y: 300 },
    data: { instance: null },
    origin: [0.5, 0],
  },
  {
    id: "node6",
    type: "LogTable",
    position: { x: 500, y: 550 },
    data: { instance: null },
    origin: [0, 0],
  },
  {
    id: "node7",
    type: "Points",
    position: { x: -300, y: 600 },
    data: { instance: null },
    origin: [0.5, 0],
  },
  {
    id: "node8",
    type: "LogTable",
    position: { x: -400, y: 1050 },
    data: { instance: null },
    origin: [0.5, 0],
  },
  {
    id: "node9",
    type: "JoinGeo",
    position: { x: 200, y: 600 },
    data: { instance: null },
    origin: [0.5, 0],
  },
  {
    id: "node10",
    type: "Summarize",
    position: { x: 0, y: 1100 },
    data: { instance: null },
    origin: [0, 0],
  },
  {
    id: "node11",
    type: "RenameColumns",
    position: { x: -100, y: 1375 },
    data: { instance: null },
    origin: [0, 0],
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
    id: "edge4",
    source: "node1",
    target: "node4",
  },
  {
    id: "edge5",
    source: "node4",
    target: "node5",
  },
  {
    id: "edge6",
    source: "node5",
    target: "node6",
  },
  {
    id: "edge7",
    source: "node3",
    target: "node7",
  },
  {
    id: "edge8",
    source: "node7",
    target: "node8",
  },
  {
    id: "edge9",
    source: "node7",
    target: "node9",
    targetHandle: "left",
  },
  {
    id: "edge10",
    source: "node5",
    target: "node9",
    targetHandle: "right",
  },
  {
    id: "edge11",
    source: "node9",
    target: "node10",
  },
  {
    id: "edge12",
    source: "node10",
    target: "node11",
  },
];

export { initialNodes, initialEdges };
