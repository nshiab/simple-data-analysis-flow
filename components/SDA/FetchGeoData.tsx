import {
  Card,
  CardContent,
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
import { useEffect, useRef, useState } from "react";
import SimpleWebTable from "../../node_modules/simple-data-analysis/dist/class/SimpleWebTable";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Code from "../partials/Code";

export default function FetchGeoData({ id }: { id: string }) {
  const refUrl = useRef<HTMLInputElement | null>(null);
  const [url, setURL] = useState<null | string>(null);
  const [error, setError] = useState(false);

  const { updateNodeData } = useReactFlow();

  const target = useHandleConnections({ type: "target" });
  const source = useNodesData(target[0]?.source);

  const [code, setCode] = useState("");

  useEffect(() => {
    async function run() {
      const table = source?.data?.instance;
      if (table instanceof SimpleWebTable && typeof url === "string") {
        try {
          await table.fetchGeoData(url);
          const code = `// For front-end projects, use fetchGeoData. 
await ${table.name}.loadGeoData("${url}");`;
          setCode(code);
          updateNodeData(id, {
            instance: table,
            code,
          });
          setError(false);
        } catch (err) {
          console.log(err);
          setError(true);
        }
      }
    }

    run();
  }, [source, id, updateNodeData, url]);

  return (
    <div>
      <Handle type="target" position={Position.Top} />
      <Card className="max-w-xs">
        <Code code={code} />
        <CardHeader>
          <CardTitle>Fetch spatial data</CardTitle>
          <CardDescription>Fetches spatial data from a URL.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Input
              ref={refUrl}
              type="url"
              placeholder="URL"
              onKeyDown={(e) =>
                e.key === "Enter" && refUrl.current
                  ? setURL(refUrl.current.value)
                  : null
              }
            />
            <Button
              type="button"
              onClick={() => {
                if (refUrl.current) {
                  setURL(refUrl.current.value);
                }
              }}
            >
              Fetch
            </Button>
          </div>
          {error && (
            <div>
              <p className={`my-4 text-red-500`}>Error. Is this a valid URL?</p>
            </div>
          )}
        </CardContent>
      </Card>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
