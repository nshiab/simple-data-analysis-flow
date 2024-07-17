import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import { useHandleConnections, useNodesData, useReactFlow } from "@xyflow/react"
import { ChangeEvent, useEffect, useState } from "react"
import SimpleWebTable from "../../node_modules/simple-data-analysis/dist/class/SimpleWebTable"

import Code from "../partials/Code"
import CardTitleWithLoader from "../partials/CardTitleWithLoader"
import Error from "../partials/Error"
import Target from "../partials/Target"
import Source from "../partials/Source"
import OptionsMultiplesCheckBoxes from "../partials/OptionsMultipleCheckBoxes"
import OptionsInputNumber from "../partials/OptionsInputNumber"
import OptionsInputText from "../partials/OptionsInputText"
import OptionsSelect from "../partials/OptionsSelect"

export default function LinearRegressions({ id }: { id: string }) {
  const [name, setName] = useState<string>(`${id}LinearRegression`)
  const [x, setX] = useState<string | undefined>()
  const [y, setY] = useState<string | undefined>()
  const [categories, setCategories] = useState<string[] | undefined>(["count"])
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
      if (typeof nodeData.data.x === "string") {
        setX(nodeData.data.x)
      }
      if (typeof nodeData.data.y === "string") {
        setY(nodeData.data.y)
      }
      if (Array.isArray(nodeData.data.categories)) {
        setCategories(nodeData.data.categories)
      }
      if (typeof nodeData.data.decimals === "number") {
        setDecimals(nodeData.data.decimals)
      }
      if (typeof nodeData.data.outputTable === "string") {
        setName(nodeData.data.outputTable)
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
      if (
        table instanceof SimpleWebTable &&
        typeof x === "string" &&
        typeof y === "string"
      ) {
        try {
          setLoader(true)

          const outputTable = await table.linearRegressions({
            x,
            y,
            categories,
            decimals,
            outputTable: name,
          })

          const originalTableName =
            source?.data?.originalTableName ?? table.name
          const code = `const ${name} = await ${originalTableName}.linearRegressions({
  x: "${x}",
  y: "${y}",
  categories: ${JSON.stringify(categories)},
  decimals: ${decimals},
  outputTable: "${name}",
});`
          setCode(code)
          updateNodeData(id, {
            instance: outputTable,
            originalTableName: name,
            code,
            x,
            y,
            categories,
            decimals,
            outputTable: name,
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
  }, [source, id, updateNodeData, x, y, categories, decimals, name])

  return (
    <div>
      <Target targetReady={targetReady} />
      <Card className="min-w-60 max-w-md">
        <Code code={code} />
        <CardHeader>
          <CardTitleWithLoader loader={loader}>
            Linear regressions
          </CardTitleWithLoader>
          <CardDescription>
            The results include the slope, the y-intercept the R-squared.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OptionsInputText
            label="Table name"
            value={name}
            onClick={(e: string) => setName(e)}
          />
          {targetReady && (
            <>
              <OptionsSelect
                label="X"
                items={columns}
                placeholder="Pick a column"
                value={x ?? ""}
                onChange={(e) => setX(e)}
              />
              <OptionsSelect
                label="Y"
                items={columns}
                placeholder="Pick a column"
                value={y ?? ""}
                onChange={(e) => setY(e)}
              />
              <OptionsMultiplesCheckBoxes
                label="Categories"
                items={columns}
                set={setCategories}
              />
              <OptionsInputNumber
                label="Decimals"
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
  )
}
