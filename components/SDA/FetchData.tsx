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
import { Button } from "../ui/button"
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
  const refUrl = useRef<HTMLInputElement | null>(null)

  const [url, setURL] = useState<null | string>(null)
  const [autoDetect, setAutoDetect] = useState(true)
  const [fileType, setFileType] = useState<
    "csv" | "dsv" | "json" | "parquet" | undefined
  >(undefined)
  const [header, setHeader] = useState(true)
  const [delim, setDelim] = useState<string | undefined>(undefined)
  const [skip, setSkip] = useState<number | undefined>(undefined)

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
      if (table instanceof SimpleWebTable && typeof url === "string") {
        try {
          setLoader(true)
          await table.fetchData(url, {
            fileType,
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
          <div className="flex items-center space-x-2 my-4">
            <Input
              ref={refUrl}
              type="url"
              placeholder="URL"
              onKeyDown={(e) =>
                e.key === "Enter" && refUrl.current
                  ? setURL(refUrl.current.value)
                  : null
              }
            />
            <Button
              type="button"
              onClick={() => {
                if (refUrl.current) {
                  setURL(refUrl.current.value)
                }
              }}
            >
              Fetch
            </Button>
          </div>
          <Error error={error} />
          <Options>
            <OptionsCheckbox
              label="Auto-detect"
              defaultChecked={true}
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
            />
            <OptionsCheckbox
              defaultChecked={true}
              onChange={(e) => setHeader(e)}
              label="Header"
            />
            <OptionsInputText
              label="Delimiter:"
              defaultValue=""
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setDelim(e.target.value)
              }
            />
            <OptionsInputNumber
              label="Skip rows:"
              defaultValue={0}
              set={setSkip}
            />
          </Options>
        </CardContent>
      </Card>
      <Source sourceReady={sourceReady} />
    </div>
  )
}