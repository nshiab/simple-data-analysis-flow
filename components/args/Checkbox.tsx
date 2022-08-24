import { Arg } from "../../flow/methods"
import useStore, { NodeDataArgs } from "../../flow/store"

export default function Checkbox({
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

    const { generateArgId, updateNodeArgs } = useStore()

    return <input
        type="checkbox"
        id={generateArgId(id, i, method)}
        onChange={() => updateNodeArgs(id)}
        style={{ marginBottom: 0 }}
        checked={args[d.name]}
    ></input>
}
