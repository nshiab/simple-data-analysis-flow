// @ts-nocheck
import { useEffect, useState } from "react"
import useStore from "../../flow/store"

export default function Keys({ id, i, method, d, args, sourceSimpleData }) {

    const [type, setType] = useState(null)

    const { generateArgId, updateNodeArgs } = useStore()

    useEffect(() => {

        const argId = generateArgId(id, i, method)

        const t = <select id={argId} onChange={() => updateNodeArgs(id)} value={args[d.name]}>
            {sourceSimpleData ? [undefined, ...sourceSimpleData.getKeys()].map((opt, index) => <option key={`${id}-${method}-option-${index}`}>{opt}</option>
            ) : null}
        </select>

        setType(t)
    }, [id, i, method, d, args, sourceSimpleData])

    return type
}