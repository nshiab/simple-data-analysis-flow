import { useCallback, useEffect, useState } from "react"
import { codeToHtml } from "shiki"
import CodeIcon from "./CodeIcon"
import { Button } from "../ui/button"
import CopyIcon from "./CopyIcon"

export default function Code({
  code,
  border,
  left,
}: {
  code: string
  border?: boolean
  left?: boolean
}) {
  const [innerHTML, setInnerHTML] = useState<string>("")
  const [open, setOpen] = useState(false)

  useEffect(() => {
    async function toHtml() {
      const html = await codeToHtml(code, {
        lang: "typescript",
        theme: "slack-ochin",
      })
      setInnerHTML(html)
    }
    toHtml()
  }, [code])

  const copy = useCallback(() => {
    navigator.clipboard.writeText(code)
  }, [code])

  return (
    <div>
      <div className="absolute m-auto left-auto right-0">
        <Button
          variant={"outline"}
          size={"icon"}
          className={border ? "bg-white m-2" : "m-1 h-9 px-0 border-none"}
          onClick={() => setOpen(!open)}
        >
          <CodeIcon />
        </Button>
        {open && (
          <div
            className={`absolute ${
              left ? "-translate-x-full top-2" : "translate-x-14 top-0"
            }  rounded-lg border bg-card text-card-foreground shadow-sm flex justify-between`}
          >
            <div
              className="p-4"
              dangerouslySetInnerHTML={{ __html: innerHTML }}
            ></div>
            <div>
              <Button
                variant={"outline"}
                size={"icon"}
                className="m-1 h-9 px-0 py-0 border-none"
                onClick={copy}
              >
                <CopyIcon />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
