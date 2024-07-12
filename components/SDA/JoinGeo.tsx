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
import CardTitleWithLoader from "../partials/CardTitleWithLoader";
import Error from "../partials/Error";
import Target from "../partials/Target";
import Source from "../partials/Source";
import Options from "../partials/Options";
import OptionsInputNumber from "../partials/OptionsInputNumber";
import OptionsInputText from "../partials/OptionsInputText";

export default function JoinGeo({ id }: { id: string }) {
  const [name, setName] = useState<string | undefined>(`${id}JoinGeo`);
  const [columnsLeft, setColumnsLeft] = useState<
    { value: string; label: string }[]
  >([]);
  const [columnsRight, setColumnsRight] = useState<
    { value: string; label: string }[]
  >([]);
  const [geoLeft, setGeoLeft] = useState("");
  const [geoRight, setGeoRight] = useState("");
  const [method, setMethod] = useState<"intersect" | "inside" | "within" | "">(
    ""
  );
  const [distance, setDistance] = useState<number | undefined>(undefined);
  const [distanceMethod, setDistanceMethod] = useState<
    "srs" | "haversine" | "spheroid" | undefined
  >(undefined);
  const [joinType, setJoinType] = useState<
    "inner" | "left" | "right" | "full" | undefined
  >(undefined);

  const { updateNodeData } = useReactFlow();

  const targetLeft = useHandleConnections({ type: "target", id: "left" });
  const sourceLeft = useNodesData(targetLeft[0]?.source);

  useEffect(() => {
    async function run() {
      const tableLeft = sourceLeft?.data?.instance;
      if (tableLeft instanceof SimpleWebTable) {
        setColumnsLeft(
          (await tableLeft.getColumns()).map((d) => ({ value: d, label: d }))
        );
      }
    }
    run();
  }, [sourceLeft]);

  const targetRight = useHandleConnections({ type: "target", id: "right" });
  const sourceRight = useNodesData(targetRight[0]?.source);

  useEffect(() => {
    async function run() {
      const tableRight = sourceRight?.data?.instance;
      if (tableRight instanceof SimpleWebTable) {
        setColumnsRight(
          (await tableRight.getColumns()).map((d) => ({ value: d, label: d }))
        );
      }
    }
    run();
  }, [sourceRight]);

  const [code, setCode] = useState("");
  const [loader, setLoader] = useState(false);
  const [sourceReady, setSourceReady] = useState(false);
  const [targetLeftReady, setTargetLeftReady] = useState(false);
  const [targetRightReady, setTargetRightReady] = useState(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    async function run() {
      if (targetLeftReady) {
        const tableLeft = sourceLeft?.data?.instance;
        if (tableLeft instanceof SimpleWebTable) {
          const types = await tableLeft.getTypes();
          for (const key of Object.keys(types)) {
            if (types[key] === "GEOMETRY") {
              setGeoLeft(key);
              break;
            }
          }
        }
      }
      if (targetRightReady) {
        const tableRight = sourceRight?.data?.instance;
        if (tableRight instanceof SimpleWebTable) {
          const types = await tableRight.getTypes();
          for (const key of Object.keys(types)) {
            if (types[key] === "GEOMETRY") {
              setGeoRight(key);
              break;
            }
          }
        }
      }
    }
    run();
  }, [
    targetLeftReady,
    targetRightReady,
    setGeoRight,
    setGeoLeft,
    sourceLeft,
    sourceRight,
  ]);

  useEffect(() => {
    async function run() {
      const tableLeft = sourceLeft?.data?.instance;
      const tableRight = sourceRight?.data?.instance;
      if (tableLeft instanceof SimpleWebTable) {
        setTargetLeftReady(true);
      }
      if (tableRight instanceof SimpleWebTable) {
        setTargetRightReady(true);
      }
      if (
        tableLeft instanceof SimpleWebTable &&
        tableRight instanceof SimpleWebTable &&
        geoLeft !== "" &&
        geoRight !== "" &&
        method !== ""
      ) {
        try {
          setLoader(true);
          const outputTable = await tableLeft.joinGeo(tableRight, method, {
            leftTableColumn: geoLeft,
            rightTableColumn: geoRight,
            distance,
            distanceMethod,
            type: joinType,
            outputTable: name,
          });

          const originalTableLeftName =
            sourceLeft?.data?.originalTableName ?? tableLeft.name;
          const originalTableRightName =
            sourceRight?.data?.originalTableName ?? tableRight.name;
          const code = `const name = await ${originalTableLeftName}.joinGeo(${originalTableRightName}, "${method}", {
  leftTableColumn: "${geoLeft}",
  rightTableColumn: "${geoRight}",
  distance: "${distance}",
  distanceMethod: "${distanceMethod}",
  type: "${joinType}",
  outputTable: ${name},
})`;
          setCode(code);
          updateNodeData(id, {
            instance: outputTable,
            originalTableName: name,
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
          setSourceReady(true);
        }
      }
    }

    run();
  }, [
    sourceLeft,
    sourceRight,
    id,
    updateNodeData,
    geoLeft,
    geoRight,
    method,
    distance,
    distanceMethod,
    joinType,
    name,
  ]);

  return (
    <div>
      <div className="flex justify-evenly -translate-x-[42%]">
        <Target targetReady={targetLeftReady} id="left" />
        <Target targetReady={targetRightReady} id="right" />
      </div>
      <Card>
        <Code code={code} />
        <CardHeader>
          <CardTitleWithLoader loader={loader}>Join geo</CardTitleWithLoader>
          <CardDescription>
            Joins two tables based on geometries.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OptionsInputText
            label="Table name"
            defaultValue={`${id}JoinGeo`}
            set={setName}
          />
          <OptionsSelect
            label="Left geometries"
            placeholder="Pick a column"
            items={columnsLeft}
            onChange={(e) => setGeoLeft(e)}
            value={geoLeft}
          />
          <OptionsSelect
            label="Right geometries"
            placeholder="Pick a column"
            items={columnsRight}
            onChange={(e) => setGeoRight(e)}
            value={geoRight}
          />
          <OptionsSelect
            label="Method:"
            placeholder="Pick a method"
            items={[
              { value: "intersect", label: "Intersect" },
              { value: "inside", label: "Inside" },
              { value: "within", label: "Within" },
            ]}
            onChange={(e) => setMethod(e)}
          />
          <Error error={error} />
          <Options>
            <OptionsInputNumber
              label={"Distance (for method Within):"}
              defaultValue={0}
              set={setDistance}
            />
            <OptionsSelect
              label="Distance method (if Haversine or Spheroid, the distance unit is meter):"
              placeholder="SRS"
              items={[
                { value: "SRS", label: "SRS" },
                { value: "haversine", label: "Haversine" },
                { value: "spheroid", label: "Spheroid" },
              ]}
              onChange={(e) => setDistanceMethod(e)}
            />
            <OptionsSelect
              label="Join type"
              placeholder="Left"
              items={[
                { value: "left", label: "Left" },
                { value: "inner", label: "Inner" },
                { value: "full", label: "Full" },
                { value: "right", label: "right" },
              ]}
              onChange={(e) => setJoinType(e)}
            />
          </Options>
        </CardContent>
      </Card>
      <Source sourceReady={sourceReady} />
    </div>
  );
}
