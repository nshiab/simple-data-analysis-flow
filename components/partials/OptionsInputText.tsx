import { ChangeEvent } from "react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import OptionsItem from "./OptionsItem"

export default function OptionsInputText({
  label,
  defaultValue,
  onChange,
}: {
  label: string
  defaultValue?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <OptionsItem>
      <Label>{label}</Label>
      <Input
        type="text"
        className="w-50"
        defaultValue={defaultValue}
        onChange={onChange}
      />
    </OptionsItem>
  )
}
