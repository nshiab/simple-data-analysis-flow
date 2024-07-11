"use client";

import React, { useCallback } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
  Node,
  ReactFlowProvider,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import SDB from "./SDA/SDB";
import ST from "./SDA/ST";
import FetchData from "./SDA/FetchData";
import LogTable from "./SDA/LogTable";
import AddNode from "./SDA/AddNode";

const initialNodes: Node[] = [
  {
    id: "node1",
    type: "SDB",
    position: { x: 0, y: 0 },
    data: { instance: null },
    origin: [0.5, 0],
  },
  {
    id: "node2",
    type: "ST",
    position: { x: 0, y: 150 },
    data: { instance: null },
    origin: [0.5, 0],
  },
  {
    id: "node3",
    type: "FetchData",
    position: { x: -175, y: 300 },
    data: { instance: null },
    origin: [0.5, 0],
  },
  {
    id: "node4",
    type: "LogTable",
    position: { x: 25, y: 300 },
    data: { instance: null },
    origin: [0, 0],
  },
];
const initialEdges = [
  { id: "edge1", source: "node1", target: "node2" },
  { id: "edge2", source: "node2", target: "node3" },
  { id: "edge3", source: "node3", target: "node4" },
];

const nodeTypes = {
  SDB: SDB,
  ST: ST,
  FetchData: FetchData,
  LogTable: LogTable,
};

export default function SimpleFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <ReactFlowProvider>
      <AddNode setNodes={setNodes}>
        <div
          style={{
            width: "100vw",
            height: "100vh",
          }}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.5 }}
          >
            <Controls />
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
          </ReactFlow>
        </div>
      </AddNode>
    </ReactFlowProvider>
  );
}
