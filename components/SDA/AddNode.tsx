import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Node, useReactFlow } from "@xyflow/react";
import { Dispatch, SetStateAction, useCallback } from "react";

let id = 1;

export default function AddNode({
  children,
  setNodes,
}: {
  setNodes: Dispatch<SetStateAction<Node[]>>;
  children: any;
}) {
  const { screenToFlowPosition } = useReactFlow();

  const addNode = useCallback(
    (x: number, y: number, type: string) => {
      const newNode = {
        id: `addedNode${id++}`,
        position: screenToFlowPosition({
          x,
          y,
        }),
        type,
        data: {
          instance: null,
        },
        origin: [0.5, 0.0],
      };
      // @ts-expect-error Missing origin in type?
      setNodes((nodes) => nodes.concat(newNode));
    },
    [setNodes, screenToFlowPosition]
  );

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
  );
}
