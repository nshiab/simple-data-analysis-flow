import React from "react"
import useStore, { NodeDataArgs } from "../../flow/store"
import { Arg } from "../../flow/methods"
import { SimpleData } from "simple-data-analysis"

export default function Keys({
    id,
    i,
    method,
    d,
    args,
    sourceSimpleData,
}: {
    id: string
    i: number
    method: string
    d: Arg
    args: NodeDataArgs
    sourceSimpleData: SimpleData | null | undefined
}) {

    const { generateArgId, updateNodeArgs } = useStore()

    return <select
        id={generateArgId(id, i, method)}
        onChange={() => updateNodeArgs(id)}
        value={args[d.name]}
    >
        {sourceSimpleData
            ? [undefined, ...sourceSimpleData.getKeys()].map(
                (opt, index) => (
                    <option key={`${id}-${method}-option-${index}`}>
                        {opt}
                    </option>
                )
            )
            :
            <option key={`${id}-${method}-option-${0}`}>
                {args[d.name]}
            </option>
        }
    </select>
}
