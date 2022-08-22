// @ts-nocheck
import { useEffect, useState } from "react"
import useStore from "../../flow/store"

export default function Checkbox({ id, i, method, d, args }) {

    const [type, setType] = useState(null)

    const { generateArgId, updateNodeArgs } = useStore()

    useEffect(() => {

        const argId = generateArgId(id, i, method)

        const t = <input type="checkbox" id={argId} onChange={() => updateNodeArgs(id)} style={{ marginBottom: 0 }} checked={args[d.name]}></input>

        setType(t)
    }, [id, i, method, d, args])

    return type
}