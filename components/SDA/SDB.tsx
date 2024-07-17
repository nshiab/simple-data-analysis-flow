import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useReactFlow } from "@xyflow/react"
import SimpleWebDB from "../../node_modules/simple-data-analysis/dist/class/SimpleWebDB"
import { useEffect, useState } from "react"
import Code from "../partials/Code"
import Source from "../partials/Source"
import CardTitleWithLoader from "../partials/CardTitleWithLoader"

export default function SDB({ id }: { id: string }) {
  const { updateNodeData } = useReactFlow()
  const [code, setCode] = useState("")
  const [sourceReady, setSourceReady] = useState(false)
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    async function start() {
      setLoader(true)
      const sdb = await new SimpleWebDB().start()
      await sdb.customQuery(`ATTACH DATABASE '${id}' as mydb;
use mydb;`)
      const code = `// For front-end projects, switch to SimpleWebDB
import { SimpleDB } from "simple-data-analysis";

const sdb = new SimpleDB();`
      setCode(code)
      updateNodeData(id, { instance: sdb, code })
      setLoader(false)
      setSourceReady(true)
    }
    start()
  }, [id, updateNodeData])

  return (
    <div>
      <Card>
        <Code code={code} />
        <CardHeader>
          <CardTitleWithLoader loader={loader}>SimpleDB</CardTitleWithLoader>
          <CardDescription>This is your in-memory database.</CardDescription>
        </CardHeader>
      </Card>
      <Source sourceReady={sourceReady} />
    </div>
  )
}
