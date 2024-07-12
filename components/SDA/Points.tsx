import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
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
import Error from "../partials/Error";
import Target from "../partials/Target";
import Source from "../partials/Source";

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
  const [targetReady, setTargetReady] = useState(false);
  const [sourceReady, setSourceReady] = useState(false);

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
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    async function run() {
      const table = source?.data?.instance;
      if (table instanceof SimpleWebTable) {
        setTargetReady(true);
      }
      if (
        table instanceof SimpleWebTable &&
        lat !== "" &&
        lon !== "" &&
        typeof newColumn === "string" &&
        newColumn !== ""
      ) {
        try {
          setLoader(true);
          const clonedTable = await table.cloneTable({
            outputTable: `${id}Table`,
          });
          await clonedTable.points(lat, lon, newColumn);

          const originalTableName =
            source?.data?.originalTableName ?? table.name;
          const code = `await ${originalTableName}.points("${lat}", "${lon}", "${newColumn}");`;
          setCode(code);
          updateNodeData(id, {
            instance: clonedTable,
            originalTableName: originalTableName,
            code,
          });
          setError(null);
          setLoader(false);
          setSourceReady(true);
        } catch (err) {
          console.error(err);
          //@ts-expect-error okay
          setError(err.message);
          setLoader(false);
          setSourceReady(false);
        }
      }
    }

    run();
  }, [source, id, updateNodeData, lat, lon, newColumn]);

  return (
    <div>
      <Target targetReady={targetReady} />
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
            placeholder="Pick a column"
            items={columns}
            onChange={(e) => setLat(e)}
          />
          <OptionsSelect
            label="Longitude:"
            placeholder="Pick a column"
            items={columns}
            onChange={(e) => setLon(e)}
          />
          <OptionsInputText
            label="New column"
            defaultValue={defaultNewColumn}
            set={setNewColumn}
          />
          <Error error={error} />
        </CardContent>
      </Card>
      <Source sourceReady={sourceReady} />
    </div>
  );
}
