import { useEffect, useRef, useState } from "react"
import useStore, { NodeDataArgs } from "../../flow/store"
import { Arg } from "../../flow/methods"

export default function JavaScriptArea({
    id,
    method,
    d,
    i,
    args
}: {
    id: string
    method: string
    d: Arg
    i: number,
    args: NodeDataArgs
}) {
    const { generateArgId, updateNodeArgs } = useStore()

    const [cursor, setCursor] = useState(0)
    const ref = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        ref.current?.setSelectionRange(cursor, cursor)
    }, [cursor, args[d.name], ref])

    return (
        <textarea
            ref={ref}
            id={generateArgId(id, i, method)}
            rows={
                args[d.name] ?
                    String(args[d.name]).split("\n").length + 2 :
                    d.defaultValue ?
                        d.defaultValue.split("\n").length + 1 :
                        4
            }
            value={args[d.name] ? String(args[d.name]) : d.defaultValue}
            style={{ resize: "none", fontSize: "12px", width: "250px" }}
            onChange={(e) => {
                setCursor(e.target.selectionStart)
                updateNodeArgs(id)
            }}
        ></textarea>
    )
}
