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
import CardTitleWithLoader from "../partials/CardTitleWithLoader";
import Error from "../partials/Error";
import Target from "../partials/Target";
import Source from "../partials/Source";
import OptionsSelect from "../partials/OptionsSelect";
import OptionsMultiplesCheckBoxes from "../partials/OptionsMultipleCheckBoxes";
import OptionsInputNumber from "../partials/OptionsInputNumber";

export default function Summarize({ id }: { id: string }) {
  const [values, setValues] = useState<string[] | undefined>();
  const [categories, setCategories] = useState<string[] | undefined>();
  const [summaries, setSummaries] = useState<
    | (
        | "count"
        | "countUnique"
        | "min"
        | "max"
        | "median"
        | "sum"
        | "skew"
        | "stdDev"
        | "var"
      )[]
    | undefined
  >(["count"]);
  const [decimals, setDecimals] = useState<number | undefined>(2);
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
  const [targetReady, setTargetReady] = useState(false);
  const [sourceReady, setSourceReady] = useState(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    async function run() {
      const table = source?.data?.instance;
      if (table instanceof SimpleWebTable) {
        setTargetReady(true);
      }
      if (table instanceof SimpleWebTable && values?.length) {
        try {
          setLoader(true);

          const outputTable = await table.summarize({
            values,
            categories,
            summaries,
            decimals,
            outputTable: `${id}SummarizeTable`,
          });

          const originalTableName =
            source?.data?.originalTableName ?? table.name;
          const code = `const ${id}SummarizeTable = await ${originalTableName}.summarize({
  values: ${JSON.stringify(values)},
  categories: ${JSON.stringify(categories)},
  summaries: ${JSON.stringify(summaries)},
  decimals: ${decimals},
  outputTable: ${id}SummarizeTable,
});`;
          setCode(code);
          updateNodeData(id, {
            instance: outputTable,
            originalTableName: `${id}SummarizeTable`,
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
  }, [source, id, updateNodeData, values, categories, summaries, decimals]);

  return (
    <div>
      <Target targetReady={targetReady} />
      <Card className="min-w-60 max-w-md">
        <Code code={code} />
        <CardHeader>
          <CardTitleWithLoader loader={loader}>Summarize</CardTitleWithLoader>
          <CardDescription>Aggregates the data.</CardDescription>
        </CardHeader>
        <CardContent>
          {targetReady && (
            <>
              <OptionsMultiplesCheckBoxes
                label="Values:"
                items={columns}
                set={setValues}
              />
              <OptionsMultiplesCheckBoxes
                label="Categories:"
                items={columns}
                set={setCategories}
              />
              <OptionsMultiplesCheckBoxes
                label="Summaries:"
                items={[
                  { value: "count", label: "Count" },
                  { value: "countUnique", label: "Count uniques" },
                  { value: "min", label: "Minimum" },
                  { value: "max", label: "Maximum" },
                  { value: "mean", label: "Mean" },
                  { value: "median", label: "Median" },
                  { value: "sum", label: "Sum" },
                  { value: "skew", label: "Skew" },
                  { value: "stdDev", label: "Standard deviation" },
                  { value: "var", label: "Variance" },
                ]}
                //@ts-expect-error Okay...
                set={setSummaries}
              />
              <OptionsInputNumber
                label="Decimals:"
                defaultValue={2}
                set={setDecimals}
              />
            </>
          )}

          <Error error={error} />
        </CardContent>
      </Card>
      <Source sourceReady={sourceReady} />
    </div>
  );
}
