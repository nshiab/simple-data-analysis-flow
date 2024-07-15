import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useHandleConnections,
  useNodesData,
  useReactFlow,
} from "@xyflow/react";
import { ChangeEvent, useEffect, useState } from "react";
import SimpleWebDB from "../../node_modules/simple-data-analysis/dist/class/SimpleWebDB";
import Code from "../partials/Code";
import Target from "../partials/Target";
import Source from "../partials/Source";
import OptionsInputText from "../partials/OptionsInputText";

export default function ST({ id }: { id: string }) {
  const { updateNodeData } = useReactFlow();
  const [targetReady, setTargetReady] = useState(false);
  const [sourceReady, setSourceReady] = useState(false);

  const targetConnection = useHandleConnections({ type: "target" });
  const source = useNodesData(targetConnection[0]?.source);

  const [name, setName] = useState<string | undefined>(`${id}`);
  const [code, setCode] = useState("");

  useEffect(() => {
    const sdb = source?.data?.instance;
    if (sdb instanceof SimpleWebDB) {
      setTargetReady(true);
      const code = `const ${name} = sdb.newTable("${name}");`;
      setCode(code);
      updateNodeData(id, {
        instance: sdb.newTable(name),
        code: code,
      });
      setSourceReady(true);
    }
  }, [source, id, updateNodeData, name]);

  return (
    <div>
      <Target targetReady={targetReady} />
      <Card>
        <Code code={code} />
        <CardHeader>
          <CardTitle>SimpleTable</CardTitle>
          <CardDescription>This is a table in the database.</CardDescription>
        </CardHeader>
        <CardContent>
          <OptionsInputText
            label="Name"
            defaultValue={`${id}`}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
        </CardContent>
      </Card>
      <Source sourceReady={sourceReady} />
    </div>
  );
}
