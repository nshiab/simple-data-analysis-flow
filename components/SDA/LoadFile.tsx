import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import { useHandleConnections, useNodesData, useReactFlow } from "@xyflow/react"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import SimpleWebTable from "../../node_modules/simple-data-analysis/dist/class/SimpleWebTable"
import { Input } from "../ui/input"
import Options from "../partials/Options"
import OptionsCheckbox from "../partials/OptionsCheckbox"
import OptionsSelect from "../partials/OptionsSelect"
import OptionsInputText from "../partials/OptionsInputText"
import OptionsInputNumber from "../partials/OptionsInputNumber"
import Code from "../partials/Code"
import CardTitleWithLoader from "../partials/CardTitleWithLoader"
import Error from "../partials/Error"
import Target from "../partials/Target"
import Source from "../partials/Source"
import {
  AsyncDuckDB,
  AsyncDuckDBConnection,
  DuckDBDataProtocol,
} from "@duckdb/duckdb-wasm"

export default function LoadFile({ id }: { id: string }) {
  const refUrl = useRef<HTMLInputElement | null>(null)

  const [file, setFile] = useState<null | File>(null)
  const [autoDetect, setAutoDetect] = useState(true)
  const [fileType, setFileType] = useState<
    "csv" | "dsv" | "json" | "parquet" | undefined
  >(undefined)
  const [header, setHeader] = useState(true)
  const [delim, setDelim] = useState<string | undefined>(undefined)
  const [skip, setSkip] = useState<number | undefined>(0)

  const { updateNodeData } = useReactFlow()

  const target = useHandleConnections({ type: "target" })
  const source = useNodesData(target[0]?.source)

  const [code, setCode] = useState("")
  const [loader, setLoader] = useState(false)
  const [targetReady, setTargetReady] = useState(false)
  const [sourceReady, setSourceReady] = useState(false)
  const [error, setError] = useState<null | string>(null)

  const nodeData = useNodesData(id)
  useEffect(() => {
    if (nodeData?.data.imported) {
      if (typeof nodeData.data.fileType === "string") {
        //@ts-expect-error okay
        setFileType(nodeData.data.fileType)
      }
      if (typeof nodeData.data.autoDetect === "boolean") {
        setAutoDetect(nodeData.data.autoDetect)
      }
      if (typeof nodeData.data.header === "boolean") {
        setHeader(nodeData.data.header)
      }
      if (typeof nodeData.data.delim === "string") {
        setDelim(nodeData.data.delim)
      }
      if (typeof nodeData.data.skip === "number") {
        setSkip(nodeData.data.skip)
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
      if (table instanceof SimpleWebTable && file instanceof File) {
        try {
          setLoader(true)
          const db = table.db as AsyncDuckDB
          const c = table.connection as AsyncDuckDBConnection

          const fileExtension = file.name.split(".").at(-1)

          if (
            fileType === "csv" ||
            fileExtension === "csv" ||
            fileType === "dsv" ||
            typeof delim === "string"
          ) {
            await db.registerFileHandle(
              file.name,
              file,
              DuckDBDataProtocol.BROWSER_FILEREADER,
              true
            )
            await c.insertCSVFromPath(file.name, {
              name: table.name,
              detect: autoDetect ?? true,
              header: header ?? true,
              delimiter: delim ?? ",",
              skip: skip,
            })
          } else if (fileType === "json" || fileExtension === "json") {
            await db.registerFileText(file.name, await file.text())
            await c.insertJSONFromPath(file.name, { name: table.name })
          } else if (fileType === "parquet" || fileExtension === "parquet") {
            await db.registerFileHandle(
              file.name,
              file,
              DuckDBDataProtocol.BROWSER_FILEREADER,
              true
            )
            await c.query(
              `CREATE OR REPLACE TABLE ${table.name} AS SELECT * FROM parquet_scan('${file.name}')`
            )
          }

          const code = `// More options available. Check documentation.
await ${table.name}.loadData("${file.name}", {
  fileType: ${typeof fileType === "string" ? `"${fileType}"` : "undefined"},
  autoDetect: ${autoDetect},
  header: ${header},
  delim: ${typeof delim === "string" ? `"${delim}"` : "undefined"},
  skip: ${skip},
});`
          setCode(code)
          updateNodeData(id, {
            instance: table,
            code,
            fileType,
            autoDetect,
            header,
            delim,
            skip,
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
  }, [
    source,
    id,
    updateNodeData,
    file,
    fileType,
    autoDetect,
    header,
    delim,
    skip,
  ])

  return (
    <div>
      <Target targetReady={targetReady} />
      <Card>
        <Code code={code} />
        <CardHeader>
          <CardTitleWithLoader loader={loader}>Load file</CardTitleWithLoader>
          <CardDescription>
            Loads data from a local CSV, JSON or Parquet file.
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
          <Options>
            <OptionsCheckbox
              label="Auto-detect"
              checked={autoDetect}
              onChange={(e) => setAutoDetect(e)}
            />
            <OptionsSelect
              label="File type:"
              placeholder=""
              items={[
                { value: "csv", label: "CSV" },
                { value: "dsv", label: "DSV" },
                { value: "json", label: "JSON" },
                { value: "parquet", label: "Parquet" },
              ]}
              onChange={(e: "csv" | "dsv" | "json" | "parquet") =>
                setFileType(e)
              }
              value={fileType ?? ""}
            />
            <OptionsCheckbox
              checked={header}
              onChange={(e) => setHeader(e)}
              label="Header"
            />
            <OptionsInputText
              label="Delimiter:"
              value={delim ?? ""}
              onClick={(e: string) => setDelim(e)}
            />
            <OptionsInputNumber label="Skip rows:" value={skip} set={setSkip} />
          </Options>
        </CardContent>
      </Card>
      <Source sourceReady={sourceReady} />
    </div>
  )
}
