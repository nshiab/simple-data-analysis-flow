import { useEffect, useState } from "react"
import { Arg } from "../../flow/methods"
import useStore, { NodeDataArgs } from "../../flow/store"

export default function TextInput({ id, i, method, d, args }: { id: string, i: number, method: string, d: Arg, args: NodeDataArgs }) {

    const [type, setType] = useState<React.ReactElement | null>(null)

    const { generateArgId, updateNodeArgs } = useStore()

    useEffect(() => {

        const argId = generateArgId(id, i, method)

        let t = <input id={argId} onChange={() => updateNodeArgs(id)} style={{ width: d.width ? d.width : undefined }} value={args[d.name] === undefined ? "" : args[d.name]}></input>

        if (d.jsOption) {
            t = <div style={{ display: "flex", alignItems: "center" }}>
                {t}
                <div style={{ marginLeft: 4 }}>JS?</div>
                <input id={`${argId}JS`} onChange={() => updateNodeArgs(id)} type="checkbox" checked={args[`${argId}JS`] === undefined ? false : args[`${argId}JS`]} />
            </div>
        }
        setType(t)
    }, [id, i, method, d, args])

    return type
}