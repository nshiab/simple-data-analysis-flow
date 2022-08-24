import { Arg } from "../../flow/methods"
import useStore, { NodeDataArgs } from "../../flow/store"

export default function MultipleKeys({
    id,
    method,
    d,
    i,
    args,
}: {
    id: string
    method: string
    d: Arg
    i: number
    args: NodeDataArgs
}) {
    const { generateArgId, updateNodeArgs } = useStore()

    return <div style={{ display: "flex", flexWrap: "wrap" }}>
        {d.options
            ? d.options.map((opt, index) => (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid grey",
                        borderRadius: 5,
                        padding: "5px 5px",
                        margin: 3,
                    }}
                    key={`${id}-${method}-arg${i}-multipleBoxes${index}`}
                >
                    <div>{opt}</div>
                    <input
                        type={"checkbox"}
                        className={generateArgId(id, i, method)}
                        onChange={() => updateNodeArgs(id)}
                        style={{ marginBottom: 0 }}
                        value={opt}
                        checked={
                            args[d.name]
                                ? args[d.name].includes(opt)
                                : false
                        }
                    ></input>
                </div>
            ))
            : null}
    </div>
}
