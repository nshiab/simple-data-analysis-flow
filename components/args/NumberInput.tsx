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
        <div>
            <input
                id={generateArgId(id, i, method)}
                type="number"
                style={{ width: 75 }}
                defaultValue={args[d.name] === undefined ? "" : args[d.name]}
            ></input>
            <button
                style={{ marginLeft: "4px" }}
                onClick={() => updateNodeArgs(id)}
            >
                Update
            </button>
        </div>
    )
}
