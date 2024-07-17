import { useEffect, useRef, useState } from "react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import OptionsItem from "./OptionsItem"
import { Button } from "../ui/button"

export default function OptionsInputText({
  label,
  value,
  onClick,
}: {
  label: string
  value: string
  onClick: (e: string) => void
}) {
  const ref = useRef<HTMLInputElement>(null)

  const [localValue, setLocalValue] = useState<string>("")

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  return (
    <OptionsItem>
      <Label>{label}</Label>
      <Input
        ref={ref}
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onKeyDown={(e) => {
          e.key === "Enter" && ref.current ? onClick(ref.current.value) : null
        }}
      />
      <Button
        onClick={() =>
          ref.current &&
          typeof ref.current.value === "string" &&
          onClick(ref.current.value)
        }
      >
        Update
      </Button>
    </OptionsItem>
  )
}
