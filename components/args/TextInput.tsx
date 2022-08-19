// @ts-nocheck
import { useEffect, useState } from "react"
import useStore from "../../flow/store"

export default function TextInput({ id, i, method, d, args }) {

    const [type, setType] = useState(null)

    const { generateArgId, updateNodeArgs } = useStore()

    useEffect(() => {

        const argId = generateArgId(id, i, method)

        let t = <input id={argId} onChange={() => updateNodeArgs(id)} style={{ width: d.width ? d.width : undefined }} value={args[d.name]}></input>

        if (d.jsOption) {
            t = <div style={{ display: "flex", alignItems: "center" }}>
                {t}
                <div style={{ marginLeft: 4 }}>JS?</div>
                <input id={`${argId}JS`} onChange={() => updateNodeArgs(id)} type="checkbox" checked={args[`${argId}JS`]} />
            </div>
        }
        setType(t)
    }, [id, i, method, d, args])

    return type
}