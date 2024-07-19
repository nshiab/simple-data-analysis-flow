import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import { useHandleConnections, useNodesData, useReactFlow } from "@xyflow/react"
import { useEffect, useRef, useState } from "react"
import SimpleWebTable from "../../node_modules/simple-data-analysis/dist/class/SimpleWebTable"
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

export default function FetchData({ id }: { id: string }) {
  const [url, setURL] = useState<string | undefined>(undefined)
  const [autoDetect, setAutoDetect] = useState(true)
  const [fileType, setFileType] = useState<string | undefined>(undefined)
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
      if (typeof nodeData.data.url === "string") {
        setURL(nodeData.data.url)
      }
      if (typeof nodeData.data.fileType === "string") {
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
      if (table instanceof SimpleWebTable && typeof url === "string") {
        try {
          setLoader(true)
          await table.fetchData(url, {
            fileType: fileType as "csv" | "dsv" | "json" | "parquet",
            autoDetect,
            header,
            delim,
            skip,
          })
          const code = `// More options available. Check documentation.
await ${table.name}.loadData("${url}", {
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
            url,
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
    url,
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
          <CardTitleWithLoader loader={loader}>Fetch data</CardTitleWithLoader>
          <CardDescription>
            Fetches data (CSV, JSON, and Parquet files) from a URL.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OptionsInputText
            label="URL"
            value={url ?? ""}
            onClick={(e: string) => setURL(e)}
          />
          <Error error={error} />
          <Options>
            <OptionsCheckbox
              label="Auto-detect"
              checked={autoDetect}
              onChange={(e) => setAutoDetect(e)}
            />
            <OptionsSelect
              label="File type:"
              value={fileType ?? ""}
              items={[
                { value: "csv", label: "CSV" },
                { value: "dsv", label: "DSV" },
                { value: "json", label: "JSON" },
                { value: "parquet", label: "Parquet" },
              ]}
              onChange={(e) => setFileType(e)}
            />
            <OptionsCheckbox
              checked={header}
              onChange={(e) => setHeader(e)}
              label="Header"
            />
            <OptionsInputText
              label="Delimiter:"
              value={delim ?? ","}
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
