// @ts-nocheck
import { useEffect, useState } from "react"
import useStore from "../../flow/store"

export default function NumberInput({ id, i, method, d, args }) {

    const [type, setType] = useState(null)

    const { generateArgId, updateNodeArgs } = useStore()

    useEffect(() => {

        const argId = generateArgId(id, i, method)

        const t = <input id={argId} onChange={() => updateNodeArgs(id)} type="number" style={{ width: 50 }} value={args[d.name] === undefined ? "" : args[d.name]}></input>

        setType(t)
    }, [id, i, method, d, args])

    return type
}