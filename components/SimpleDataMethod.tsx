// @ts-nocheck
import React, { useCallback, useEffect, useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import Table from './Table';
import Keys from './Keys';
import MultipleKeys from './MultipleKeys';
import useStore from '../flow/store';
import methods from '../flow/methods';


const width = 200

export default function SimpleDataMethod({ id, data }) {

    const [args, setArguments] = useState({})
    const [htmlOutput, setHTMLOutput] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    const generateArgId = useCallback((id, i, method) => `node${id}method${method}Arg${i}`, [])

    const updateNodeSimpleData = useStore((state) => state.updateNodeSimpleData)

    const updateArgs = useCallback(() => {
        const args = {}


        for (let i = 0; i < methods[data.method].arguments.length; i++) {

            if (["text", "number", "keys", "select"].includes(methods[data.method].arguments[i].type)) {
                let val = document.querySelector(`#${generateArgId(id, i, data.method)}`).value

                if (methods[data.method].arguments[i].type === "number") {
                    val = parseInt(val)
                    val = isNaN(val) ? undefined : val
                }
                args[methods[data.method].arguments[i].name] = val === "" ? undefined : val

            } else if (methods[data.method].arguments[i].type === "checkbox") {
                args[methods[data.method].arguments[i].name] = document.querySelector(`#${generateArgId(id, i, data.method)}`).checked
            } else if (methods[data.method].arguments[i].type === "multipleKeys") {
                args[methods[data.method].arguments[i].name] = Array.from(document.querySelectorAll(`.${generateArgId(id, i, data.method)}`)).filter(d => d.checked).map(d => d.value)
            }

        }

        setArguments(args)

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
                        if (args[arg.name]) {
                            argsTest = true
                        } else {
                            argsTest = false
                            break
                        }
                    }
                }

                console.log(data.sourceSimpleData, data.method, args, argsTest)
                if (data.sourceSimpleData && argsTest) {
                    try {
                        const newSimpleData = methods[data.method].justClone ? data.sourceSimpleData.clone() : await data.sourceSimpleData.clone()[data.method](args)
                        updateNodeSimpleData(id, newSimpleData)

                        methods[data.method].htmlOutput ? setHTMLOutput(data.sourceSimpleData.clone()[data.method](args)) : setHTMLOutput(null)

                        setErrorMessage(null)
                    } catch (error) {
                        setErrorMessage(error.message)
                    }
                } else {
                    setHTMLOutput(null)
                    updateNodeSimpleData(id, null)
                }
            } else {
                setHTMLOutput(null)
                updateNodeSimpleData(id, null)
            }


        }

    }, [data.method, args, data.sourceSimpleData])


    return <div>
        <Handle type="target" position={Position.Top} id="a" />
        <div style={{ backgroundColor: "white", border: "1px solid black", borderRadius: 5, padding: 10, maxWidth: ["showTable", "getChart"].includes(data.method) ? 1000 : 300 }}>
            <div style={{ fontWeight: "bold", textAlign: "center", marginBottom: 10 }}>{data.method}</div>

            <div style={{ marginTop: 10 }}>
                {methods[data.method].arguments.map((d, i) => {

                    const name = <div>
                        {`${d.name}: `}
                    </div>

                    let type
                    if (d.type === "text") {
                        type = <input id={generateArgId(id, i, data.method)} onChange={() => updateArgs()} defaultValue={d.defaultValue}></input>
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
                    }

                    return <div key={generateArgId(id, i, data.method)} style={{ display: "flex", alignItems: "center", fontSize: 12, marginTop: 5 }}>
                        {name}
                        {type}
                    </div>
                })}
            </div>
            {data.method === "showTable" && data.simpleData ? <><Table keys={data.simpleData.getKeys()} data={data.simpleData.getData().slice(0, args.nbItemsInTable ? args.nbItemsInTable : 5)} /><div style={{ textAlign: "right", marginTop: 5, fontSize: 12 }}>{`${data.simpleData.getLength()} items in total (${args.nbItemsInTable ? data.simpleData.getLength() - args.nbItemsInTable : data.simpleData.getLength() - 5} hidden)`}</div></> : null}
            {<div dangerouslySetInnerHTML={{ __html: htmlOutput }}></div>}
            {errorMessage ? <div style={{ maxWidth: width, color: "red", marginTop: 10 }}>{errorMessage}</div> : null}
        </div>
        <Handle type="source" position={Position.Bottom} id="a" />
    </div >
}
