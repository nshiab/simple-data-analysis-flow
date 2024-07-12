import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useHandleConnections,
  useNodesData,
  useReactFlow,
} from "@xyflow/react";
import { useEffect, useState } from "react";
import SimpleWebDB from "../../node_modules/simple-data-analysis/dist/class/SimpleWebDB";
import Code from "../partials/Code";
import Target from "../partials/Target";
import Source from "../partials/Source";

export default function ST({ id }: { id: string }) {
  const { updateNodeData } = useReactFlow();
  const [targetReady, setTargetReady] = useState(false);
  const [sourceReady, setSourceReady] = useState(false);

  const targetConnection = useHandleConnections({ type: "target" });
  const source = useNodesData(targetConnection[0]?.source);

  const [code, setCode] = useState("");

  useEffect(() => {
    const sdb = source?.data?.instance;
    if (sdb instanceof SimpleWebDB) {
      setTargetReady(true);
      const code = `const ${id}Table = sdb.newTable("${id}Table");`;
      setCode(code);
      updateNodeData(id, {
        instance: sdb.newTable(`${id}Table`),
        code: code,
      });
      setSourceReady(true);
    }
  }, [source, id, updateNodeData]);

  return (
    <div>
      <Target targetReady={targetReady} />
      <Card className="max-w-xs">
        <Code code={code} />
        <CardHeader>
          <CardTitle>SimpleTable</CardTitle>
          <CardDescription>This is a table in the database.</CardDescription>
        </CardHeader>
      </Card>
      <Source sourceReady={sourceReady} />
    </div>
  );
}
