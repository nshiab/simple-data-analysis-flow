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
  MarkerType,
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
import JoinGeo from "./SDA/JoinGeo";

import { initialNodes, initialEdges } from "./initialState";

const nodeTypes = {
  SDB: SDB,
  ST: ST,
  FetchData: FetchData,
  FetchGeoData: FetchGeoData,
  LogTable: LogTable,
  Points: Points,
  JoinGeo: JoinGeo,
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
      <>
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
              minZoom={0.25}
              defaultEdgeOptions={{
                type: "smoothstep",
                markerEnd: { type: MarkerType.Arrow, width: 20, height: 20 },
              }}
            >
              <Controls />
              <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            </ReactFlow>
          </div>
        </AddNode>
      </>
    )
  );
}
