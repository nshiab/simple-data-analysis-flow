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
import CardTitleWithLoader from "../partials/CardTitleWithLoader"
import Error from "../partials/Error"
import Target from "../partials/Target"
import Source from "../partials/Source"
import Options from "../partials/Options"
import OptionsInputText from "../partials/OptionsInputText"

export default function Join({ id }: { id: string }) {
  const [name, setName] = useState<string>(`${id}Join`)
  const [commonColumns, setCommonColumns] = useState<
    { value: string; label: string }[]
  >([])
  const [commonColumn, setCommonColumn] = useState<string | undefined>(
    undefined
  )
  const [joinType, setJoinType] = useState<
    "inner" | "left" | "right" | "full" | undefined
  >(undefined)

  const { updateNodeData } = useReactFlow()

  const targetLeft = useHandleConnections({ type: "target", id: "left" })
  const sourceLeft = useNodesData(targetLeft[0]?.source)
  const targetRight = useHandleConnections({ type: "target", id: "right" })
  const sourceRight = useNodesData(targetRight[0]?.source)

  useEffect(() => {
    async function run() {
      const tableLeft = sourceLeft?.data?.instance
      const tableRight = sourceRight?.data?.instance
      if (
        tableLeft instanceof SimpleWebTable &&
        tableRight instanceof SimpleWebTable
      ) {
        const leftColumns = await tableLeft.getColumns()
        const rightColumns = await tableRight.getColumns()
        const commonCols = []
        for (const leftCol of leftColumns) {
          const commonCol = rightColumns.find((d) => d === leftCol)
          if (commonCol) {
            commonCols.push(commonCol)
          }
        }
        setCommonColumns(commonCols.map((d) => ({ value: d, label: d })))
      }
    }
    run()
  }, [sourceLeft, sourceRight])

  const [code, setCode] = useState("")
  const [loader, setLoader] = useState(false)
  const [sourceReady, setSourceReady] = useState(false)
  const [targetLeftReady, setTargetLeftReady] = useState(false)
  const [targetRightReady, setTargetRightReady] = useState(false)
  const [error, setError] = useState<null | string>(null)

  const nodeData = useNodesData(id)
  useEffect(() => {
    if (nodeData?.data.imported) {
      if (typeof nodeData.data.commonColumn === "string") {
        setCommonColumn(nodeData.data.commonColumn)
      }
      if (typeof nodeData.data.joinType === "string") {
        // @ts-ignore okay
        setJoinType(nodeData.data.joinType)
      }
      if (typeof nodeData.data.outputTable === "string") {
        setName(nodeData.data.outputTable)
      }
      nodeData.data.imported = false
    }
  }, [nodeData])

  useEffect(() => {
    async function run() {
      if (commonColumns.length === 1) {
        setCommonColumn(commonColumns[0].value)
      }
    }
    run()
  }, [commonColumns])

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
        typeof commonColumn === "string"
      ) {
        try {
          setLoader(true)
          const outputTable = await tableLeft.join(tableRight, {
            commonColumn,
            type: joinType,
            outputTable: name,
          })

          const originalTableLeftName =
            sourceLeft?.data?.originalTableName ?? tableLeft.name
          const originalTableRightName =
            sourceRight?.data?.originalTableName ?? tableRight.name
          const code = `const ${name} = await ${originalTableLeftName}.join(${originalTableRightName}, {
  commonColumn: "${commonColumn}",
  type: "${joinType ?? "left"}",
  outputTable: "${name}",
})`
          setCode(code)
          updateNodeData(id, {
            instance: outputTable,
            originalTableName: name,
            code,
            commonColumn,
            joinType,
            outputTable: name,
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
    commonColumn,
    joinType,
    name,
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
          <CardTitleWithLoader loader={loader}>Join</CardTitleWithLoader>
          <CardDescription>
            Joins two tables based on a common column.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OptionsInputText
            label="Table name"
            value={name}
            onClick={(e: string) => setName(e)}
          />
          <OptionsSelect
            label="Common column"
            placeholder="Pick a column"
            items={commonColumns}
            onChange={(e) => setCommonColumn(e)}
            value={commonColumn ?? ""}
          />
          <Error error={error} />
          <Options>
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
