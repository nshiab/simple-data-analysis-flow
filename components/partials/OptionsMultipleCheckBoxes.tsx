import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react"
import OptionsCheckbox from "./OptionsCheckbox"
import { Separator } from "../ui/separator"
import { Label } from "../ui/label"

export default function OptionsMultiplesCheckBoxes({
  label,
  items,
  set,
}: {
  label: string
  items: { value: string; label: string }[]
  set: Dispatch<SetStateAction<string[] | undefined>>
}) {
  const [array, setArray] = useState<string[]>([])

  useEffect(() => set(array), [array, set])

  return (
    <div className="my-4">
      <Label>{label}</Label>
      <div className="flex items-center flex-wrap gap-2">
        {items.map((d, i) => (
          <Fragment key={`${label}-div-${i}`}>
            {i !== 0 && i !== items.length - 1 && (
              <Separator
                key={`${label}-sep-${i}`}
                orientation="vertical"
                className="h-5"
              />
            )}
            <OptionsCheckbox
              smallMargin={true}
              key={`${label}-check-${i}`}
              label={d.label}
              onChange={(e) => {
                if (e) {
                  if (!array.includes(d.value)) {
                    setArray([...array, d.value])
                  }
                } else {
                  setArray(array.filter((x) => x !== d.value))
                }
              }}
            />
          </Fragment>
        ))}
      </div>
    </div>
  )
}
