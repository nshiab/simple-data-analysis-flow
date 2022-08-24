import { useEffect, useState } from "react"
import { Arg } from "../../flow/methods"
import useStore, { NodeDataArgs } from "../../flow/store"

export default function Select({
    id,
    i,
    method,
    d,
    args,
}: {
    id: string
    i: number
    method: string
    d: Arg
    args: NodeDataArgs
}) {
    const { generateArgId, updateNodeArgs } = useStore()

    return (
        <select
            id={generateArgId(id, i, method)}
            onChange={() => updateNodeArgs(id)}
            value={args[d.name]}
        >
            {d.options
                ? d.options.map((opt, index) => (
                      <option key={`${id}-${method}-option-${index}`}>
                          {opt}
                      </option>
                  ))
                : null}
        </select>
    )
}
