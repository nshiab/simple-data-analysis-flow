import { useState, useEffect, useCallback } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { SimpleData } from 'simple-data-analysis';
import useStore, { NodeData } from '../../flow/store';
import { csvParse, autoType } from "d3-dsv"
import Arguments from '../Arguments';


export default function DropFile({ id, data }: { id: string, data: NodeData }) {

    const { updateNodeSimpleData, handleStyle, testNodeArgs } = useStore()


    const [success, setSucces] = useState(false)

    const readFileAsync = useCallback((file: File) => {
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

            if (data.file && data.file.content && argsTest) {

                let parsedContent
                if (data.file.type === "text/csv") {
                    parsedContent = data.args.autoType ? csvParse(data.file.content, autoType) : csvParse(data.file.content)
                } else if (data.file.type === "application/json") {
                    parsedContent = JSON.parse(data.file.content)
                }

                data.args.firstItem = data.args.firstItem === "" ? undefined : data.args.firstItem
                data.args.lastItem = data.args.lastItem === "" ? undefined : data.args.lastItem

                const simpleData = new SimpleData({ data: parsedContent, ...data.args })

                updateNodeSimpleData(id, simpleData, null)
                setSucces(true)
            }

        } catch (error) {
            //@ts-ignore
            updateNodeSimpleData(id, data.simpleData, error.message)
            setSucces(false)
        }

    }, [data.args, id, testNodeArgs, updateNodeSimpleData, data.file])

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

                if (f) {
                    const fileContent = await readFileAsync(f)

                    updateNodeSimpleData(id, data.simpleData, null, { file: { content: fileContent, name: f?.name, type: f?.type } })
                } else {
                    throw new Error("Problem with the file")
                }


            } catch (error) {
                //@ts-ignore
                updateNodeSimpleData(id, data.simpleData, error.message, { file: { content: null, name: null } })
                setSucces(false)
            }

        }} onDragOver={(evt) => evt.preventDefault()}><div style={{ fontSize: 12, width: 150, textAlign: "center", margin: "0 auto" }}>Drop a CSV or JSON file (array of objects)</div></div>
        {data.file ?
            <div>
                <div style={{ fontSize: 12, textAlign: "center", marginTop: 10 }}><b>File: </b>{`${data.file.name}`}</div>
                <Arguments id={id} data={data} />
            </div> :
            null}
        {data.errorMessage ? <div style={{ maxWidth: "100%", color: "red", marginTop: 10 }}>{data.errorMessage}</div> : null}
        <Handle type="source" position={Position.Bottom} id="a" style={{ ...handleStyle.source, backgroundColor: success ? "green" : "#ff6666" }} />
    </div >

}
