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
import { useState } from "react";
import SimpleWebDB from "../../node_modules/simple-data-analysis/dist/class/SimpleWebDB";
import {
  AsyncDuckDB,
  AsyncDuckDBConnection,
  DuckDBDataProtocol,
} from "@duckdb/duckdb-wasm";

export default function ST() {
  const [fileName, setFileName] = useState("");

  const { updateNodeData } = useReactFlow();

  const sdbConnection = useHandleConnections({ type: "target" });
  const sdb = useNodesData(sdbConnection[0].source)?.data?.instance;

  return (
    <div
      onDrop={async (evt) => {
        evt.preventDefault();
        const items = evt.dataTransfer.items;
        // @ts-expect-error Still experimental
        const file = await items[0].getAsFileSystemHandle();
        const fileSplit = (file.name as string).split(".");
        const extension = fileSplit[1].toLowerCase();
        const tableName = fileSplit[0];

        if (sdb instanceof SimpleWebDB) {
          console.log(tableName);
          // await (sdb.db as AsyncDuckDB).registerFileHandle(
          //   file.name,
          //   file,
          //   DuckDBDataProtocol.BROWSER_FILEREADER,
          //   true
          // );
          // if (extension === "csv") {
          //   await (sdb.connection as AsyncDuckDBConnection).insertCSVFromPath(
          //     file.name,
          //     { name: tableName }
          //   );
          // }
          // console.log(await sdb.getTables());
          // const table = sdb.newTable(tableName);
          // await table.logTable();
        }

        if (file) {
          setFileName(file.name);
        }
      }}
      onDragOver={(evt) => evt.preventDefault()}
    >
      <Handle type="target" position={Position.Top} />
      <Card className="max-w-xs">
        <CardHeader>
          <CardTitle>SimpleTable</CardTitle>
          <CardDescription>
            This is a table
            {fileName === ""
              ? ". Drag-and-drop a CSV, JSON, or Parquet file."
              : ` with data from ${fileName}.`}
          </CardDescription>
        </CardHeader>
      </Card>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
