import { Dispatch, SetStateAction, useEffect, useState } from "react"
import OptionsInputText from "./OptionsInputText"

export default function OptionsMultipleInputText({
  items,
  values,
  setValues,
}: {
  items: {
    label: string
    defaultValue: string
  }[]
  values: { [key: string]: string }
  setValues: Dispatch<
    SetStateAction<{
      [key: string]: string
    }>
  >
}) {
  return (
    <>
      {items.map((d, i) => (
        <OptionsInputText
          key={i}
          label={d.label}
          value={values[d.label] ?? ""}
          onClick={(e) => {
            const newLocalValues = { ...values }
            newLocalValues[d.label] = e
            setValues(newLocalValues)
          }}
        />
      ))}
    </>
  )
}
