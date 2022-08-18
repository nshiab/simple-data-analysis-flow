// @ts-nocheck
import Keys from './Keys';
import MultipleKeys from './MultipleKeys';
import MultipleBoxes from './MultipleBoxes';
import JavaScriptArea from './JavaScriptArea';
import useStore from "../flow/store"

export default function Arguments({ id, data }) {

    const { methods, generateArgId, updateNodeArgs } = useStore()

    return <div style={{ marginTop: methods[data.method].arguments.length > 0 ? 10 : 0, display: "flex", flexWrap: "wrap", width: "100%" }}>
        {methods[data.method].arguments.map((d, i) => {

            let testCondition = true
            if (d.condition) {
                const index = methods[data.method].arguments.indexOf(methods[data.method].arguments.find(arg => arg.name === d.condition.name))
                const conditionElement = document.querySelector(`#${generateArgId(id, index, data.method)}`)
                testCondition = conditionElement ? conditionElement.value === d.condition.value : null

            }

            if (d.type !== "sourceB" && testCondition) {
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

                } else if (d.type === "multipleBoxes") {
                    type = <MultipleBoxes id={id} method={data.method} generateArgId={generateArgId} updateNodeArgs={updateNodeArgs} d={d} i={i} />
                } else if (d.type === "select") {
                    type = <select id={generateArgId(id, i, data.method)} onChange={() => updateNodeArgs(id)} defaultValue={d.defaultValue}>
                        {d.options.map((opt, index) => <option key={`${data.method}-option-${index}`}>{opt}</option>
                        )}
                    </select>
                } else if (d.type === "javascript") {
                    type = <JavaScriptArea id={id} method={data.method} generateArgId={generateArgId} updateNodeArgs={updateNodeArgs} d={d} i={i} />
                }

                return <div key={generateArgId(id, i, data.method)} style={{ display: "flex", alignItems: "center", fontSize: 12, borderRight: "1px solid gray", padding: "0 10px", margin: "5px 0" }}>
                    {name}
                    {type}
                </div>
            } else {
                return null
            }
        })}
    </div>
}