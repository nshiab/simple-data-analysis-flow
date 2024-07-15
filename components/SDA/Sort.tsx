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
import OptionsInputText from "../partials/OptionsInputText"
import OptionsSelect from "../partials/OptionsSelect"

export default function Sort({ id }: { id: string }) {
  const [columnToSort, setColumnToSort] = useState<string | undefined>(
    undefined
  )
  const [order, setOrder] = useState<"asc" | "desc">("asc")
  const [columns, setColumns] = useState<{ value: string; label: string }[]>([])

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
          (await table.getColumns()).map((d) => ({ value: d, label: d }))
        )
      }
    }
    run()
  }, [source])

  const [code, setCode] = useState("")
  const [loader, setLoader] = useState(false)
  const [error, setError] = useState<null | string>(null)

  useEffect(() => {
    async function run() {
      const table = source?.data?.instance
      if (table instanceof SimpleWebTable) {
        setTargetReady(true)
      }
      if (table instanceof SimpleWebTable && typeof columnToSort === "string") {
        try {
          setLoader(true)
          const clonedTable = await table.cloneTable({
            outputTable: id,
          })
          const toSort: { [key: string]: "asc" | "desc" } = {}
          toSort[columnToSort] = order
          await clonedTable.sort(toSort)

          const originalTableName =
            source?.data?.originalTableName ?? table.name
          const code = `await ${originalTableName}.sort(${JSON.stringify(
            toSort
          )});`
          setCode(code)
          updateNodeData(id, {
            instance: clonedTable,
            originalTableName: originalTableName,
            code,
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
  }, [source, id, updateNodeData, columnToSort, order])

  return (
    <div>
      <Target targetReady={targetReady} />
      <Card>
        <Code code={code} />
        <CardHeader>
          <CardTitleWithLoader loader={loader}>Sort</CardTitleWithLoader>
          <CardDescription>
            Sort values in ascending or descending order.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OptionsSelect
            label="Column"
            placeholder="Pick a column"
            onChange={(e) => setColumnToSort(e)}
            items={columns}
          />
          <OptionsSelect
            label="Order"
            placeholder="Ascending"
            onChange={(e) => setOrder(e)}
            items={[
              { value: "asc", label: "Ascending" },
              { value: "desc", label: "Descending" },
            ]}
          />
          <Error error={error} />
        </CardContent>
      </Card>
      <Source sourceReady={sourceReady} />
    </div>
  )
}
