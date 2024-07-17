import { SetStateAction } from "react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import OptionsItem from "./OptionsItem"

export default function OptionsInputNumber({
  label,
  value,
  set,
}: {
  label: string
  value: number | undefined
  set: (value: SetStateAction<number | undefined>) => void
}) {
  return (
    <OptionsItem>
      <Label>{label}</Label>
      <Input
        type="number"
        className="w-20"
        value={value}
        onChange={(e) => set(parseInt(e.target.value))}
      />
    </OptionsItem>
  )
}
