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
import { useCallback, useEffect, useState } from "react";
import SimpleWebTable from "../../node_modules/simple-data-analysis/dist/class/SimpleWebTable";

import DataTable from "../partials/DataTable";
import OptionsInputNumber from "../partials/OptionsInputNumber";
import { Button } from "../ui/button";
import { dataAsCsv } from "journalism";
import Code from "../partials/Code";

export default function LogTable({ id }: { id: string }) {
  const { updateNodeData } = useReactFlow();

  const [data, setData] = useState<
    { [key: string]: string | number | Date | boolean | null }[] | null
  >(null);
  const [columns, setColumns] = useState<string[] | null>(null);
  const [types, setTypes] = useState<string[] | null>(null);
  const [nbRows, setNbRows] = useState<number | null>(null);
  const [nbRowsToLog, setNbRowsToLog] = useState<number | undefined>(10);

  const targetConnection = useHandleConnections({ type: "target" });
  const source = useNodesData(targetConnection[0]?.source);

  const [code, setCode] = useState("");

  useEffect(() => {
    async function run() {
      const table = source?.data?.instance;
      if (table instanceof SimpleWebTable) {
        setData(await table.getTop(nbRowsToLog ?? 10));
        const columns = await table.getColumns();
        const typesObj = await table.getTypes();
        const types = columns.map((d) => typesObj[d]);
        const nbRows = await table.getNbRows();
        setColumns(columns);
        setTypes(types);
        setNbRows(nbRows);
        const code = `await ${table.name}.logTable(${nbRowsToLog ?? 10})`;
        setCode(code);
        updateNodeData(id, { instance: table, code });
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
      const data = await table.getData();
      const csv = dataAsCsv(data);
      const a = document.createElement("a");
      const file = new Blob([csv as BlobPart], { type: "text/csv" });
      a.href = URL.createObjectURL(file);
      a.download = "data.csv";
      a.click();
    }
  }, [source]);

  return (
    <div>
      <Handle type="target" position={Position.Top} />
      <Card className="min-w-60">
        <Code code={code} />
        <CardHeader>
          <CardTitle>Log table</CardTitle>
          {data === null && <CardDescription>No data.</CardDescription>}
        </CardHeader>
        {Array.isArray(data) &&
          Array.isArray(columns) &&
          Array.isArray(types) &&
          typeof nbRows === "number" && (
            <CardContent>
              <OptionsInputNumber
                label="Number of rows to show:"
                defaultValue={10}
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
                  Download as CSV
                </Button>
              </div>
            </CardContent>
          )}
      </Card>
    </div>
  );
}
