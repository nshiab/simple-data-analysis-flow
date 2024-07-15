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
    type: "LoadFile",
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
  {
    id: "node5",
    type: "Summarize",
    position: { x: -150, y: 1050 },
    data: { instance: null },
    origin: [0.5, 0],
  },
  {
    id: "node6",
    type: "Filter",
    position: { x: -75, y: 1700 },
    data: { instance: null },
    origin: [0.5, 0],
  },
  {
    id: "node7",
    type: "LogTable",
    position: { x: -350, y: 1800 },
    data: { instance: null },
    origin: [1, 0],
  },
  {
    id: "node8",
    type: "ST",
    position: { x: 500, y: 50 },
    data: { instance: null },
    origin: [1, 0],
  },
  {
    id: "node9",
    type: "LoadFile",
    position: { x: 600, y: 300 },
    data: { instance: null },
    origin: [1, 0],
  },
  {
    id: "node10",
    type: "LogTable",
    position: { x: 600, y: 700 },
    data: { instance: null },
    origin: [0, 0],
  },
  {
    id: "node11",
    type: "Join",
    position: { x: 200, y: 1000 },
    data: { instance: null },
    origin: [0, 0],
  },
  {
    id: "node12",
    type: "LinearRegressions",
    position: { x: 300, y: 1400 },
    data: { instance: null },
    origin: [0, 0],
  },
  {
    id: "node13",
    type: "LogTable",
    position: { x: 300, y: 2000 },
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
    id: "edge3",
    source: "node3",
    target: "node4",
  },
  {
    id: "edge4",
    source: "node4",
    target: "node5",
  },
  {
    id: "edge5",
    source: "node5",
    target: "node6",
  },
  {
    id: "edge6",
    source: "node6",
    target: "node7",
  },
  {
    id: "edge7",
    source: "node1",
    target: "node8",
  },
  {
    id: "edge8",
    source: "node8",
    target: "node9",
  },
  {
    id: "edge9",
    source: "node9",
    target: "node10",
  },
  {
    id: "edge10",
    source: "node6",
    target: "node11",
    targetHandle: "left",
  },
  {
    id: "edge11",
    source: "node9",
    target: "node11",
    targetHandle: "right",
  },
  {
    id: "edge12",
    source: "node11",
    target: "node12",
  },
  {
    id: "edge13",
    source: "node12",
    target: "node13",
  },
];

export { initialNodes, initialEdges };
