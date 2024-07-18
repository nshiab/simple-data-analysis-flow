import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import { useHandleConnections, useNodesData } from "@xyflow/react"
import { useEffect, useState } from "react"
import SimpleWebTable from "../../node_modules/simple-data-analysis/dist/class/SimpleWebTable"

import DataTable from "../partials/DataTable"
import Code from "../partials/Code"
import CardTitleWithLoader from "../partials/CardTitleWithLoader"
import Target from "../partials/Target"

export default function Describe({ id }: { id: string }) {
  const [name, setName] = useState<string | undefined>(undefined)
  const [data, setData] = useState<
    { [key: string]: string | number | boolean | Date | null }[] | null
  >(null)
  const [columns, setColumns] = useState<string[] | null>(null)

  const targetConnection = useHandleConnections({ type: "target" })
  const source = useNodesData(targetConnection[0]?.source)

  const [targetRead, setTargetReady] = useState(false)
  const [code, setCode] = useState("")
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    async function run() {
      const table = source?.data?.instance
      if (table instanceof SimpleWebTable) {
        setTargetReady(true)
        setLoader(true)

        const description = (await table.getDescription()) as {
          [key: string]: string | number | boolean | Date | null
        }[]
        setData(description)
        const columns = Object.keys(description[0])
        setColumns(columns)

        const originalTableName = source?.data?.originalTableName ?? table.name
        setName(originalTableName as string)
        const code = `await ${originalTableName}.logDescription()`
        setCode(code)
        setLoader(false)
      } else {
        setData(null)
        setColumns(null)
      }
    }

    run()
  }, [source, id])

  return (
    <div>
      <Target targetReady={targetRead} />
      <Card>
        <Code code={code} />
        <CardHeader>
          <CardTitleWithLoader loader={loader}>
            Describe{typeof name === "string" ? ` ${name}` : ""}
          </CardTitleWithLoader>
          <CardDescription>
            Returns details like data types, number of null and distinct values.
          </CardDescription>
        </CardHeader>
        {Array.isArray(data) && Array.isArray(columns) && (
          <CardContent>
            <DataTable data={data} columns={columns} />
          </CardContent>
        )}
      </Card>
    </div>
  )
}
