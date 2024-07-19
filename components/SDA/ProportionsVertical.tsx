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
import OptionsSelect from "../partials/OptionsSelect"

export default function ProportionsVertical({ id }: { id: string }) {
  const [column, setColumn] = useState<string | undefined>(undefined)
  const [newColumn, setNewColumn] = useState<string | undefined>(undefined)
  const [categories, setCategories] = useState<string[] | undefined>(undefined)
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
      if (typeof nodeData.data.column === "string") {
        setColumn(nodeData.data.column)
      }
      if (typeof nodeData.data.newColumn === "string") {
        setNewColumn(nodeData.data.newColumn)
      }
      if (Array.isArray(nodeData.data.categories)) {
        setCategories(nodeData.data.categories)
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
      if (
        table instanceof SimpleWebTable &&
        typeof column === "string" &&
        typeof newColumn === "string"
      ) {
        try {
          setLoader(true)

          const clonedTable = await table.cloneTable({ outputTable: id })
          await clonedTable.proportionsVertical(column, newColumn, {
            categories,
            decimals,
          })

          const originalTableName =
            source?.data?.originalTableName ?? table.name
          const code = `await ${originalTableName}.proportionsVertical("${column}", "${newColumn}", {
  categories: ${JSON.stringify(categories)},
  decimals: ${decimals},
});`
          setCode(code)
          updateNodeData(id, {
            instance: clonedTable,
            originalTableName,
            code,
            column,
            newColumn,
            categories,
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
    column,
    newColumn,
    categories,
    decimals,
    columns,
  ])

  return (
    <div>
      <Target targetReady={targetReady} />
      <Card className="min-w-60 max-w-md">
        <Code code={code} />
        <CardHeader>
          <CardTitleWithLoader loader={loader}>
            Proportions vertical
          </CardTitleWithLoader>
          <CardDescription>
            Computes the proportions in a column.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <>
            <OptionsSelect
              label="Column"
              items={columns}
              placeholder="Pick a column"
              value={column ?? ""}
              onChange={(e) => setColumn(e)}
            />
            <OptionsInputText
              label="New column"
              value={newColumn ?? ""}
              onClick={(e) => setNewColumn(e)}
            />
            <OptionsMultiplesCheckBoxes
              label="Categories"
              items={columns}
              values={categories ?? []}
              set={setCategories}
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
