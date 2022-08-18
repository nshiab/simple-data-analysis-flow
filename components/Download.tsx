// @ts-nocheck

import DownloadIcon from '@mui/icons-material/Download';
import { useCallback, useEffect, useState } from 'react';
import { csvFormat } from "d3-dsv"

export default function Download({ data }) {

    const [clicked, setClicked] = useState(false)
    const [format, setFormat] = useState(".csv")
    const [fileName, setFileName] = useState("data")

    const downloadFile = useCallback(() => {

        let content
        if (format == ".json") {
            content = JSON.stringify(data.simpleData.getData())
        } else if (format === ".csv") {
            content = csvFormat(data.simpleData.getData())
        }
        const a = document.createElement("a")
        const file = new Blob([content], { type: "text/plain" })
        a.href = URL.createObjectURL(file)
        a.download = `${fileName}${format}`
        a.click()

    }, [data.simpleData, format, fileName])

    return <div style={{ display: "flex", alignItems: "center", borderLeft: "1px solid grey", marginLeft: 8, paddingLeft: 5 }}>
        {!clicked ? <div style={{ cursor: "pointer", display: "flex", alignItems: "center" }} onClick={() => {
            setClicked(true)
        }}><DownloadIcon sx={{ height: 18, width: 18, fill: "grey" }} /></div > : null}
        {
            clicked ?
                <div style={{ fontSize: 12, marginLeft: 4, marginRight: 4 }}>
                    <input type="text" defaultValue="data" style={{ textAlign: "right", maxWidth: 100 }} onChange={(evt) => setFileName(evt.target.value)} />
                    <select defaultValue={".csv"} onChange={(evt) => setFormat(evt.target.value)}>
                        <option value=".csv">.csv</option>
                        <option value=".json">.json</option>
                    </select>
                </div> :
                null
        }
        {clicked ? <div style={{ cursor: "pointer", display: "flex", alignItems: "center" }} onClick={() => {
            downloadFile()
        }}><DownloadIcon sx={{ height: 18, width: 18, fill: "grey" }} /></div > : null}
    </div >
}