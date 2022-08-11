import React, { useCallback, useEffect, useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import Table from './Table';
import useStore from '../pages/store';
import methods from './methods';

const width = 200

export default function SimpleDataMethod({ id, data }) {

    const [method, setMethod] = useState("")
    const [args, setArguments] = useState({})
    const [htmlOutput, setHTMLOutput] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    const generateArgId = useCallback((id, i, method) => `node${id}method${method}Arg${i}`, [])

    const updateNodeSimpleData = useStore((state) => state.updateNodeSimpleData)

    const updateArgs = useCallback(() => {
        const args = {}
        if (methods[method]) {

            for (let i = 0; i < methods[method].arguments.length; i++) {

                if (["text", "keys", "select"].includes(methods[method].arguments[i].type)) {
                    const val = document.querySelector(`#${generateArgId(id, i, method)}`).value
                    args[methods[method].arguments[i].name] = val === "" ? undefined : val
                } else if (methods[method].arguments[i].type === "checkbox") {
                    args[methods[method].arguments[i].name] = document.querySelector(`#${generateArgId(id, i, method)}`).checked
                }

            }

            setArguments(args)
        } else {
            setArguments({})
        }
    }, [method])

    useEffect(() => {

        triggerMethod()

        async function triggerMethod() {

            if (!["", "Choose a method"].includes(method)) {
                let argsTest = false

                if (methods[method].arguments.filter(d => d.optional === false).length === 0) {
                    argsTest = true
                } else {
                    for (let arg of methods[method].arguments.filter(d => d.optional === false)) {
                        if (args[arg.name]) {
                            argsTest = true
                        } else {
                            argsTest = false
                            break
                        }
                    }
                }

                // console.log(data.sourceSimpleData, method, args, argsTest)
                if (data.sourceSimpleData && argsTest) {
                    try {
                        const newSimpleData = methods[method].justClone ? data.sourceSimpleData.clone() : await data.sourceSimpleData.clone()[method](args)
                        updateNodeSimpleData(id, newSimpleData)

                        methods[method].htmlOutput ? setHTMLOutput(data.sourceSimpleData.clone()[method](args)) : setHTMLOutput(null)

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

    }, [method, args, data.sourceSimpleData])


    return <div>
        <Handle type="target" position={Position.Top} id="a" />
        <div style={{ backgroundColor: "white", border: "1px solid black", borderRadius: 5, padding: 10 }}>
            <select onChange={d => {
                setMethod(d.target.value)
                setArguments({})
            }}>
                <option>Choose a method</option>
                {Object.keys(methods).map((d, i) => <option key={`method-${i}`}>{d}</option>)}
            </select>
            {methods[method] ?
                <div style={{ marginTop: 10 }}>
                    {methods[method].arguments.map((d, i) => {

                        const name = <div>
                            {`${d.name}: `}
                        </div>

                        let type
                        if (d.type === "text") {
                            type = <input id={generateArgId(id, i, method)} onChange={() => updateArgs()} defaultValue={d.defaultValue}></input>
                        } else if (d.type === "checkbox") {
                            type = <input type={"checkbox"} id={generateArgId(id, i, method)} onChange={() => updateArgs()} style={{ marginBottom: 0 }} defaultChecked={d.defaultValue}></input>
                        } else if (d.type === "keys") {
                            type = <select id={generateArgId(id, i, method)} onChange={() => updateArgs()} defaultValue={d.defaultValue}>
                                {data.sourceSimpleData ? [undefined, ...data.sourceSimpleData.getKeys()].map((opt, index) => <option key={`${method}-option-${index}`}>{opt}</option>
                                ) : null}
                            </select>
                        } else if (d.type === "select") {
                            type = <select id={generateArgId(id, i, method)} onChange={() => updateArgs()} defaultValue={d.defaultValue}>
                                {d.options.map((opt, index) => <option key={`${method}-option-${index}`}>{opt}</option>
                                )}
                            </select>
                        }

                        return <div key={generateArgId(id, i, method)} style={{ display: "flex", alignItems: "center", fontSize: 12, marginTop: 5 }}>
                            {name}
                            {type}
                        </div>
                    })}
                </div>
                : null}
            {method === "showTable" && data.simpleData ? <><Table keys={data.simpleData.getKeys()} data={data.simpleData.getData().slice(0, args.nbItemsInTable ? args.nbItemsInTable : 10)} /><div style={{ textAlign: "right", marginTop: 5, fontSize: 12 }}>{`${data.simpleData.getLength()} items in total`}</div></> : null}
            {<div dangerouslySetInnerHTML={{ __html: htmlOutput }}></div>}
            {errorMessage ? <div style={{ maxWidth: width, color: "red", marginTop: 10 }}>{errorMessage}</div> : null}
        </div>
        <Handle type="source" position={Position.Bottom} id="a" />
    </div >
}
