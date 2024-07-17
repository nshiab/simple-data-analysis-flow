import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react"
import OptionsCheckbox from "./OptionsCheckbox"
import { Separator } from "../ui/separator"
import { Label } from "../ui/label"

export default function OptionsMultiplesCheckBoxes({
  label,
  items,
  set,
  values,
}: {
  label: string
  items: { value: string; label: string }[]
  set: Dispatch<SetStateAction<string[] | undefined>>
  values: string[]
}) {
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
              checked={values.includes(d.value)}
              onChange={(e) => {
                if (e) {
                  if (!values.includes(d.value)) {
                    set([...values, d.value])
                  }
                } else {
                  set(values.filter((x) => x !== d.value))
                }
              }}
            />
          </Fragment>
        ))}
      </div>
    </div>
  )
}
