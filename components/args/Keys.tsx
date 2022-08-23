import React, { useEffect, useState } from "react"
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
    const [type, setType] = useState<React.ReactElement | null>(null)

    const { generateArgId, updateNodeArgs } = useStore()

    useEffect(() => {
        const argId = generateArgId(id, i, method)

        const t: React.ReactElement = (
            <select
                id={argId}
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
                    : null}
            </select>
        )

        setType(t)
    }, [
        id,
        i,
        method,
        d,
        args,
        sourceSimpleData,
        generateArgId,
        updateNodeArgs,
    ])

    return type
}
