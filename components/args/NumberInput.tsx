import { useEffect, useState } from "react"
import { Arg } from "../../flow/methods"
import useStore, { NodeDataArgs } from "../../flow/store"

export default function NumberInput({ id, i, method, d, args }: { id: string, i: number, method: string, d: Arg, args: NodeDataArgs }) {

    const [type, setType] = useState<React.ReactElement | null>(null)

    const { generateArgId, updateNodeArgs } = useStore()

    useEffect(() => {

        const argId = generateArgId(id, i, method)

        const t = <input id={argId} onChange={() => updateNodeArgs(id)} type="number" style={{ width: 50 }} value={args[d.name] === undefined ? "" : args[d.name]}></input>

        setType(t)
    }, [id, i, method, d, args])

    return type
}