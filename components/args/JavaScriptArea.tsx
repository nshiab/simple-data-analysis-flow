import { useEffect, useState } from "react"
import useStore from "../../flow/store"
import { Arg } from "../../flow/methods"

export default function JavaScriptArea({ id, method, d, i }: { id: string, method: string, d: Arg, i: number }) {

    const { generateArgId, updateNodeArgs } = useStore()

    const [content, setContent] = useState(d.defaultValue ? d.defaultValue : "")
    const [nbRows, setNbRows] = useState(0)

    useEffect(() => {
        setNbRows(content.split("\n").length + 1)
    }, [content])


    return <textarea id={generateArgId(id, i, method)} rows={nbRows} value={content} style={{ resize: "none", fontSize: "12px", width: "250px" }} onChange={(evt) => {
        setContent(evt.target.value)
        updateNodeArgs(id)
    }
    }></textarea>
}