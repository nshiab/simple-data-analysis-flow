import { useEffect, useState } from "react"
import { SimpleData } from "simple-data-analysis"
import { Arg } from "../../flow/methods"
import useStore, { NodeDataArgs } from "../../flow/store"

export default function MultipleKeys({ id, method, d, i, sourceSimpleData, args }: { id: string, method: string, d: Arg, i: number, sourceSimpleData: SimpleData | null | undefined, args: NodeDataArgs }) {

    const [type, setType] = useState<React.ReactElement | null>(null)

    const { generateArgId, updateNodeArgs } = useStore()

    useEffect(() => {

        const argId = generateArgId(id, i, method)

        const t = <div style={{ display: "flex", flexWrap: "wrap" }}>
            {sourceSimpleData ?
                sourceSimpleData.getKeys().map((key, index) => <div style={{ display: "flex", alignItems: "center", border: "1px solid grey", borderRadius: 5, padding: "5px 5px", margin: 3 }} key={`${id}-${method}-arg${i}-multipleKeys${index}`}>
                    <div>{key}</div>
                    <input type={"checkbox"} className={argId} onChange={() => updateNodeArgs(id)} style={{ marginBottom: 0 }} value={key} checked={args[d.name] ? args[d.name].includes(key) : false}></input>
                </div>)
                : null}
        </div>

        setType(t)
    }, [id, method, d, i, sourceSimpleData, args, generateArgId, updateNodeArgs])

    return type
}