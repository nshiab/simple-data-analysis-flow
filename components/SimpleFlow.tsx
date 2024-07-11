"use client";

import React, { useCallback, useEffect, useState } from "react";
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
import AddNode from "./partials/AddNode";
import AllCode from "./partials/AllCode";
import FetchGeoData from "./SDA/FetchGeoData";
import Points from "./SDA/Points";

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
  {
    id: "node5",
    type: "ST",
    position: { x: 400, y: 150 },
    data: { instance: null },
    origin: [0.5, 0],
  },
  {
    id: "node6",
    type: "FetchGeoData",
    position: { x: 450, y: 300 },
    data: { instance: null },
    origin: [0.5, 0],
  },
  {
    id: "node7",
    type: "LogTable",
    position: { x: 600, y: 500 },
    data: { instance: null },
    origin: [0.5, 0],
  },
  {
    id: "node8",
    type: "Points",
    position: { x: -175, y: 600 },
    data: { instance: null },
    origin: [0.5, 0],
  },
  {
    id: "node9",
    type: "LogTable",
    position: { x: 150, y: 600 },
    data: { instance: null },
    origin: [0.5, 0],
  },
];
const initialEdges = [
  { id: "edge1", source: "node1", target: "node2" },
  { id: "edge2", source: "node2", target: "node3" },
  { id: "edge3", source: "node3", target: "node4" },
  { id: "edge4", source: "node1", target: "node5" },
  { id: "edge5", source: "node5", target: "node6" },
  { id: "edge6", source: "node6", target: "node7" },
  { id: "edge7", source: "node3", target: "node8" },
  { id: "edge8", source: "node8", target: "node9" },
];

const nodeTypes = {
  SDB: SDB,
  ST: ST,
  FetchData: FetchData,
  FetchGeoData: FetchGeoData,
  LogTable: LogTable,
  Points: Points,
};

export default function SimpleFlow() {
  const [height, setHeight] = useState("0");

  useEffect(() => {
    function dimensions() {
      const header = document.querySelector("#header");
      if (header) {
        const bbox = header.getBoundingClientRect();
        setHeight(`${window.innerHeight - bbox.height}px`);
      }
    }
    dimensions();

    window.addEventListener("resize", dimensions);

    return () => window.removeEventListener("resize", dimensions);
  }, []);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    height !== "0" && (
      <ReactFlowProvider>
        <AllCode />
        <AddNode start={initialNodes.length} setNodes={setNodes}>
          <div
            style={{
              width: "100vw",
              height,
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
              <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            </ReactFlow>
          </div>
        </AddNode>
      </ReactFlowProvider>
    )
  );
}
