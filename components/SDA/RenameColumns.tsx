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
import OptionsMultipleInputText from "../partials/OptionsMultipleInputText"

export default function RenameColumns({ id }: { id: string }) {
  const [columnsToRename, setColumnsToRename] = useState<{
    [key: string]: string
  }>({})
  const [columns, setColumns] = useState<
    { label: string; defaultValue: string }[]
  >([])

  const { updateNodeData } = useReactFlow()

  const target = useHandleConnections({ type: "target" })
  const source = useNodesData(target[0]?.source)
  const [targetReady, setTargetReady] = useState(false)
  const [sourceReady, setSourceReady] = useState(false)

  useEffect(() => {
    async function run() {
      const table = source?.data?.instance
      if (table instanceof SimpleWebTable) {
        setColumns(
          (await table.getColumns()).map((d) => ({ label: d, defaultValue: d }))
        )
      }
    }
    run()
  }, [source])

  const [code, setCode] = useState("")
  const [loader, setLoader] = useState(false)
  const [error, setError] = useState<null | string>(null)

  const nodeData = useNodesData(id)
  useEffect(() => {
    if (nodeData?.data.imported) {
      if (typeof nodeData.data.columnsToRename === "object") {
        //@ts-expect-error okay
        setColumnsToRename(nodeData.data.columnsToRename)
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
      if (table instanceof SimpleWebTable) {
        try {
          setLoader(true)
          const clonedTable = await table.cloneTable({
            outputTable: id,
          })
          await clonedTable.renameColumns(columnsToRename)

          const originalTableName =
            source?.data?.originalTableName ?? table.name
          const code = `await ${originalTableName}.renameColumns(${JSON.stringify(
            columnsToRename
          )});`
          setCode(code)
          updateNodeData(id, {
            instance: clonedTable,
            originalTableName: originalTableName,
            code,
            columnsToRename,
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
  }, [source, id, updateNodeData, columnsToRename, columns])

  return (
    <div>
      <Target targetReady={targetReady} />
      <Card>
        <Code code={code} />
        <CardHeader>
          <CardTitleWithLoader loader={loader}>
            Rename columns
          </CardTitleWithLoader>
          <CardDescription>
            Avoid spaces and special characters.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OptionsMultipleInputText
            items={columns}
            values={columnsToRename}
            setValues={setColumnsToRename}
          />
          <Error error={error} />
        </CardContent>
      </Card>
      <Source sourceReady={sourceReady} />
    </div>
  )
}
