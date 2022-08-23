import { useState, useEffect } from "react"
import { Handle, Position } from "react-flow-renderer"
import { SimpleData } from "simple-data-analysis"
import useStore, { NodeData } from "../../flow/store"
import Arguments from "../Arguments"

export default function LoadDataFromUrl({
    id,
    data,
}: {
    id: string
    data: NodeData
}) {
    const { updateNodeSimpleData, testNodeArgs, handleStyle } = useStore()

    const [success, setSucces] = useState(false)

    useEffect(() => {
        trigger()

        async function trigger() {
            try {
                const argsTest = testNodeArgs(data.method, data.args)

                if (argsTest && !data.errorMessage) {
                    const simpleData = await new SimpleData().loadDataFromUrl(
                        //@ts-ignore
                        data.args
                    )
                    updateNodeSimpleData(id, simpleData, null)
                    setSucces(true)
                }
            } catch (error) {
                //@ts-ignore
                updateNodeSimpleData(id, data.simpleData, error.message)
                setSucces(false)
            }
        }
    }, [
        data.args,
        data.errorMessage,
        updateNodeSimpleData,
        testNodeArgs,
        id,
        data.method,
    ])

    return (
        <div
            style={{
                backgroundColor: "white",
                border: "1px solid black",
                borderRadius: 5,
                padding: 10,
                maxWidth: 300,
            }}
        >
            <div
                style={{
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: 10,
                }}
            >
                loadDataFromUrl
            </div>
            <Arguments id={id} data={data} />
            {data.errorMessage ? (
                <div style={{ width: "100%", color: "red", marginTop: 10 }}>
                    {data.errorMessage}
                </div>
            ) : null}
            <Handle
                type="source"
                position={Position.Bottom}
                id="a"
                style={{
                    ...handleStyle.source,
                    backgroundColor: success ? "green" : "#ff6666",
                }}
            />
        </div>
    )
}
