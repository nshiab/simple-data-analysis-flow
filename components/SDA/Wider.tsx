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
import OptionsSelect from "../partials/OptionsSelect"

export default function Wider({ id }: { id: string }) {
  const [columnsFrom, setColumnsFrom] = useState<string | undefined>(undefined)
  const [valuesFrom, setValuesFrom] = useState<string | undefined>(undefined)
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
      if (typeof nodeData.data.columnsFrom === "string") {
        setColumnsFrom(nodeData.data.columnsFrom)
      }
      if (typeof nodeData.data.valuesFrom === "string") {
        setValuesFrom(nodeData.data.valuesFrom)
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
        typeof columnsFrom === "string" &&
        typeof valuesFrom === "string"
      ) {
        try {
          setLoader(true)

          const clonedTable = await table.cloneTable({
            outputTable: id,
          })
          await clonedTable.wider(columnsFrom, valuesFrom)

          const originalTableName =
            source?.data?.originalTableName ?? table.name
          const code = `const ${originalTableName} = await ${originalTableName}.longer("${columnsFrom}", "${valuesFrom}");`
          setCode(code)
          updateNodeData(id, {
            instance: clonedTable,
            originalTableName,
            code,
            columnsFrom,
            valuesFrom,
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
  }, [source, id, updateNodeData, columnsFrom, valuesFrom, columns])

  return (
    <div>
      <Target targetReady={targetReady} />
      <Card className="min-w-60 max-w-md">
        <Code code={code} />
        <CardHeader>
          <CardTitleWithLoader loader={loader}>Wider</CardTitleWithLoader>
          <CardDescription>
            Restructures a table by unstacking values.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OptionsSelect
            label="Column names from"
            placeholder="Pick a column"
            items={columns}
            value={columnsFrom ?? ""}
            onChange={(e) => setColumnsFrom(e)}
          />
          <OptionsSelect
            label="Values from"
            placeholder="Pick a column"
            items={columns}
            value={valuesFrom ?? ""}
            onChange={(e) => setValuesFrom(e)}
          />
          <Error error={error} />
        </CardContent>
      </Card>
      <Source sourceReady={sourceReady} />
    </div>
  )
}
