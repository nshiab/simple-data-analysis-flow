import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { Edge, getNodesBounds, Node, ReactFlowInstance } from "@xyflow/react"
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useRef,
} from "react"
import { Input } from "../ui/input"
import getNewState from "../helpers/getNewState"

export function MenuBar({
  rfInstance,
  setNodes,
  setEdges,
}: {
  rfInstance: ReactFlowInstance | undefined
  setNodes: Dispatch<SetStateAction<Node[]>>
  setEdges: Dispatch<SetStateAction<Edge[]>>
}) {
  const ref = useRef<HTMLInputElement>(null)

  const onImport = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (files) {
        const flow = JSON.parse(await files[0].text())
        const nodes = flow.nodes.map((d: Node) => ({
          ...d,
          data: { ...d.data, imported: true },
        }))

        setNodes(nodes || [])
        setEdges(flow.edges || [])
        const bounds = getNodesBounds(nodes)
        rfInstance?.fitBounds(bounds, { padding: 0 })
      }
    },
    [rfInstance, setEdges, setNodes]
  )

  const onImportExample = useCallback(
    async (example: string) => {
      const res = await fetch(example)
      const flow = await res.json()
      const nodes = flow.nodes.map((d: Node) => ({
        ...d,
        data: { ...d.data, imported: true },
      }))

      setNodes(nodes || [])
      setEdges(flow.edges || [])
      const bounds = getNodesBounds(nodes)
      rfInstance?.fitBounds(bounds, { padding: 0 })
    },
    [rfInstance, setEdges, setNodes]
  )

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

  const onNew = useCallback(() => {
    const newState = getNewState()
    setNodes(newState.nodes)
    setEdges(newState.edges)
    localStorage.removeItem("sda-flow")
    const bounds = getNodesBounds(newState.nodes)
    rfInstance?.fitBounds(bounds, { padding: 0 })
  }, [setNodes, setEdges, rfInstance])

  return (
    <div className="z-10">
      <Menubar className="absolute w-fit m-2">
        <MenubarMenu>
          <MenubarTrigger className="cursor-pointer" onClick={() => onNew()}>
            New
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger
            onClick={() => ref.current?.click()}
            className="cursor-pointer"
          >
            Import{" "}
            <Input
              className="hidden"
              ref={ref}
              type="file"
              onChange={onImport}
            />
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="cursor-pointer" onClick={() => onSave()}>
            Save
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Examples</MenubarTrigger>
          <MenubarContent>
            <MenubarItem
              onClick={() =>
                onImportExample(
                  "/simple-data-analysis-flow/flow-examples/climate-trends.json"
                )
              }
            >
              Climate trends
            </MenubarItem>
            <MenubarItem
              onClick={() =>
                onImportExample(
                  "/simple-data-analysis-flow/flow-examples/fires-in-canada.json"
                )
              }
            >
              Fires in Canada
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  )
}
