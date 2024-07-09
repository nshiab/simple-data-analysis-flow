"use client";

import React, { useCallback } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
  Node,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import SDB from "./SDA/SDB";
import ST from "./SDA/ST";

const initialNodes: Node[] = [
  {
    id: "node-1",
    type: "SDB",
    position: { x: 0, y: 0 },
    data: { instance: null },
  },
  {
    id: "node-2",
    type: "ST",
    position: { x: 25, y: 150 },
    data: { instance: null },
  },
];
const initialEdges = [{ id: "edge-1", source: "node-1", target: "node-2" }];

const nodeTypes = { SDB: SDB, ST: ST };

export default function SimpleFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
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
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
