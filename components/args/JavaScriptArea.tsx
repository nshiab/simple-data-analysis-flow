import { useEffect, useRef, useState } from "react"
import useStore, { NodeDataArgs } from "../../flow/store"
import { Arg } from "../../flow/methods"

export default function JavaScriptArea({
    id,
    method,
    d,
    i,
    args,
}: {
    id: string
    method: string
    d: Arg
    i: number
    args: NodeDataArgs
}) {
    const { generateArgId, updateNodeArgs } = useStore()

    return (
        <div style={{ width: "250px" }}>
            <textarea
                id={generateArgId(id, i, method)}
                rows={
                    args[d.name]
                        ? String(args[d.name]).split("\n").length + 2
                        : d.defaultValue
                        ? d.defaultValue.split("\n").length + 1
                        : 4
                }
                defaultValue={
                    args[d.name] ? String(args[d.name]) : d.defaultValue
                }
                style={{ resize: "none", fontSize: "12px", width: "100%" }}
            ></textarea>
            <button
                style={{
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                }}
                onClick={() => updateNodeArgs(id)}
            >
                Update
            </button>
        </div>
    )
}
