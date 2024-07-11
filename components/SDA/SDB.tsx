import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import SimpleWebDB from "../../node_modules/simple-data-analysis/dist/class/SimpleWebDB";
import { useEffect, useState } from "react";
import Code from "../partials/Code";

export default function SDB({ id }: { id: string }) {
  const { updateNodeData } = useReactFlow();
  const [code, setCode] = useState("");

  useEffect(() => {
    async function start() {
      const sdb = await new SimpleWebDB().start();
      const code = `// For front-end projects, switch to SimpleWebDB
import { SimpleDB } from "simple-data-analysis";

const sdb = new SimpleDB();`;
      setCode(code);
      updateNodeData(id, { instance: sdb, code });
    }
    start();
  }, [id, updateNodeData]);

  return (
    <div>
      <Card>
        <Code code={code} />
        <CardHeader>
          <CardTitle>SimpleDB</CardTitle>
          <CardDescription>This is your in-memory database.</CardDescription>
        </CardHeader>
      </Card>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
