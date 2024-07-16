import { Edge, Node, ReactFlowInstance, useReactFlow } from "@xyflow/react"
import { Button } from "../ui/button"
import { Dispatch, SetStateAction, useCallback, useRef } from "react"
import { Input } from "../ui/input"

export default function SaveImport({
  rfInstance,
  setNodes,
  setEdges,
}: {
  rfInstance: ReactFlowInstance | undefined
  setNodes: Dispatch<SetStateAction<Node[]>>
  setEdges: Dispatch<SetStateAction<Edge[]>>
}) {
  const { setViewport } = useReactFlow()
  const ref = useRef<HTMLInputElement>(null)

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject()
      const string = JSON.stringify(flow)
      const a = document.createElement("a")
      const file = new Blob([string as BlobPart], { type: "text/plain" })
      a.href = URL.createObjectURL(file)
      a.download = `sda-flow.json`
      a.click()
    }
  }, [rfInstance])

  return (
    <div className="z-10">
      <div className="absolute m-2 flex gap-2">
        <Button variant="outline" onClick={onSave}>
          Save
        </Button>
        <Button variant="outline" onClick={() => ref.current?.click()}>
          Import
        </Button>
        <Input
          className="hidden"
          ref={ref}
          type="file"
          onChange={async (e) => {
            const files = e.target.files
            if (files) {
              const flow = JSON.parse(await files[0].text())
              const { x = 0, y = 0, zoom = 1 } = flow.viewport
              const nodes = flow.nodes.map((d: Node) => ({
                ...d,
                data: { ...d.data, imported: true },
              }))
              console.log(nodes)
              setNodes(nodes || [])
              setEdges(flow.edges || [])
              setViewport({ x, y, zoom })
            }
          }}
        />
      </div>
    </div>
  )
}
