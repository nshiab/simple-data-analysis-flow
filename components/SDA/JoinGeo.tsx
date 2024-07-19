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
import OptionsSelect from "../partials/OptionsSelect"
import CardTitleWithLoader from "../partials/CardTitleWithLoader"
import Error from "../partials/Error"
import Target from "../partials/Target"
import Source from "../partials/Source"
import Options from "../partials/Options"
import OptionsInputNumber from "../partials/OptionsInputNumber"
import OptionsInputText from "../partials/OptionsInputText"

export default function JoinGeo({ id }: { id: string }) {
  const [name, setName] = useState<string>(`${id}JoinGeo`)
  const [columnsLeft, setColumnsLeft] = useState<
    { value: string; label: string }[]
  >([])
  const [columnsRight, setColumnsRight] = useState<
    { value: string; label: string }[]
  >([])
  const [geoLeft, setGeoLeft] = useState<string | undefined>(undefined)
  const [geoRight, setGeoRight] = useState<string | undefined>(undefined)
  const [method, setMethod] = useState<string | undefined>(undefined)
  const [distance, setDistance] = useState<number | undefined>(undefined)
  const [distanceMethod, setDistanceMethod] = useState<string | undefined>(
    undefined
  )
  const [joinType, setJoinType] = useState<string | undefined>(undefined)

  const { updateNodeData } = useReactFlow()

  const targetLeft = useHandleConnections({ type: "target", id: "left" })
  const sourceLeft = useNodesData(targetLeft[0]?.source)

  useEffect(() => {
    async function run() {
      const tableLeft = sourceLeft?.data?.instance
      if (tableLeft instanceof SimpleWebTable) {
        setColumnsLeft(
          (await tableLeft.getColumns()).map((d) => ({ value: d, label: d }))
        )
      }
    }
    run()
  }, [sourceLeft])

  const targetRight = useHandleConnections({ type: "target", id: "right" })
  const sourceRight = useNodesData(targetRight[0]?.source)

  useEffect(() => {
    async function run() {
      const tableRight = sourceRight?.data?.instance
      if (tableRight instanceof SimpleWebTable) {
        setColumnsRight(
          (await tableRight.getColumns()).map((d) => ({ value: d, label: d }))
        )
      }
    }
    run()
  }, [sourceRight])

  const [code, setCode] = useState("")
  const [loader, setLoader] = useState(false)
  const [sourceReady, setSourceReady] = useState(false)
  const [targetLeftReady, setTargetLeftReady] = useState(false)
  const [targetRightReady, setTargetRightReady] = useState(false)
  const [error, setError] = useState<null | string>(null)

  const nodeData = useNodesData(id)
  useEffect(() => {
    if (nodeData?.data.imported) {
      if (typeof nodeData.data.method === "string") {
        //@ts-ignore okay
        setMethod(nodeData.data.method)
      }
      if (typeof nodeData.data.outputTable === "string") {
        setName(nodeData.data.outputTable)
      }
      if (typeof nodeData.data.geoLeft === "string") {
        setGeoLeft(nodeData.data.geoLeft)
      }
      if (typeof nodeData.data.geoRight === "string") {
        setGeoRight(nodeData.data.geoRight)
      }
      if (typeof nodeData.data.distance === "number") {
        setDistance(nodeData.data.distance)
      }
      if (typeof nodeData.data.distanceMethod === "string") {
        setDistanceMethod(nodeData.data.distanceMethod)
      }
      if (typeof nodeData.data.joinType === "string") {
        setJoinType(nodeData.data.joinType)
      }
      if (Array.isArray(nodeData.data.columnsLeft)) {
        setColumnsLeft(nodeData.data.columnsLeft)
      }
      if (Array.isArray(nodeData.data.columnsRight)) {
        setColumnsRight(nodeData.data.columnsRight)
      }
      nodeData.data.imported = false
    }
  }, [nodeData])

  useEffect(() => {
    async function run() {
      const tableLeft = sourceLeft?.data?.instance
      const tableRight = sourceRight?.data?.instance
      if (tableLeft instanceof SimpleWebTable) {
        setTargetLeftReady(true)
      }
      if (tableRight instanceof SimpleWebTable) {
        setTargetRightReady(true)
      }
      if (
        tableLeft instanceof SimpleWebTable &&
        tableRight instanceof SimpleWebTable &&
        typeof geoLeft === "string" &&
        typeof geoRight === "string" &&
        (await tableLeft.hasColumn(geoLeft)) &&
        (await tableRight.hasColumn(geoRight)) &&
        typeof method === "string"
      ) {
        try {
          setLoader(true)

          const originalTableLeftName =
            sourceLeft?.data?.originalTableName ?? tableLeft.name
          const originalTableRightName =
            sourceRight?.data?.originalTableName ?? tableRight.name
          const code = `const ${name} = await ${originalTableLeftName}.joinGeo(${originalTableRightName}, "${method}", {
  leftTableColumn: "${geoLeft}",
  rightTableColumn: "${geoRight}",
  distance: ${distance},
  distanceMethod: ${
    typeof distanceMethod === "string" ? `"${distanceMethod}"` : "undefined"
  },
  type: "${joinType ?? "left"}",
  outputTable: "${name}",
})`
          setCode(code)

          const outputTable = await tableLeft.joinGeo(
            tableRight,
            method as "intersect" | "inside" | "within",
            {
              leftTableColumn: geoLeft,
              rightTableColumn: geoRight,
              distance,
              distanceMethod: distanceMethod as
                | "srs"
                | "haversine"
                | "spheroid"
                | undefined,
              type: joinType as "inner" | "left" | "right" | "full" | undefined,
              outputTable: name,
            }
          )

          updateNodeData(id, {
            instance: outputTable,
            originalTableName: name,
            code,
            method,
            outputTable: name,
            geoLeft,
            geoRight,
            distance,
            distanceMethod,
            joinType,
            columnsLeft,
            columnsRight,
          })
          setError(null)
          setLoader(false)
          setSourceReady(true)
        } catch (err) {
          console.error(err)
          //@ts-expect-error okay
          setError(err.message)
          setLoader(false)
          setSourceReady(true)
        }
      }
    }

    run()
  }, [
    sourceLeft,
    sourceRight,
    id,
    updateNodeData,
    geoLeft,
    geoRight,
    method,
    distance,
    distanceMethod,
    joinType,
    name,
    columnsLeft,
    columnsRight,
  ])

  return (
    <div>
      <div className="flex justify-evenly -translate-x-[42%]">
        <Target targetReady={targetLeftReady} id="left" />
        <Target targetReady={targetRightReady} id="right" />
      </div>
      <Card>
        <Code code={code} />
        <CardHeader>
          <CardTitleWithLoader loader={loader}>Join geo</CardTitleWithLoader>
          <CardDescription>
            Joins two tables based on geometries.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OptionsInputText
            label="Table name"
            value={name}
            onClick={(e: string) => setName(e)}
          />
          <OptionsSelect
            label="Left geometries"
            placeholder="Pick a column"
            items={columnsLeft}
            onChange={(e) => setGeoLeft(e)}
            value={geoLeft ?? ""}
          />
          <OptionsSelect
            label="Right geometries"
            placeholder="Pick a column"
            items={columnsRight}
            onChange={(e) => setGeoRight(e)}
            value={geoRight ?? ""}
          />
          <OptionsSelect
            label="Method:"
            placeholder="Pick a method"
            value={method ?? ""}
            items={[
              { value: "intersect", label: "Intersect" },
              { value: "inside", label: "Inside" },
              { value: "within", label: "Within" },
            ]}
            onChange={(e) => setMethod(e)}
          />
          <Error error={error} />
          <Options>
            <OptionsInputNumber
              label={"Distance (for method Within):"}
              value={distance ?? 0}
              set={setDistance}
            />
            <OptionsSelect
              label="Distance method (if Haversine or Spheroid, the distance unit is meter):"
              value={distanceMethod ?? ""}
              items={[
                { value: "SRS", label: "SRS" },
                { value: "haversine", label: "Haversine" },
                { value: "spheroid", label: "Spheroid" },
              ]}
              onChange={(e) => setDistanceMethod(e)}
            />
            <OptionsSelect
              label="Join type"
              value={joinType ?? ""}
              items={[
                { value: "left", label: "Left" },
                { value: "inner", label: "Inner" },
                { value: "full", label: "Full" },
                { value: "right", label: "right" },
              ]}
              onChange={(e) => setJoinType(e)}
            />
          </Options>
        </CardContent>
      </Card>
      <Source sourceReady={sourceReady} />
    </div>
  )
}
