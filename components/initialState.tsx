import getNewState from "./helpers/getNewState"
import { Edge, Node } from "@xyflow/react"

let initialNodes: Node[] = []
let initialEdges: Edge[] = []

let recoveredFlow = localStorage.getItem("sda-flow")

if (recoveredFlow) {
  const flow = JSON.parse(recoveredFlow)
  initialNodes = flow.nodes.map((d: Node) => ({
    ...d,
    data: { ...d.data, imported: true },
  }))
  initialEdges = flow.edges
} else {
  const newState = getNewState()
  initialNodes = newState.nodes
  initialEdges = newState.edges
}

export { initialNodes, initialEdges }
