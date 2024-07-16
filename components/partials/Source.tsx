import { Handle, Position } from "@xyflow/react"

export default function Source({ sourceReady }: { sourceReady: boolean }) {
  return (
    <Handle
      type="source"
      position={Position.Bottom}
      style={{
        width: "50px",
        height: "4px",
        borderRadius: "0 0 4px 4px",
        border: "none",
        position: "relative",
        transform: "translate(-50%, -1px)",
        background: sourceReady ? "#94a3b8" : "#d3d3d3",
      }}
    />
  )
}
