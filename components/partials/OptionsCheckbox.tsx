import { Checkbox } from "../ui/checkbox"
import OptionsItem from "./OptionsItem"
import { Label } from "../ui/label"

export default function OptionsCheckbox({
  label,
  defaultChecked,
  checked,
  onChange,
  smallMargin,
}: {
  label: string
  checked: boolean
  defaultChecked?: boolean
  onChange: (e: boolean) => void
  smallMargin?: boolean
}) {
  return (
    <OptionsItem smallMargin={smallMargin}>
      <Checkbox
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onChange}
      />
      <Label className={`${smallMargin ? "font-normal" : ""}`}>{label}</Label>
    </OptionsItem>
  )
}
