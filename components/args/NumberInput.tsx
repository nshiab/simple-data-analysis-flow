import { useEffect, useState } from "react"
import { Arg } from "../../flow/methods"
import useStore, { NodeDataArgs } from "../../flow/store"

export default function NumberInput({
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
        <input
            id={generateArgId(id, i, method)}
            onChange={(e) => {
                updateNodeArgs(id)
            }}
            type="number"
            style={{ width: 75 }}
            value={args[d.name] === undefined ? "" : args[d.name]}
        ></input>
    )
}
