// @ts-nocheck
import { useState, useRef, useEffect, useCallback } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { SimpleData } from 'simple-data-analysis';
import useStore from '../flow/store';
import { csvParse, autoType } from "d3-dsv"
import Arguments from './Arguments';
const width = 200


export default function DropFile({ id, data }) {

    const { updateNodeSimpleData, handleStyle, testNodeArgs } = useStore()

    const [fileContent, setFileContent] = useState(null)
    const [file, setFile] = useState(null)
    const [success, setSucces] = useState(false)

    const readFileAsync = useCallback((file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => {
                resolve(reader.result)
            }
            reader.onerror = reject
            reader.readAsText(file)
        })
    }, [])

    useEffect(() => {

        try {

            const argsTest = testNodeArgs(data)

            if (file && fileContent && argsTest) {

                let simpleData
                if (file.type === "text/csv") {
                    const parsedContent = data.args.autoType ? csvParse(fileContent, autoType) : csvParse(fileContent)
                    simpleData = new SimpleData({ data: parsedContent })
                } else if (file.type === "application/json") {
                    const parsedContent = JSON.parse(fileContent)
                    simpleData = new SimpleData({ data: parsedContent, ...data.args })
                }

                updateNodeSimpleData(id, simpleData, null)
                setSucces(true)
            }

        } catch (error) {
            updateNodeSimpleData(id, data.simpleData, error.message)
            setSucces(false)
        }

    }, [fileContent, file, data.args, id, testNodeArgs, updateNodeSimpleData])

    return <div style={{ backgroundColor: "white", border: "1px solid black", borderRadius: 5, padding: 10, width: 300 }}>
        <div style={{ fontWeight: "bold", textAlign: "center", marginBottom: 10 }}>dropFile</div>
        <div style={{ width: "100%", height: 100, border: "1px solid #D3D3D3", borderRadius: 5, display: "flex", alignItems: "center" }} onDrop={async (evt) => {
            evt.preventDefault()

            const items = evt.dataTransfer.items

            try {
                if (items.length > 1) {
                    throw new Error("Multiple files dropped. You can only drop one.")
                }

                if (!["text/csv", "application/json"].includes(items[0].type)) {
                    throw new Error("Only CSV and JSON files are accepted.")
                }

                const f = items[0].getAsFile()

                const fileContent = await readFileAsync(f)

                setFile(f)
                setFileContent(fileContent)

            } catch (error) {
                updateNodeSimpleData(id, data.simpleData, error.message)
                setFile(null)
                setFileContent(null)
                setSucces(false)
            }

        }} onDragOver={(evt) => evt.preventDefault()}><div style={{ fontSize: 12, width: 150, textAlign: "center", margin: "0 auto" }}>Drop a CSV or JSON file (array of objects)</div></div>
        {file ?
            <div>
                <div style={{ fontSize: 12, textAlign: "center", marginTop: 10 }}><b>File: </b>{`${file.name}`}</div>
                <Arguments id={id} data={data} />
            </div> :
            null}
        {data.errorMessage ? <div style={{ maxWidth: width, color: "red", marginTop: 10 }}>{data.errorMessage}</div> : null}
        <Handle type="source" position={Position.Bottom} id="a" style={{ ...handleStyle.source, backgroundColor: success ? "green" : "#ff6666" }} />
    </div >

}
