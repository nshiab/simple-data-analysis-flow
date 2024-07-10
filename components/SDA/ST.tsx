import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Handle,
  Position,
  useHandleConnections,
  useNodesData,
  useReactFlow,
} from "@xyflow/react";
import { useEffect } from "react";
import SimpleWebDB from "../../node_modules/simple-data-analysis/dist/class/SimpleWebDB";

export default function ST({ id }: { id: string }) {
  const { updateNodeData } = useReactFlow();

  const targetConnection = useHandleConnections({ type: "target" });
  const source = useNodesData(targetConnection[0]?.source);

  useEffect(() => {
    const sdb = source?.data?.instance;
    if (sdb instanceof SimpleWebDB) {
      updateNodeData(id, {
        instance: sdb.newTable(id),
      });
    }
  }, [source, id, updateNodeData]);

  return (
    <div>
      <Handle type="target" position={Position.Top} />
      <Card className="max-w-xs">
        <CardHeader>
          <CardTitle>SimpleTable</CardTitle>
          <CardDescription>This is a table in the database.</CardDescription>
        </CardHeader>
      </Card>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
