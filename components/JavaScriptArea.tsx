// @ts-nocheck
import { useEffect, useState } from "react"

export default function JavaScriptArea({ id, method, generateArgId, updateArgs, d, i }) {

    const [content, setContent] = useState(d.defaultValue ? d.defaultValue : "")
    const [nbRows, setNbRows] = useState(0)

    useEffect(() => {
        setNbRows(content.split("\n").length)
    }, [content])


    return <textarea id={generateArgId(id, i, method)} rows={nbRows} value={content} style={{ resize: "none", fontSize: "12px", width: "350px" }} onChange={(evt) => {
        setContent(evt.target.value)
        updateArgs()
    }
    }></textarea>
}