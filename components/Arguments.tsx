import Keys from "./args/Keys"
import MultipleKeys from "./args/MultipleKeys"
import MultipleBoxes from "./args/MultipleBoxes"
import JavaScriptArea from "./args/JavaScriptArea"
import useStore, { NodeData } from "../flow/store"
import TextInput from "./args/TextInput"
import NumberInput from "./args/NumberInput"
import Checkbox from "./args/Checkbox"
import Select from "./args/Select"

export default function Arguments({
    id,
    data,
}: {
    id: string
    data: NodeData
}) {
    const { methods, generateArgId } = useStore()

    return (
        <div
            style={{
                marginTop: methods[data.method].arguments.length > 0 ? 10 : 0,
                display: "flex",
                flexWrap: "wrap",
                width: "100%",
            }}
        >
            {methods[data.method].arguments.map((d, i) => {
                let testCondition = true
                if (d.condition) {
                    const index = methods[data.method].arguments.indexOf(
                        //@ts-ignore
                        methods[data.method].arguments.find(
                            //@ts-ignore
                            (arg) => arg.name === d.condition.name
                        )
                    )
                    const conditionElement: HTMLInputElement | null =
                        document.querySelector(
                            `#${generateArgId(id, index, data.method)}`
                        )
                    testCondition = conditionElement
                        ? conditionElement.value === d.condition.value
                        : false
                }

                if (d.type !== "sourceB" && testCondition) {
                    const name = <div>{`${d.name}: `}</div>

                    let type
                    if (d.type === "text") {
                        type = (
                            <TextInput
                                id={id}
                                i={i}
                                method={data.method}
                                d={d}
                                args={data.args}
                            />
                        )
                    } else if (d.type === "number") {
                        type = (
                            <NumberInput
                                id={id}
                                i={i}
                                method={data.method}
                                d={d}
                                args={data.args}
                            />
                        )
                    } else if (d.type === "checkbox") {
                        type = (
                            <Checkbox
                                id={id}
                                i={i}
                                method={data.method}
                                d={d}
                                args={data.args}
                            />
                        )
                    } else if (d.type === "keys") {
                        type = (
                            <Keys
                                id={id}
                                method={data.method}
                                d={d}
                                i={i}
                                sourceSimpleData={data.sourceSimpleData}
                                args={data.args}
                            />
                        )
                    } else if (d.type === "multipleKeys") {
                        type = (
                            <MultipleKeys
                                id={id}
                                method={data.method}
                                d={d}
                                i={i}
                                sourceSimpleData={data.sourceSimpleData}
                                args={data.args}
                            />
                        )
                    } else if (d.type === "multipleBoxes") {
                        type = (
                            <MultipleBoxes
                                id={id}
                                method={data.method}
                                d={d}
                                i={i}
                                args={data.args}
                            />
                        )
                    } else if (d.type === "select") {
                        type = (
                            <Select
                                id={id}
                                i={i}
                                method={data.method}
                                d={d}
                                args={data.args}
                            />
                        )
                    } else if (d.type === "javascript") {
                        type = (
                            <JavaScriptArea
                                id={id}
                                method={data.method}
                                d={d}
                                i={i}
                                args={data.args}
                            />
                        )
                    }

                    return (
                        <div
                            key={generateArgId(id, i, data.method)}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                fontSize: 12,
                                borderRight: "1px solid gray",
                                padding: "0 10px",
                                margin: "5px 0",
                            }}
                        >
                            {name}
                            {type}
                        </div>
                    )
                } else {
                    return null
                }
            })}
        </div>
    )
}
