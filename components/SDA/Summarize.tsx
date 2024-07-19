import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import { useHandleConnections, useNodesData, useReactFlow } from "@xyflow/react"
import { useEffect, useState } from "react"
import SimpleWebTable from "../../node_modules/simple-data-analysis/dist/class/SimpleWebTable"

import Code from "../partials/Code"
import CardTitleWithLoader from "../partials/CardTitleWithLoader"
import Error from "../partials/Error"
import Target from "../partials/Target"
import Source from "../partials/Source"
import OptionsMultiplesCheckBoxes from "../partials/OptionsMultipleCheckBoxes"
import OptionsInputNumber from "../partials/OptionsInputNumber"
import OptionsInputText from "../partials/OptionsInputText"

export default function Summarize({ id }: { id: string }) {
  const [name, setName] = useState<string>(`${id}Summarize`)
  const [values, setValues] = useState<string[] | undefined>()
  const [categories, setCategories] = useState<string[] | undefined>()
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
  >(["count"])
  const [decimals, setDecimals] = useState<number | undefined>(2)
  const [columns, setColumns] = useState<{ value: string; label: string }[]>([])

  const { updateNodeData } = useReactFlow()

  const target = useHandleConnections({ type: "target" })
  const source = useNodesData(target[0]?.source)

  useEffect(() => {
    async function run() {
      const table = source?.data?.instance
      if (table instanceof SimpleWebTable) {
        setColumns(
          (await table.getColumns()).map((d) => ({ value: d, label: d }))
        )
      }
    }
    run()
  }, [source])

  const [code, setCode] = useState("")
  const [loader, setLoader] = useState(false)
  const [targetReady, setTargetReady] = useState(false)
  const [sourceReady, setSourceReady] = useState(false)
  const [error, setError] = useState<null | string>(null)

  const nodeData = useNodesData(id)
  useEffect(() => {
    if (nodeData?.data.imported) {
      if (typeof nodeData.data.outputTable === "string") {
        setName(nodeData.data.outputTable)
      }
      if (Array.isArray(nodeData.data.values)) {
        setValues(nodeData.data.values)
      }
      if (Array.isArray(nodeData.data.categories)) {
        setCategories(nodeData.data.categories)
      }
      if (Array.isArray(nodeData.data.summaries)) {
        setSummaries(nodeData.data.summaries)
      }
      if (typeof nodeData.data.decimals === "number") {
        setDecimals(nodeData.data.decimals)
      }
      if (Array.isArray(nodeData.data.columns)) {
        setColumns(nodeData.data.columns)
      }
      nodeData.data.imported = false
    }
  }, [nodeData])

  useEffect(() => {
    async function run() {
      const table = source?.data?.instance
      if (table instanceof SimpleWebTable) {
        setTargetReady(true)
      }
      if (table instanceof SimpleWebTable && values?.length) {
        try {
          setLoader(true)

          const outputTable = await table.summarize({
            values,
            categories,
            summaries,
            decimals,
            outputTable: name,
          })

          const originalTableName =
            source?.data?.originalTableName ?? table.name
          const code = `const ${name} = await ${originalTableName}.summarize({
  values: ${JSON.stringify(values)},
  categories: ${JSON.stringify(categories)},
  summaries: ${JSON.stringify(summaries)},
  decimals: ${decimals},
  outputTable: "${name}",
});`
          setCode(code)
          updateNodeData(id, {
            instance: outputTable,
            originalTableName: name,
            code,
            outputTable: name,
            values,
            categories,
            summaries,
            decimals,
            columns,
          })
          setError(null)
          setLoader(false)
          setSourceReady(true)
        } catch (err) {
          console.error(err)
          //@ts-expect-error okay
          setError(err.message)
          setLoader(false)
          setSourceReady(false)
        }
      }
    }

    run()
  }, [
    source,
    id,
    updateNodeData,
    values,
    categories,
    summaries,
    decimals,
    name,
    columns,
  ])

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
          <OptionsInputText
            label="Table name"
            value={name}
            onClick={(e: string) => setName(e)}
          />

          <>
            <OptionsMultiplesCheckBoxes
              label="Values"
              items={columns}
              set={setValues}
              values={values ?? []}
            />
            <OptionsMultiplesCheckBoxes
              label="Categories"
              items={columns}
              set={setCategories}
              values={categories ?? []}
            />
            <OptionsMultiplesCheckBoxes
              label="Summaries"
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
              values={summaries ?? []}
              //@ts-ignore
              set={setSummaries}
            />
            <OptionsInputNumber
              label="Decimals"
              value={decimals}
              set={setDecimals}
            />
          </>
          <Error error={error} />
        </CardContent>
      </Card>
      <Source sourceReady={sourceReady} />
    </div>
  )
}
