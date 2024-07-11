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
import { useEffect, useState } from "react";
import SimpleWebTable from "../../node_modules/simple-data-analysis/dist/class/SimpleWebTable";

import Code from "../partials/Code";
import OptionsSelect from "../partials/OptionsSelect";
import OptionsInputText from "../partials/OptionsInputText";
import CardTitleWithLoader from "../partials/CardTitleWithLoader";

const defaultNewColumn = "geom";

export default function Points({ id }: { id: string }) {
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [newColumn, setNewColumn] = useState<string | undefined>(
    defaultNewColumn
  );
  const [columns, setColumns] = useState<{ value: string; label: string }[]>(
    []
  );

  const { updateNodeData } = useReactFlow();

  const target = useHandleConnections({ type: "target" });
  const source = useNodesData(target[0]?.source);

  useEffect(() => {
    async function run() {
      const table = source?.data?.instance;
      if (table instanceof SimpleWebTable) {
        setColumns(
          (await table.getColumns()).map((d) => ({ value: d, label: d }))
        );
      }
    }
    run();
  }, [source]);

  const [code, setCode] = useState("");
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    async function run() {
      const table = source?.data?.instance;
      if (
        table instanceof SimpleWebTable &&
        lat !== "" &&
        lon !== "" &&
        typeof newColumn === "string" &&
        newColumn !== ""
      ) {
        setLoader(true);
        const clonedTable = await table.cloneTable({
          outputTable: `${id}Table`,
        });
        await clonedTable.points(lat, lon, newColumn);

        const originalTableName = source?.data?.originalTableName ?? table.name;
        const code = `await ${originalTableName}.points("${lat}", "${lon}", "${newColumn}");`;
        setCode(code);
        updateNodeData(id, {
          instance: clonedTable,
          originalTableName: originalTableName,
          code,
        });
        setLoader(false);
      }
    }

    run();
  }, [source, id, updateNodeData, lat, lon, newColumn]);

  return (
    <div>
      <Handle type="target" position={Position.Top} />
      <Card className="max-w-xs">
        <Code code={code} />
        <CardHeader>
          <CardTitleWithLoader loader={loader}>Points</CardTitleWithLoader>
          <CardDescription>
            Creates point geometries from longitude a latitude columns.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OptionsSelect
            label="Latitude:"
            placeholder=""
            items={columns}
            onChange={(e) => setLat(e)}
          />
          <OptionsSelect
            label="Longitude:"
            placeholder=""
            items={columns}
            onChange={(e) => setLon(e)}
          />
          <OptionsInputText
            label="New column"
            defaultValue={defaultNewColumn}
            set={setNewColumn}
          />
        </CardContent>
      </Card>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
