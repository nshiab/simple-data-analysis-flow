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
import OptionsTextArea from "../partials/OptionsTextArea"

export default function AddColumn({ id }: { id: string }) {
  const [newColumn, setNewColumn] = useState<string | undefined>()
  const [dataType, setDataType] = useState<
    "string" | "number" | "boolean" | "date" | "geometry" | undefined
  >()
  const [definition, setDefinition] = useState<string | undefined>()

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
      if (
        table instanceof SimpleWebTable &&
        typeof newColumn === "string" &&
        typeof dataType === "string" &&
        typeof definition === "string"
      ) {
        try {
          setLoader(true)
          const clonedTable = await table.cloneTable({
            outputTable: id,
          })
          await clonedTable.addColumn(newColumn, dataType, definition)

          const originalTableName =
            source?.data?.originalTableName ?? table.name
          const code = `await ${originalTableName}.addColumn("${newColumn}", "${dataType}", \`${definition}\`);`
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
  }, [source, id, updateNodeData, newColumn, dataType, definition])

  return (
    <div>
      <Target targetReady={targetReady} />
      <Card>
        <Code code={code} />
        <CardHeader>
          <CardTitleWithLoader loader={loader}>Add column</CardTitleWithLoader>
          <CardDescription>
            Adds a column into the table. The definition is in SQL.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OptionsInputText
            label="New column"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNewColumn(e.target.value)
            }
          />
          <OptionsSelect
            label="Data type"
            placeholder="Pick a type"
            items={[
              { value: "string", label: "Text" },
              { value: "number", label: "Number" },
              { value: "boolean", label: "Boolean" },
              { value: "date", label: "Date" },
              { value: "geometry", label: "Geometry" },
            ]}
            onChange={(e) => setDataType(e)}
          />
          <OptionsTextArea label="Definition" set={setDefinition} />
          <Error error={error} />
        </CardContent>
      </Card>
      <Source sourceReady={sourceReady} />
    </div>
  )
}
