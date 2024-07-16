import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import { useHandleConnections, useNodesData, useReactFlow } from "@xyflow/react"
import { useEffect, useRef, useState } from "react"
import SimpleWebTable from "../../node_modules/simple-data-analysis/dist/class/SimpleWebTable"
import { Input } from "../ui/input"

import Code from "../partials/Code"
import CardTitleWithLoader from "../partials/CardTitleWithLoader"
import Error from "../partials/Error"
import Target from "../partials/Target"
import Source from "../partials/Source"
import { AsyncDuckDB, DuckDBDataProtocol } from "@duckdb/duckdb-wasm"

export default function LoadGeoFile({ id }: { id: string }) {
  const refUrl = useRef<HTMLInputElement | null>(null)

  const [file, setFile] = useState<null | File>(null)

  const { updateNodeData } = useReactFlow()

  const target = useHandleConnections({ type: "target" })
  const source = useNodesData(target[0]?.source)

  const [code, setCode] = useState("")
  const [loader, setLoader] = useState(false)
  const [targetReady, setTargetReady] = useState(false)
  const [sourceReady, setSourceReady] = useState(false)
  const [error, setError] = useState<null | string>(null)

  useEffect(() => {
    async function run() {
      const table = source?.data?.instance
      if (table instanceof SimpleWebTable) {
        setTargetReady(true)
      }
      if (table instanceof SimpleWebTable && file instanceof File) {
        try {
          setLoader(true)
          const db = table.db as AsyncDuckDB

          await db.registerFileHandle(
            file.name,
            file,
            DuckDBDataProtocol.BROWSER_FILEREADER,
            true
          )
          await table.sdb.customQuery(
            `INSTALL spatial; LOAD spatial;
            INSTALL https; LOAD https;
            CREATE OR REPLACE TABLE ${table.name} AS SELECT * FROM ST_Read('${file.name}');`
          )

          const code = `// More options available. Check documentation.
await ${table.name}.loadGeoData("${file.name}");`
          setCode(code)
          updateNodeData(id, {
            instance: table,
            code,
          })
          setError(null)
          setLoader(false)
          setSourceReady(true)
        } catch (err) {
          console.error(err)
          // @ts-expect-error okay
          setError(err.message)
          setLoader(false)
          setSourceReady(true)
        }
      }
    }

    run()
  }, [source, id, updateNodeData, file])

  return (
    <div>
      <Target targetReady={targetReady} />
      <Card>
        <Code code={code} />
        <CardHeader>
          <CardTitleWithLoader loader={loader}>
            Load geo file
          </CardTitleWithLoader>
          <CardDescription>
            Loads spatial data from a local file.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 my-4">
            <Input
              ref={refUrl}
              type="file"
              onChange={(e) => {
                const files = e.target.files
                if (files) {
                  setFile(files[0])
                }
              }}
            />
          </div>
          <Error error={error} />
        </CardContent>
      </Card>
      <Source sourceReady={sourceReady} />
    </div>
  )
}
