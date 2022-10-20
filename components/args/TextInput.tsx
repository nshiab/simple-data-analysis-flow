import { useEffect, useState, useRef } from "react"
import { Arg } from "../../flow/methods"
import useStore, { NodeDataArgs } from "../../flow/store"

export default function TextInput({
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
            {d.jsOption ? (
                <div style={{ display: "flex", alignItems: "center" }}>
                    <input
                        id={generateArgId(id, i, method)}
                        style={{ width: d.width ? d.width : undefined }}
                        defaultValue={
                            args[d.name] === undefined ? "" : args[d.name]
                        }
                    ></input>
                    <div style={{ marginLeft: 4 }}>JS?</div>
                    <input
                        id={`${generateArgId(id, i, method)}JS`}
                        type="checkbox"
                        defaultValue={
                            args[`${generateArgId(id, i, method)}JS`] ===
                            undefined
                                ? false
                                : args[`${generateArgId(id, i, method)}JS`]
                        }
                    />
                    <button
                        style={{ marginLeft: "4px" }}
                        onClick={() => updateNodeArgs(id)}
                    >
                        Update
                    </button>
                </div>
            ) : (
                <>
                    <input
                        id={generateArgId(id, i, method)}
                        style={{ width: d.width ? d.width : undefined }}
                        defaultValue={
                            args[d.name] === undefined ? "" : args[d.name]
                        }
                    ></input>
                    <button
                        style={{ marginLeft: "4px" }}
                        onClick={() => updateNodeArgs(id)}
                    >
                        Update
                    </button>
                </>
            )}
        </div>
    )
}
