import { useEffect, useState } from "react"
import { Arg } from "../../flow/methods"
import useStore, { NodeDataArgs } from "../../flow/store"

export default function Select({
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
    const [type, setType] = useState<React.ReactElement | null>(null)

    const { generateArgId, updateNodeArgs } = useStore()

    useEffect(() => {
        const argId = generateArgId(id, i, method)

        const t = (
            <select
                id={argId}
                onChange={() => updateNodeArgs(id)}
                value={args[d.name]}
            >
                {d.options
                    ? d.options.map((opt, index) => (
                          <option key={`${id}-${method}-option-${index}`}>
                              {opt}
                          </option>
                      ))
                    : null}
            </select>
        )

        setType(t)
    }, [id, i, method, d, args, generateArgId, updateNodeArgs])

    return type
}
