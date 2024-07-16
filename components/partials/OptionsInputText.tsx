import { ChangeEvent } from "react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import OptionsItem from "./OptionsItem"

export default function OptionsInputText({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <OptionsItem>
      <Label>{label}</Label>
      <Input type="text" className="w-50" value={value} onChange={onChange} />
    </OptionsItem>
  )
}
