import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectItem,
} from "../ui/select"
import OptionsItem from "./OptionsItem"
import { Label } from "../ui/label"

export default function OptionsSelect({
  label,
  placeholder,
  items,
  onChange,
  value,
}: {
  label: string
  placeholder: string
  items: { value: any; label: any }[]
  onChange: (e: any) => void
  value?: any
}) {
  return (
    <OptionsItem>
      <Label>{label}</Label>
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items.map((d, i) => (
              <SelectItem key={i} value={d.value}>
                {d.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </OptionsItem>
  )
}
