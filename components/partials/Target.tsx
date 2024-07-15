import { Handle, Position } from "@xyflow/react"

export default function Target({
  targetReady,
  id,
}: {
  targetReady: boolean
  id?: string
}) {
  return (
    <Handle
      id={id}
      type="target"
      position={Position.Top}
      style={{
        width: "50px",
        height: "5px",
        borderRadius: "4px 4px 0 0",
        border: "none",
        position: "relative",
        transform: "translate(-50%, 1px)",
        background: targetReady ? "#94a3b8" : "#d3d3d3",
      }}
    />
  )
}
