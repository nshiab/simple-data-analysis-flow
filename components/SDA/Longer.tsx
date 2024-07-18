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
import OptionsInputText from "../partials/OptionsInputText"

export default function Longer({ id }: { id: string }) {
  const [columnsTo, setColumnsTo] = useState<string | undefined>(undefined)
  const [valuesTo, setValuesTo] = useState<string | undefined>(undefined)
  const [selectedColumns, setSelectedColumns] = useState<string[] | undefined>()
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
      if (Array.isArray(nodeData.data.selectedColumns)) {
        setSelectedColumns(nodeData.data.selectedColumns)
      }
      if (typeof nodeData.data.columnsTo === "string") {
        setColumnsTo(nodeData.data.columnsTo)
      }
      if (typeof nodeData.data.valuesTo === "string") {
        setValuesTo(nodeData.data.valuesTo)
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
        selectedColumns?.length &&
        typeof columnsTo === "string" &&
        typeof valuesTo === "string"
      ) {
        try {
          setLoader(true)

          const clonedTable = await table.cloneTable({
            outputTable: id,
          })
          await clonedTable.longer(selectedColumns, columnsTo, valuesTo)

          const originalTableName =
            source?.data?.originalTableName ?? table.name
          const code = `const ${originalTableName} = await ${originalTableName}.longer(${JSON.stringify(selectedColumns)}, "${columnsTo}", "${valuesTo}");`
          setCode(code)
          updateNodeData(id, {
            instance: clonedTable,
            originalTableName,
            code,
            selectedColumns,
            columnsTo,
            valuesTo,
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
    selectedColumns,
    columnsTo,
    valuesTo,
    columns,
  ])

  return (
    <div>
      <Target targetReady={targetReady} />
      <Card className="min-w-60 max-w-md">
        <Code code={code} />
        <CardHeader>
          <CardTitleWithLoader loader={loader}>Longer</CardTitleWithLoader>
          <CardDescription>
            Restructures a table by stacking values. Useful to tidy up data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OptionsMultiplesCheckBoxes
            label="Columns"
            items={columns}
            set={setSelectedColumns}
            values={selectedColumns ?? []}
          />
          <OptionsInputText
            label="New column for column names"
            value={columnsTo ?? ""}
            onClick={(e) => setColumnsTo(e)}
          />
          <OptionsInputText
            label="New column for values"
            value={valuesTo ?? ""}
            onClick={(e) => setValuesTo(e)}
          />
          <Error error={error} />
        </CardContent>
      </Card>
      <Source sourceReady={sourceReady} />
    </div>
  )
}
