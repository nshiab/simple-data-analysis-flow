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
import OptionsSelect from "../partials/OptionsSelect"
import OptionsInputText from "../partials/OptionsInputText"
import CardTitleWithLoader from "../partials/CardTitleWithLoader"
import Error from "../partials/Error"
import Target from "../partials/Target"
import Source from "../partials/Source"

export default function Points({ id }: { id: string }) {
  const [lat, setLat] = useState<string | undefined>(undefined)
  const [lon, setLon] = useState<string | undefined>(undefined)
  const [newColumn, setNewColumn] = useState<string>("geom")
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

  const nodeData = useNodesData(id)
  useEffect(() => {
    if (nodeData?.data.imported) {
      if (nodeData.data.columns && typeof nodeData.data.columns === "object") {
        //@ts-expect-error okay
        setColumns(nodeData.data.columns)
      }
      if (typeof nodeData.data.lat === "string") {
        setLat(nodeData.data.lat)
      }
      if (typeof nodeData.data.lon === "string") {
        setLon(nodeData.data.lon)
      }
      if (typeof nodeData.data.newColumn === "string") {
        setNewColumn(nodeData.data.newColumn)
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
        typeof lat === "string" &&
        typeof lon === "string" &&
        typeof newColumn === "string"
      ) {
        try {
          setLoader(true)
          const clonedTable = await table.cloneTable({
            outputTable: id,
          })
          await clonedTable.points(lat, lon, newColumn)

          const originalTableName =
            source?.data?.originalTableName ?? table.name
          const code = `await ${originalTableName}.points("${lat}", "${lon}", "${newColumn}");`
          setCode(code)
          updateNodeData(id, {
            instance: clonedTable,
            originalTableName,
            code,
            lat,
            lon,
            newColumn,
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
  }, [source, id, updateNodeData, lat, lon, columns, newColumn])

  return (
    <div>
      <Target targetReady={targetReady} />
      <Card>
        <Code code={code} />
        <CardHeader>
          <CardTitleWithLoader loader={loader}>Points</CardTitleWithLoader>
          <CardDescription>
            Creates point geometries from longitude and latitude columns.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OptionsSelect
            label="Latitude"
            placeholder="Pick a column"
            items={columns}
            onChange={(e) => setLat(e)}
            value={lat ?? ""}
          />
          <OptionsSelect
            label="Longitude"
            placeholder="Pick a column"
            items={columns}
            onChange={(e) => setLon(e)}
            value={lon ?? ""}
          />
          <OptionsInputText
            label="New column"
            value={newColumn}
            onClick={(e: string) => setNewColumn(e)}
          />
          <Error error={error} />
        </CardContent>
      </Card>
      <Source sourceReady={sourceReady} />
    </div>
  )
}
