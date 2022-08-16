// @ts-nocheck
import React, { useCallback, useEffect, useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import Table from './Table';
import Keys from './Keys';
import MultipleKeys from './MultipleKeys';
import useStore from '../flow/store';
import methods from '../flow/methods';
import JavaScriptArea from './JavaScriptArea';


const width = 200

export default function SimpleDataMethod({ id, data }) {

    const [success, setSucces] = useState()
    const [htmlOutput, setHTMLOutput] = useState(null)

    const remainingItemsShowTable = useCallback(() => {

        const nbItems = data.simpleData.getLength()
        const nbItemsInTable = data.args.nbItemsInTable ? data.args.nbItemsInTable : 5
        const reminingItems = nbItems - nbItemsInTable

        return `${nbItems} items in total${reminingItems > 0 ? ` (${reminingItems} hidden)` : ""}`

    }, [data.simpleData, data.args])


    const { updateNodeSimpleData, updateNodeArgs, handleStyle, generateArgId, logs } = useStore()


    useEffect(() => {

        triggerMethod()

        async function triggerMethod() {


            let argsTest = false

            if (methods[data.method].arguments.filter(d => d.optional === false).length === 0) {
                argsTest = true
            } else {
                for (let arg of methods[data.method].arguments.filter(d => d.optional === false)) {
                    if (data.args[arg.name]) {
                        argsTest = true
                    } else {
                        argsTest = false
                        break
                    }
                }
            }

            logs && console.log(data.method, data.sourceSimpleData, data.sourceSimpleDataB, data.method, data.args, data.errorMessage, argsTest)

            if (data.sourceSimpleData && argsTest && !data.errorMessage) {

                try {

                    const newSimpleData = methods[data.method].justClone ? data.sourceSimpleData.clone() : await data.sourceSimpleData.clone()[data.method](data.args)

                    logs && console.log("triggered", data.method)
                    updateNodeSimpleData(id, newSimpleData, null)

                    methods[data.method].htmlOutput ? setHTMLOutput(data.sourceSimpleData.clone()[data.method](data.args)) : setHTMLOutput(null)

                    setSucces(true)
                } catch (error) {
                    updateNodeSimpleData(id, null, error.message)
                    setHTMLOutput(null)
                    setSucces(false)
                }
            } else {
                setHTMLOutput(null)
                updateNodeSimpleData(id, null, data.errorMessage)
                setSucces(false)
            }

        }

    }, [data.method, data.sourceSimpleData, data.sourceSimpleDataB, data.args, data.errorMessage])


    return <div>
        {methods[data.method].doubleSource ?
            <div>
                <Handle type="target" position={Position.Top} id="a" style={{ ...handleStyle.target, transform: "translateX(-30px)", backgroundColor: data.sourceSimpleData ? "green" : "#ff6666" }} />
                <Handle type="target" position={Position.Top} id="b" style={{ ...handleStyle.target, transform: "translateX(20px)", backgroundColor: data.sourceSimpleDataB ? "green" : "#ff6666" }} />
            </div> :
            <Handle type="target" position={Position.Top} id="a" style={{ ...handleStyle.target, backgroundColor: data.sourceSimpleData ? "green" : "#ff6666" }} />}
        <div style={{ backgroundColor: "white", border: "1px solid black", borderRadius: 5, padding: 10, maxWidth: ["showTable", "getChart", "modifyValues", "modifyItems", "addKey"].includes(data.method) ? 1000 : 300 }}>

            <div style={{ fontWeight: "bold", textAlign: "center", marginBottom: 10 }}>{data.method}</div>

            <div style={{ marginTop: 10 }}>
                {methods[data.method].arguments.map((d, i) => {

                    if (d.type !== "sourceB") {
                        const name = <div>
                            {`${d.name}: `}
                        </div>

                        let type
                        if (d.type === "text") {
                            type = <input id={generateArgId(id, i, data.method)} onChange={() => updateNodeArgs(id)} defaultValue={d.defaultValue} style={{ width: d.width ? d.width : undefined }}></input>
                            if (d.jsOption) {
                                type = <div style={{ display: "flex", alignItems: "center" }}>
                                    {type}
                                    <div style={{ marginLeft: 4 }}>JS?</div>
                                    <input id={`${generateArgId(id, i, data.method)}-JS`} onChange={() => updateNodeArgs(id)} type="checkbox" />
                                </div>
                            }
                        } else if (d.type === "number") {
                            type = <input id={generateArgId(id, i, data.method)} onChange={() => updateNodeArgs(id)} type="number" defaultValue={d.defaultValue} style={{ width: 50 }}></input>
                        } else if (d.type === "checkbox") {
                            type = <input type={"checkbox"} id={generateArgId(id, i, data.method)} onChange={() => updateNodeArgs(id)} style={{ marginBottom: 0 }} defaultChecked={d.defaultValue}></input>
                        } else if (d.type === "keys") {
                            type = <Keys id={id} method={data.method} generateArgId={generateArgId} updateNodeArgs={updateNodeArgs} d={d} i={i} simpleData={data.sourceSimpleData} />
                        } else if (d.type === "multipleKeys") {
                            type = <MultipleKeys id={id} method={data.method} generateArgId={generateArgId} updateNodeArgs={updateNodeArgs} d={d} i={i} simpleData={data.sourceSimpleData} />

                        } else if (d.type === "select") {
                            type = <select id={generateArgId(id, i, data.method)} onChange={() => updateNodeArgs(id)} defaultValue={d.defaultValue}>
                                {d.options.map((opt, index) => <option key={`${data.method}-option-${index}`}>{opt}</option>
                                )}
                            </select>
                        } else if (d.type === "javascript") {
                            type = <JavaScriptArea id={id} method={data.method} generateArgId={generateArgId} updateNodeArgs={updateNodeArgs} d={d} i={i} />
                        }

                        return <div key={generateArgId(id, i, data.method)} style={{ display: "flex", alignItems: "center", fontSize: 12, marginTop: 5 }}>
                            {name}
                            {type}
                        </div>
                    } else {
                        return null
                    }


                })}
            </div>
            {data.method === "showTable" && data.simpleData ? <><Table keys={data.simpleData.getKeys()} data={data.simpleData.getData().slice(0, data.args.nbItemsInTable ? data.args.nbItemsInTable : 5)} /><div style={{ textAlign: "right", marginTop: 5, fontSize: 12 }}>{remainingItemsShowTable()}</div></> : null}
            {<div dangerouslySetInnerHTML={{ __html: htmlOutput }}></div>}
            {data.errorMessage ? <div style={{ maxWidth: width, color: "red", marginTop: 10 }}>{data.errorMessage}</div> : null}
        </div>
        <Handle style={{
            ...handleStyle.source, backgroundColor: success ? "green" : "#ff6666"
        }} position={Position.Bottom} id="a" />
    </div >
}
