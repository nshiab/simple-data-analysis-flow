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
import { getId } from "journalism"
import { Node, useReactFlow } from "@xyflow/react"
import { Dispatch, SetStateAction, useCallback } from "react"

export default function AddNode({
  setNodes,
  children,
}: {
  setNodes: Dispatch<SetStateAction<Node[]>>
  children: any
}) {
  const { screenToFlowPosition } = useReactFlow()

  const addNode = useCallback(
    (x: number, y: number, type: string) => {
      const newNode = {
        id: `random${getId()}`,
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
    [setNodes, screenToFlowPosition]
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
              onClick={(e) => addNode(e.clientX, e.clientY, "Join")}
            >
              Join
            </ContextMenuItem>
            <ContextMenuItem
              onClick={(e) => addNode(e.clientX, e.clientY, "Longer")}
            >
              Longer
            </ContextMenuItem>
            <ContextMenuItem
              onClick={(e) => addNode(e.clientX, e.clientY, "RenameColumns")}
            >
              Rename columns
            </ContextMenuItem>
            <ContextMenuItem
              onClick={(e) => addNode(e.clientX, e.clientY, "SelectColumns")}
            >
              Select columns
            </ContextMenuItem>
            <ContextMenuItem
              onClick={(e) => addNode(e.clientX, e.clientY, "Sort")}
            >
              Sort
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            Selecting or filtering data
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem
              onClick={(e) => addNode(e.clientX, e.clientY, "Filter")}
            >
              Filter
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
        <ContextMenuItem onClick={(e) => addNode(e.clientX, e.clientY, "Note")}>
          Note
        </ContextMenuItem>
        <ContextMenuItem
          onClick={(e) => addNode(e.clientX, e.clientY, "LogTable")}
        >
          Log table
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
