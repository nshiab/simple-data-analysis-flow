import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import { useHandleConnections, useNodesData, useReactFlow } from "@xyflow/react"
import { useEffect, useState } from "react"
import SimpleWebDB from "../../node_modules/simple-data-analysis/dist/class/SimpleWebDB"
import Code from "../partials/Code"
import Target from "../partials/Target"
import Source from "../partials/Source"
import OptionsInputText from "../partials/OptionsInputText"
import CardTitleWithLoader from "../partials/CardTitleWithLoader"

export default function ST({ id }: { id: string }) {
  const { updateNodeData } = useReactFlow()
  const [targetReady, setTargetReady] = useState(false)
  const [sourceReady, setSourceReady] = useState(false)
  const [loader, setLoader] = useState(false)

  const targetConnection = useHandleConnections({ type: "target" })

  const [name, setName] = useState<string>(`${id}`)
  const [code, setCode] = useState("")

  const source = useNodesData(targetConnection[0]?.source)

  const nodeData = useNodesData(id)
  useEffect(() => {
    if (nodeData?.data.imported) {
      if (typeof nodeData.data.name === "string") {
        setName(nodeData.data.name)
      }
      nodeData.data.imported = false
    }
  }, [nodeData])

  useEffect(() => {
    const sdb = source?.data?.instance
    if (sdb instanceof SimpleWebDB) {
      setTargetReady(true)
      setLoader(true)
      const code = `const ${name} = sdb.newTable("${name}");`
      setCode(code)
      updateNodeData(id, {
        name,
        instance: sdb.newTable(name),
        code: code,
      })
      setLoader(false)
      setSourceReady(true)
    }
  }, [source, id, updateNodeData, name])

  return (
    <div>
      <Target targetReady={targetReady} />
      <Card>
        <Code code={code} />
        <CardHeader>
          <CardTitleWithLoader loader={loader}>SimpleTable</CardTitleWithLoader>
          <CardDescription>This is a table in the database.</CardDescription>
        </CardHeader>
        <CardContent>
          <OptionsInputText
            label="Name"
            value={name}
            onClick={(e: string) => setName(e)}
          />
        </CardContent>
      </Card>
      <Source sourceReady={sourceReady} />
    </div>
  )
}
