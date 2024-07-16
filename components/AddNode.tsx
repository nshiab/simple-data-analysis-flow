import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Node, useReactFlow } from "@xyflow/react"
import { Dispatch, SetStateAction, useCallback } from "react"

let id = 1

export default function AddNode({
  start,
  setNodes,
  children,
}: {
  start: number
  setNodes: Dispatch<SetStateAction<Node[]>>
  children: any
}) {
  const { screenToFlowPosition } = useReactFlow()

  const addNode = useCallback(
    (x: number, y: number, type: string) => {
      const newNode = {
        id: `node${start + id++}`,
        position: screenToFlowPosition({
          x,
          y,
        }),
        type,
        data: {
          instance: null,
        },
        origin: [0.5, 0.0],
      }
      // @ts-expect-error Missing origin in type?
      setNodes((nodes) => nodes.concat(newNode))
    },
    [setNodes, screenToFlowPosition, start]
  )

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem onClick={(e) => addNode(e.clientX, e.clientY, "ST")}>
          New SimpleTable
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger>Importing data</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem
              onClick={(e) => addNode(e.clientX, e.clientY, "FetchData")}
            >
              Fetch data
            </ContextMenuItem>
            <ContextMenuItem
              onClick={(e) => addNode(e.clientX, e.clientY, "FetchGeoData")}
            >
              Fetch geo data
            </ContextMenuItem>
            <ContextMenuItem
              onClick={(e) => addNode(e.clientX, e.clientY, "LoadFile")}
            >
              Load file
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSub>
          <ContextMenuSubTrigger>Restructuring data</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem
              onClick={(e) => addNode(e.clientX, e.clientY, "AddColumn")}
            >
              Add column
            </ContextMenuItem>
            <ContextMenuItem
              onClick={(e) => addNode(e.clientX, e.clientY, "Filter")}
            >
              Filter
            </ContextMenuItem>
            <ContextMenuItem
              onClick={(e) => addNode(e.clientX, e.clientY, "Join")}
            >
              Join
            </ContextMenuItem>
            <ContextMenuItem
              onClick={(e) => addNode(e.clientX, e.clientY, "RenameColumns")}
            >
              Rename columns
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSub>
          <ContextMenuSubTrigger>Analyzing data</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem
              onClick={(e) =>
                addNode(e.clientX, e.clientY, "LinearRegressions")
              }
            >
              Linear regression
            </ContextMenuItem>
            <ContextMenuItem
              onClick={(e) => addNode(e.clientX, e.clientY, "Sort")}
            >
              Sort
            </ContextMenuItem>
            <ContextMenuItem
              onClick={(e) => addNode(e.clientX, e.clientY, "Summarize")}
            >
              Summarize
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSub>
          <ContextMenuSubTrigger>Geospatial</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem
              onClick={(e) => addNode(e.clientX, e.clientY, "JoinGeo")}
            >
              Join geo
            </ContextMenuItem>
            <ContextMenuItem
              onClick={(e) => addNode(e.clientX, e.clientY, "Points")}
            >
              Points
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem
          onClick={(e) => addNode(e.clientX, e.clientY, "LogTable")}
        >
          Log table
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
