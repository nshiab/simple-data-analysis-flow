import React, { useEffect, useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import Table from '../Table';
import useStore, { NodeData } from '../../flow/store';
import Download from '../Download';
import Arguments from '../Arguments';


export default function SimpleDataMethod({ id, data }: { id: string, data: NodeData }) {

    const [success, setSucces] = useState<boolean>()
    const [htmlOutput, setHTMLOutput] = useState<null | string>(null)
    const [htmlOutputLength, setHTMLOutputLength] = useState(300)

    const { updateNodeSimpleData, testNodeArgs, handleStyle, logs, methods, remainingItemsShowTable } = useStore()

    useEffect(() => {


        const argsTest = testNodeArgs(data)

        logs && console.log(data.method, data.sourceSimpleData, data.sourceSimpleDataB, data.method, data.args, data.errorMessage, argsTest)

        if (data.sourceSimpleData && argsTest && !data.errorMessage) {

            if (methods[data.method].category !== "Others") {
                try {

                    //@ts-ignore
                    const newSimpleData = methods[data.method].justClone ? data.sourceSimpleData.clone() : data.sourceSimpleData.clone()[data.method](data.args)

                    logs && console.log("triggered", data.method)
                    updateNodeSimpleData(id, newSimpleData, null)

                    //@ts-ignore
                    methods[data.method].htmlOutput ? setHTMLOutput(data.sourceSimpleData.clone()[data.method](data.args)) : setHTMLOutput(null)

                    setSucces(true)
                } catch (error) {
                    //@ts-ignore
                    updateNodeSimpleData(id, data.simpleData, error.message)
                    setHTMLOutput(null)
                    setSucces(false)
                }
            } else {
                try {
                    //@ts-ignore
                    const result = data.sourceSimpleData[data.method](data.args)

                    const resultString = JSON.stringify(result, null, 1)

                    updateNodeSimpleData(id, null, null)
                    setHTMLOutput(resultString)
                } catch (error) {
                    //@ts-ignore
                    updateNodeSimpleData(id, null, error.message)
                }
            }


        } else {
            setHTMLOutput(null)
            updateNodeSimpleData(id, data.simpleData, data.errorMessage)
            setSucces(false)
        }

    }, [data.method, data.sourceSimpleData, data.sourceSimpleDataB, data.args, data.errorMessage, updateNodeSimpleData, logs, methods, testNodeArgs, id])


    return <div>
        {methods[data.method].doubleSource ?
            <div>
                <Handle type="target" position={Position.Top} id="a" style={{ ...handleStyle.target, transform: "translateX(-30px)", backgroundColor: data.sourceSimpleData ? "green" : "#ff6666" }} />
                <Handle type="target" position={Position.Top} id="b" style={{ ...handleStyle.target, transform: "translateX(20px)", backgroundColor: data.sourceSimpleDataB ? "green" : "#ff6666" }} />
            </div> :
            <Handle type="target" position={Position.Top} id="a" style={{ ...handleStyle.target, backgroundColor: data.sourceSimpleData ? "green" : "#ff6666" }} />}
        <div style={{ backgroundColor: "white", border: "1px solid black", borderRadius: 5, padding: 10, maxWidth: methods[data.method].maxWidth ? methods[data.method].maxWidth : 300 }}>

            <div style={{ fontWeight: "bold", textAlign: "center" }}>{data.method}</div>

            <Arguments id={id} data={data} />

            {methods[data.method].category === "Others" && htmlOutput && htmlOutput.length > 300 ? <div style={{ display: "flex", alignItems: "center", fontSize: 12, borderRight: "1px solid gray", padding: "0 10px", margin: "5px 0" }}>
                <div>Shown characters: </div>
                <input type="number" style={{ width: 50 }} onChange={(evt) => setHTMLOutputLength(parseInt(evt.target.value))} defaultValue={300} />
            </div> : null}
            {data.method === "showTable" && data.simpleData ? <><Table keys={data.simpleData.getKeys()} data={data.simpleData.getData().slice(0, data.args.nbItemsInTable ? data.args.nbItemsInTable : 5)} /><div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", marginTop: 5 }}><div style={{ fontSize: 12 }}>{remainingItemsShowTable(data)}</div><Download data={data} /></div></> : null}
            {htmlOutput ? <div style={{ marginTop: 15 }} dangerouslySetInnerHTML={{ __html: methods[data.method].category === "Others" ? `${htmlOutput.length > htmlOutputLength ? htmlOutput.slice(0, htmlOutputLength).trim() + "..." : htmlOutput}` : htmlOutput }}></div> : null}
            {data.errorMessage ? <div style={{ width: "100%", color: "red", marginTop: 10 }}>{data.errorMessage}</div> : null}
        </div>
        {methods[data.method].category !== "Others" ?
            <Handle type='source' style={{
                ...handleStyle.source, backgroundColor: success ? "green" : "#ff6666"
            }} position={Position.Bottom} id="a" />
            :
            null}

    </div >
}
