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
import { Label } from "../ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Accordion, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { AccordionContent } from "@radix-ui/react-accordion";

export default function FetchData({ id }: { id: string }) {
  const refUrl = useRef<HTMLInputElement | null>(null);
  const [url, setURL] = useState<null | string>(null);
  const [error, setError] = useState(false);
  const [autoDetect, setAutoDetect] = useState(true);
  const [fileType, setFileType] = useState<
    "csv" | "dsv" | "json" | "parquet" | undefined
  >(undefined);
  const [header, setHeader] = useState(true);
  const [delim, setDelim] = useState<string | undefined>(undefined);
  const [skip, setSkip] = useState<number | undefined>(undefined);

  const { updateNodeData } = useReactFlow();

  const target = useHandleConnections({ type: "target" });
  const source = useNodesData(target[0]?.source);

  useEffect(() => {
    async function run() {
      const table = source?.data?.instance;
      if (table instanceof SimpleWebTable && typeof url === "string") {
        try {
          await table.fetchData(url, {
            fileType,
            autoDetect,
            header,
            delim,
            skip,
          });
          updateNodeData(id, {
            instance: table,
          });
          setError(false);
        } catch (err) {
          console.log(err);
          setError(true);
        }
      }
    }

    run();
  }, [
    source,
    id,
    updateNodeData,
    url,
    fileType,
    autoDetect,
    header,
    delim,
    skip,
  ]);

  return (
    <div>
      <Handle type="target" position={Position.Top} />
      <Card className="max-w-xs">
        <CardHeader>
          <CardTitle>Fetch data</CardTitle>
          <CardDescription>Fetches data from a URL.</CardDescription>
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
          <Accordion type="single" collapsible className="mt-3">
            <AccordionItem value="item-1">
              <AccordionTrigger>Options</AccordionTrigger>
              <AccordionContent>
                <div className="flex items-center space-x-2 my-4">
                  <Checkbox
                    defaultChecked
                    onCheckedChange={(e: boolean) => setAutoDetect(e)}
                  />
                  <Label>Auto-detect</Label>
                </div>
                <div className="my-4">
                  <Label>File type</Label>
                  <Select
                    onValueChange={(e: "csv" | "dsv" | "json" | "parquet") =>
                      setFileType(e)
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="dsv">DSV</SelectItem>
                        <SelectItem value="json">JSON</SelectItem>
                        <SelectItem value="parquet">Parquet</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2 my-4">
                  <Checkbox
                    defaultChecked
                    onCheckedChange={(e: boolean) => setHeader(e)}
                  />
                  <Label>Header</Label>
                </div>
                <div className="my-4">
                  <Label>Delimiter</Label>
                  <Input
                    type="text"
                    className="w-20"
                    defaultValue={""}
                    onChange={(e) => setDelim(e.target.value)}
                  />
                </div>
                <div className="my-4">
                  <Label>Skip rows</Label>
                  <Input
                    type="number"
                    className="w-20"
                    defaultValue={0}
                    onChange={(e) => setSkip(parseInt(e.target.value))}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
