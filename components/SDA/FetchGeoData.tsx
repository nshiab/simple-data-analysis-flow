import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
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
import CardTitleWithLoader from "../partials/CardTitleWithLoader";
import Error from "../partials/Error";
import Target from "../partials/Target";
import Source from "../partials/Source";

export default function FetchGeoData({ id }: { id: string }) {
  const refUrl = useRef<HTMLInputElement | null>(null);
  const [url, setURL] = useState<null | string>(null);

  const { updateNodeData } = useReactFlow();

  const target = useHandleConnections({ type: "target" });
  const source = useNodesData(target[0]?.source);

  const [code, setCode] = useState("");
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    async function run() {
      const table = source?.data?.instance;
      if (table instanceof SimpleWebTable && typeof url === "string") {
        try {
          setLoader(true);
          await table.fetchGeoData(url);
          const code = `// For front-end projects, use fetchGeoData. 
await ${table.name}.loadGeoData("${url}");`;
          setCode(code);
          updateNodeData(id, {
            instance: table,
            code,
          });
          setError(null);
          setLoader(false);
        } catch (err) {
          console.error(err);
          // @ts-expect-error okay
          setError(err.message);
          setLoader(false);
        }
      }
    }

    run();
  }, [source, id, updateNodeData, url]);

  return (
    <div>
      <Target />
      <Card className="max-w-xs">
        <Code code={code} />
        <CardHeader>
          <CardTitleWithLoader loader={loader}>
            Fetch geo data
          </CardTitleWithLoader>
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
          <Error error={error} />
        </CardContent>
      </Card>
      <Source />
    </div>
  );
}
