import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import OptionsItem from "./OptionsItem"
import { Button } from "../ui/button"

export default function OptionsTextArea({
  label,
  set,
  value,
}: {
  label: string
  value: string
  set: Dispatch<SetStateAction<string | undefined>>
}) {
  const ref = useRef<HTMLTextAreaElement | null>(null)

  const [localValue, setLocalValue] = useState<string | undefined>("")

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  return (
    <OptionsItem>
      <div className="grid w-full gap-2">
        <div className="flex items-center gap-2">
          <Label>{label}</Label>
          <Textarea
            ref={ref}
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && e.shiftKey && ref.current
                ? set(ref.current.value)
                : null
            }
          />
        </div>

        <Button
          onClick={() => {
            ref.current &&
              typeof ref.current.value === "string" &&
              set(ref.current.value)
          }}
        >
          Run
        </Button>
      </div>
    </OptionsItem>
  )
}
