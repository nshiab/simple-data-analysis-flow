"use client"

import React, { useCallback, useEffect, useState } from "react"
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
  MarkerType,
  ConnectionLineType,
  ReactFlowInstance,
} from "@xyflow/react"

import "@xyflow/react/dist/style.css"
import AddNode from "./AddNode"
import AllCode from "./partials/AllCode"

import { initialNodes, initialEdges } from "./initialState"
import nodeTypes from "./nodeTypes"
import { MenuBar } from "./partials/MenuBar"

let previousSave = Date.now()

export default function SimpleFlow() {
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance>()

  const [height, setHeight] = useState("0")

  useEffect(() => {
    function dimensions() {
      const header = document.querySelector("#header")
      if (header) {
        const bbox = header.getBoundingClientRect()
        setHeight(`${window.innerHeight - bbox.height}px`)
      }
    }
    dimensions()

    window.addEventListener("resize", dimensions)

    return () => window.removeEventListener("resize", dimensions)
  }, [])

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback(
    (params: any) =>
      setEdges((eds) => {
        return addEdge(
          params,
          eds.filter((d) => {
            if (!d.targetHandle || !params.targetHandle) {
              return d.target !== params.target
            } else {
              return (
                d.target !== params.target ||
                d.targetHandle !== params.targetHandle
              )
            }
          })
        )
      }),
    [setEdges]
  )
  useEffect(() => {
    if (rfInstance) {
      const now = Date.now()
      if (now - previousSave > 500) {
        const flow = rfInstance.toObject()
        const string = JSON.stringify(flow)
        localStorage.setItem("sda-flow", string)
        previousSave = now
      }
    }
  }, [nodes, rfInstance])

  return (
    height !== "0" && (
      <>
        <MenuBar
          rfInstance={rfInstance}
          setNodes={setNodes}
          setEdges={setEdges}
        />
        <AllCode />
        <AddNode setNodes={setNodes}>
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
              fitViewOptions={{ padding: 0.1 }}
              minZoom={0.25}
              defaultEdgeOptions={{
                type: "smoothstep",
                markerEnd: { type: MarkerType.Arrow, width: 20, height: 20 },
              }}
              connectionRadius={50}
              connectionLineType={ConnectionLineType.SmoothStep}
              onInit={setRfInstance}
            >
              <Controls />
              <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            </ReactFlow>
          </div>
        </AddNode>
      </>
    )
  )
}
