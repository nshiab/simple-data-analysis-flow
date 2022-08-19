// @ts-nocheck
import { useEffect, useState } from "react"
import useStore from "../../flow/store"

export default function MultipleKeys({ id, method, d, i, args }) {

    const [type, setType] = useState(null)

    const { generateArgId, updateNodeArgs } = useStore()

    useEffect(() => {

        const argId = generateArgId(id, i, method)



        const t = <div style={{ display: "flex", flexWrap: "wrap" }}>
            {d.options.map((opt, index) => <div style={{ display: "flex", alignItems: "center", border: "1px solid grey", borderRadius: 5, padding: "5px 5px", margin: 3 }} key={`${id}-${method}-arg${i}-multipleBoxes${index}`}>
                <div>{opt}</div>
                <input type={"checkbox"} className={argId} onChange={() => updateNodeArgs(id)} style={{ marginBottom: 0 }} value={opt} checked={args[d.name] ? args[d.name].includes(opt) : false}></input>
            </div>)}
        </div>

        setType(t)
    }, [id, method, d, i, args])

    return type
}