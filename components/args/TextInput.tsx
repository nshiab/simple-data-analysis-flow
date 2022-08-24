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

    const [cursor, setCursor] = useState(0)
    const ref = useRef<HTMLInputElement>(null)

    useEffect(() => {
        ref.current?.setSelectionRange(cursor, cursor)
    }, [cursor, args[d.name]])

    return (
        <div>
            {d.jsOption ? (
                <div style={{ display: "flex", alignItems: "center" }}>
                    <input
                        ref={ref}
                        id={generateArgId(id, i, method)}
                        onChange={(e) => {
                            e.target.selectionStart &&
                                setCursor(e.target.selectionStart)
                            updateNodeArgs(id)
                        }}
                        style={{ width: d.width ? d.width : undefined }}
                        value={args[d.name] === undefined ? "" : args[d.name]}
                    ></input>
                    <div style={{ marginLeft: 4 }}>JS?</div>
                    <input
                        id={`${generateArgId(id, i, method)}JS`}
                        onChange={() => updateNodeArgs(id)}
                        type="checkbox"
                        checked={
                            args[`${generateArgId(id, i, method)}JS`] ===
                            undefined
                                ? false
                                : args[`${generateArgId(id, i, method)}JS`]
                        }
                    />
                </div>
            ) : (
                <input
                    ref={ref}
                    id={generateArgId(id, i, method)}
                    onChange={(e) => {
                        e.target.selectionStart &&
                            setCursor(e.target.selectionStart)
                        updateNodeArgs(id)
                    }}
                    style={{ width: d.width ? d.width : undefined }}
                    value={args[d.name] === undefined ? "" : args[d.name]}
                ></input>
            )}
        </div>
    )
}
