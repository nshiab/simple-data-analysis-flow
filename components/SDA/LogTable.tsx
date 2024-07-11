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
import { useCallback, useEffect, useState } from "react";
import SimpleWebTable from "../../node_modules/simple-data-analysis/dist/class/SimpleWebTable";

import DataTable from "../partials/DataTable";
import OptionsInputNumber from "../partials/OptionsInputNumber";
import { Button } from "../ui/button";
import { dataAsCsv } from "journalism";
import Code from "../partials/Code";
import CardTitleWithLoader from "../partials/CardTitleWithLoader";

const defaultNbRows = 5;

export default function LogTable({ id }: { id: string }) {
  const { updateNodeData } = useReactFlow();

  const [data, setData] = useState<
    { [key: string]: string | number | Date | boolean | null }[] | null
  >(null);
  const [columns, setColumns] = useState<string[] | null>(null);
  const [types, setTypes] = useState<string[] | null>(null);
  const [nbRows, setNbRows] = useState<number | null>(null);
  const [nbRowsToLog, setNbRowsToLog] = useState<number | undefined>(
    defaultNbRows
  );

  const targetConnection = useHandleConnections({ type: "target" });
  const source = useNodesData(targetConnection[0]?.source);

  const [code, setCode] = useState("");
  const [downloadLabel, setDownloadLabel] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    async function run() {
      const table = source?.data?.instance;
      if (table instanceof SimpleWebTable) {
        setLoader(true);
        setData(await table.getTop(nbRowsToLog ?? defaultNbRows));
        const columns = await table.getColumns();
        const typesObj = await table.getTypes();
        const types = columns.map((d) => typesObj[d]);
        const nbRows = await table.getNbRows();
        setColumns(columns);
        setTypes(types);
        setNbRows(nbRows);

        const originalTableName = source?.data?.originalTableName ?? table.name;
        const code = `await ${originalTableName}.logTable(${
          nbRowsToLog ?? defaultNbRows
        })`;
        setCode(code);
        updateNodeData(id, { instance: table, code });

        if (types.some((d) => d === "GEOMETRY")) {
          setDownloadLabel("Download as GeoJSON");
        } else {
          setDownloadLabel("Download as CSV");
        }
        setLoader(false);
      } else {
        setData(null);
        setColumns(null);
        setTypes(null);
        setNbRows(null);
      }
    }

    run();
  }, [source, nbRowsToLog, id, updateNodeData]);

  const downloadFile = useCallback(async () => {
    const table = source?.data?.instance;
    if (table instanceof SimpleWebTable) {
      const types = await table.getTypes();
      if (Object.values(types).some((d) => d === "GEOMETRY")) {
        const data = await table.getGeoData();
        const string = JSON.stringify(data);
        const a = document.createElement("a");
        const file = new Blob([string as BlobPart], { type: "text/plain" });
        a.href = URL.createObjectURL(file);
        a.download = "data.geojson";
        a.click();
      } else {
        const data = await table.getData();
        const csv = dataAsCsv(data);
        const a = document.createElement("a");
        const file = new Blob([csv as BlobPart], { type: "text/plain" });
        a.href = URL.createObjectURL(file);
        a.download = "data.csv";
        a.click();
      }
    }
  }, [source]);

  return (
    <div>
      <Handle type="target" position={Position.Top} />
      <Card className="min-w-60">
        <Code code={code} />
        <CardHeader>
          <CardTitleWithLoader loader={loader}>Log table</CardTitleWithLoader>
          {data === null && <CardDescription>No data.</CardDescription>}
        </CardHeader>
        {Array.isArray(data) &&
          Array.isArray(columns) &&
          Array.isArray(types) &&
          typeof nbRows === "number" && (
            <CardContent>
              <OptionsInputNumber
                label="Number of rows to show:"
                defaultValue={defaultNbRows}
                set={setNbRowsToLog}
              />
              <DataTable
                data={data}
                columns={columns}
                types={types}
                nbRows={nbRows}
              />
              <div className="text-right">
                <Button variant={"secondary"} onClick={downloadFile}>
                  {downloadLabel}
                </Button>
              </div>
            </CardContent>
          )}
      </Card>
    </div>
  );
}
