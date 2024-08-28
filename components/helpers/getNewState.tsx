import { getId } from "journalism"
import { Edge, Node } from "@xyflow/react"

export default function getNewState() {
  const dbId = `node_${getId()}`
  const tableId = `node_${getId()}`

  const nodes: Node[] = [
    {
      id: dbId,
      type: "SDB",
      position: { x: 0, y: 0 },
      data: { instance: null },
      origin: [0.5, 0],
    },
    {
      id: tableId,
      type: "ST",
      position: { x: -50, y: 150 },
      data: { instance: null, name: tableId },
      origin: [0.5, 0],
    },
  ]

  const edgeId = `edge_${getId()}`

  const edges: Edge[] = [
    {
      id: edgeId,
      source: dbId,
      target: tableId,
    },
  ]

  return { nodes, edges }
}
