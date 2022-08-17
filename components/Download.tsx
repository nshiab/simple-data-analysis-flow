// @ts-nocheck

import DownloadIcon from '@mui/icons-material/Download';
import { useCallback, useState } from 'react';
import { csvFormat } from "d3-dsv"

export default function Download({ data }) {

    const [clicked, setClicked] = useState(false)

    const onClick = useCallback((format) => {

        let content
        if (format == "json") {
            content = JSON.stringify(data.simpleData.getData())
        } else if (format === "csv") {
            content = csvFormat(data.simpleData.getData())
        }
        const a = document.createElement("a")
        const file = new Blob([content], { type: "text/plain" })
        a.href = URL.createObjectURL(file)
        a.download = "data." + format
        a.click()



    }, [data])

    return <div style={{ display: "flex", alignItems: "center" }}><div style={{ cursor: "pointer", display: "flex", alignItems: "center", transform: "translateY(2px)" }} onClick={() => setClicked(!clicked)}><DownloadIcon sx={{ height: 18, width: 18, fill: "grey" }} /></div >{clicked ? <div style={{ fontSize: 12 }}><span style={{ textDecoration: "underline", cursor: "pointer" }} onClick={() => onClick("json")}>JSON</span> or <span style={{ textDecoration: "underline", cursor: "pointer" }} onClick={() => onClick("csv")}>CSV</span></div> : null
    }</div>
}