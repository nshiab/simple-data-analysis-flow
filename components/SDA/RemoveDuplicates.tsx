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

export default function RemoveDuplicates({ id }: { id: string }) {
  const { updateNodeData } = useReactFlow()

  const target = useHandleConnections({ type: "target" })
  const source = useNodesData(target[0]?.source)
  const [targetReady, setTargetReady] = useState(false)
  const [sourceReady, setSourceReady] = useState(false)

  const [code, setCode] = useState("")
  const [loader, setLoader] = useState(false)
  const [error, setError] = useState<null | string>(null)

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
          await clonedTable.removeDuplicates()

          const originalTableName =
            source?.data?.originalTableName ?? table.name
          const code = `await ${originalTableName}.removeDuplicates();`
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
  }, [source, id, updateNodeData])

  return (
    <div>
      <Target targetReady={targetReady} />
      <Card className="max-w-80">
        <Code code={code} />
        <CardHeader>
          <CardTitleWithLoader loader={loader}>
            Remove duplicates
          </CardTitleWithLoader>
          <CardDescription>
            Removes duplicate rows from this table, keeping unique rows. The
            data might be returned in a different order than the original.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Error error={error} />
        </CardContent>
      </Card>
      <Source sourceReady={sourceReady} />
    </div>
  )
}
