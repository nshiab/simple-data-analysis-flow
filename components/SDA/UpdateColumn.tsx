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
import OptionsTextArea from "../partials/OptionsTextArea"
import OptionsSelect from "../partials/OptionsSelect"

export default function UpdateColumn({ id }: { id: string }) {
  const [column, setColumn] = useState<string | undefined>(undefined)
  const [columns, setColumns] = useState<{ value: string; label: string }[]>([])
  const [definition, setDefinition] = useState<string | undefined>(undefined)

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

  const [targetReady, setTargetReady] = useState(false)
  const [sourceReady, setSourceReady] = useState(false)

  const [code, setCode] = useState("")
  const [loader, setLoader] = useState(false)
  const [error, setError] = useState<null | string>(null)

  const nodeData = useNodesData(id)
  useEffect(() => {
    if (nodeData?.data.imported) {
      if (typeof nodeData.data.column === "string") {
        setColumn(nodeData.data.column)
      }
      if (Array.isArray(nodeData.data.columns)) {
        setColumns(nodeData.data.columns)
      }
      if (typeof nodeData.data.definition === "string") {
        setDefinition(nodeData.data.definition)
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
        typeof definition === "string"
      ) {
        try {
          setLoader(true)
          const clonedTable = await table.cloneTable({
            outputTable: id,
          })
          await clonedTable.updateColumn(column, definition)

          const originalTableName =
            source?.data?.originalTableName ?? table.name
          const code = `await ${originalTableName}.updateColumn("${column}", \`${definition}\`);`
          setCode(code)
          updateNodeData(id, {
            instance: clonedTable,
            originalTableName: originalTableName,
            code,
            column,
            definition,
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
  }, [source, id, updateNodeData, definition, column, columns])

  return (
    <div>
      <Target targetReady={targetReady} />
      <Card>
        <Code code={code} />
        <CardHeader>
          <CardTitleWithLoader loader={loader}>
            Update column
          </CardTitleWithLoader>
          <CardDescription>
            Update the values in a column. The definition is in SQL.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OptionsSelect
            label="Column"
            placeholder="Pick a column"
            items={columns}
            value={column ?? ""}
            onChange={(e) => setColumn(e)}
          />
          <OptionsTextArea
            label="Definition"
            set={setDefinition}
            value={definition ?? ""}
          />
          <Error error={error} />
        </CardContent>
      </Card>
      <Source sourceReady={sourceReady} />
    </div>
  )
}
