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

    const [htmlOutput, setHTMLOutput] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    const remainingItemsShowTable = useCallback(() => {

        const nbItems = data.simpleData.getLength()
        const nbItemsInTable = data.args.nbItemsInTable ? data.args.nbItemsInTable : 5
        const reminingItems = nbItems - nbItemsInTable

        return `${nbItems} items in total${reminingItems > 0 ? ` (${reminingItems} hidden)` : ""}`

    }, [data.simpleData, data.args])

    const generateArgId = useCallback((id, i, method) => `node${id}method${method}Arg${i}`, [])

    const { updateNodeSimpleData, updateNodeArgs, handleStyle } = useStore()

    const updateArgs = useCallback(() => {
        const args = {}

        for (let i = 0; i < methods[data.method].arguments.length; i++) {

            if (["text", "number", "keys", "select"].includes(methods[data.method].arguments[i].type)) {
                let val = document.querySelector(`#${generateArgId(id, i, data.method)}`).value

                if (methods[data.method].arguments[i].jsOption) {
                    if (document.querySelector(`#${generateArgId(id, i, data.method)}-JS`).checked) {
                        val = Function(`return ${val}`)()
                    }

                }

                if (methods[data.method].arguments[i].type === "number") {
                    val = parseInt(val)
                    val = isNaN(val) ? undefined : val
                }
                args[methods[data.method].arguments[i].name] = val === "" ? undefined : val

            } else if (methods[data.method].arguments[i].type === "javascript") {

                let val = document.querySelector(`#${generateArgId(id, i, data.method)}`).value

                try {
                    val = Function(`return ${val}`)()

                    args[methods[data.method].arguments[i].name] = val
                } catch (error) {
                    setErrorMessage(error.message)
                }


            } else if (methods[data.method].arguments[i].type === "checkbox") {
                args[methods[data.method].arguments[i].name] = document.querySelector(`#${generateArgId(id, i, data.method)}`).checked
            } else if (methods[data.method].arguments[i].type === "multipleKeys") {
                args[methods[data.method].arguments[i].name] = Array.from(document.querySelectorAll(`.${generateArgId(id, i, data.method)}`)).filter(d => d.checked).map(d => d.value)
            }

        }

        updateNodeArgs(id, args)

    }, [data.method])

    useEffect(() => {

        triggerMethod()

        async function triggerMethod() {

            if (!["", "Choose a method"].includes(data.method)) {
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

                // console.log(data.sourceSimpleData, data.method, args, argsTest)
                if (data.sourceSimpleData && argsTest) {
                    try {

                        const newSimpleData = methods[data.method].justClone ? data.sourceSimpleData.clone() : await data.sourceSimpleData.clone()[data.method](data.args)

                        console.log("triggered", data.method)
                        updateNodeSimpleData(id, newSimpleData)

                        methods[data.method].htmlOutput ? setHTMLOutput(data.sourceSimpleData.clone()[data.method](data.args)) : setHTMLOutput(null)

                        setErrorMessage(null)
                    } catch (error) {
                        setErrorMessage(error.message)
                    }
                } else {
                    setHTMLOutput(null)
                    updateNodeSimpleData(id, null, {})
                }
            } else {
                setHTMLOutput(null)
                updateNodeSimpleData(id, null)
            }


        }

    }, [data.method, data.sourceSimpleData, data.args])


    return <div>
        <Handle type="target" position={Position.Top} id="a" style={handleStyle.target} />
        <div style={{ backgroundColor: "white", border: "1px solid black", borderRadius: 5, padding: 10, maxWidth: ["showTable", "getChart", "modifyValues", "modifyItems"].includes(data.method) ? 1000 : 300 }}>
            <div style={{ fontWeight: "bold", textAlign: "center", marginBottom: 10 }}>{data.method}</div>

            <div style={{ marginTop: 10 }}>
                {methods[data.method].arguments.map((d, i) => {

                    const name = <div>
                        {`${d.name}: `}
                    </div>

                    let type
                    if (d.type === "text") {
                        type = <input id={generateArgId(id, i, data.method)} onChange={() => updateArgs()} defaultValue={d.defaultValue} style={{ width: d.width ? d.width : undefined }}></input>
                        if (d.jsOption) {
                            type = <div style={{ display: "flex", alignItems: "center" }}>
                                {type}
                                <div style={{ marginLeft: 4 }}>JS?</div>
                                <input id={`${generateArgId(id, i, data.method)}-JS`} onChange={() => updateArgs()} type="checkbox" />
                            </div>
                        }
                    } else if (d.type === "number") {
                        type = <input id={generateArgId(id, i, data.method)} onChange={() => updateArgs()} type="number" defaultValue={d.defaultValue} style={{ width: 50 }}></input>
                    } else if (d.type === "checkbox") {
                        type = <input type={"checkbox"} id={generateArgId(id, i, data.method)} onChange={() => updateArgs()} style={{ marginBottom: 0 }} defaultChecked={d.defaultValue}></input>
                    } else if (d.type === "keys") {
                        type = <Keys id={id} method={data.method} generateArgId={generateArgId} updateArgs={updateArgs} d={d} i={i} simpleData={data.sourceSimpleData} />
                    } else if (d.type === "multipleKeys") {
                        type = <MultipleKeys id={id} method={data.method} generateArgId={generateArgId} updateArgs={updateArgs} d={d} i={i} simpleData={data.sourceSimpleData} />

                    } else if (d.type === "select") {
                        type = <select id={generateArgId(id, i, data.method)} onChange={() => updateArgs()} defaultValue={d.defaultValue}>
                            {d.options.map((opt, index) => <option key={`${data.method}-option-${index}`}>{opt}</option>
                            )}
                        </select>
                    } else if (d.type === "javascript") {
                        type = <JavaScriptArea id={id} method={data.method} generateArgId={generateArgId} updateArgs={updateArgs} d={d} i={i} />
                    }

                    return <div key={generateArgId(id, i, data.method)} style={{ display: "flex", alignItems: "center", fontSize: 12, marginTop: 5 }}>
                        {name}
                        {type}
                    </div>
                })}
            </div>
            {data.method === "showTable" && data.simpleData ? <><Table keys={data.simpleData.getKeys()} data={data.simpleData.getData().slice(0, data.args.nbItemsInTable ? data.args.nbItemsInTable : 5)} /><div style={{ textAlign: "right", marginTop: 5, fontSize: 12 }}>{remainingItemsShowTable()}</div></> : null}
            {<div dangerouslySetInnerHTML={{ __html: htmlOutput }}></div>}
            {errorMessage ? <div style={{ maxWidth: width, color: "red", marginTop: 10 }}>{errorMessage}</div> : null}
        </div>
        <Handle style={handleStyle.source} position={Position.Bottom} id="a" />
    </div >
}
