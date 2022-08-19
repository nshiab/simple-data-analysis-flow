// @ts-nocheck
import { useEffect, useState } from "react"
import useStore from "../../flow/store"

export default function Select({ id, i, method, d, args }) {

    const [type, setType] = useState(null)

    const { generateArgId, updateNodeArgs } = useStore()

    useEffect(() => {

        const argId = generateArgId(id, i, method)

        const t = <select id={argId} onChange={() => updateNodeArgs(id)} value={args[d.name]}>
            {d.options.map((opt, index) => <option key={`${id}-${method}-option-${index}`}>{opt}</option>
            )}
        </select>

        setType(t)
    }, [id, i, method, d, args])

    return type
}