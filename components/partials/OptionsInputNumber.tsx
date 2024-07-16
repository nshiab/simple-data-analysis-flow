import { SetStateAction } from "react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import OptionsItem from "./OptionsItem"

export default function OptionsInputNumber({
  label,
  defaultValue,
  set,
}: {
  label: string
  defaultValue: number
  set: (value: SetStateAction<number | undefined>) => void
}) {
  return (
    <OptionsItem>
      <Label>{label}</Label>
      <Input
        type="number"
        className="w-20"
        defaultValue={defaultValue}
        onChange={(e) => set(parseInt(e.target.value))}
      />
    </OptionsItem>
  )
}
