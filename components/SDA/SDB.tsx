import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import SimpleWebDB from "../../node_modules/simple-data-analysis/dist/class/SimpleWebDB";
import { useEffect } from "react";

export default function SDB({ id }: { id: string }) {
  const { updateNodeData } = useReactFlow();

  useEffect(() => {
    async function start() {
      const sdb = await new SimpleWebDB().start();
      updateNodeData(id, { instance: sdb });
    }
    start();
  }, [id, updateNodeData]);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>SimpleDB</CardTitle>
          <CardDescription>This is your in-memory database.</CardDescription>
        </CardHeader>
      </Card>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
