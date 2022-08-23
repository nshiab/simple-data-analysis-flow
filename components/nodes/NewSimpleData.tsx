import { useState, useRef, useEffect } from "react"
import { Handle, Position } from "react-flow-renderer"
import { SimpleData } from "simple-data-analysis"
import useStore, { NodeData } from "../../flow/store"

export default function NewSimpleData({
    id,
    data,
}: {
    id: string
    data: NodeData
}) {
    const [success, setSucces] = useState(true)

    const inputRef = useRef<HTMLTextAreaElement>(null)

    const { updateNodeSimpleData, handleStyle } = useStore()

    useEffect(() => {
        if (!data.errorMessage) {
            try {
                updateNodeSimpleData(
                    id,
                    new SimpleData({ data: data.manualData }),
                    null,
                    {}
                )
                setSucces(true)
            } catch (error) {
                //@ts-ignore
                updateNodeSimpleData(id, null, error.message)
            }
        }
    }, [data.manualData, data.errorMessage, id, updateNodeSimpleData])

    return (
        <div
            style={{
                backgroundColor: "white",
                border: "1px solid black",
                borderRadius: 5,
                padding: 10,
                width: 250,
            }}
        >
            <div
                style={{
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: 10,
                }}
            >
                New SimpleData
            </div>
            <button
                style={{
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                }}
                onClick={() =>
                    updateNodeSimpleData(
                        id,
                        data.simpleData,
                        data.errorMessage,
                        {
                            openManualData: data.openManualData
                                ? !data.openManualData
                                : true,
                        }
                    )
                }
            >
                Add data manually
            </button>
            {data.openManualData ? (
                <div
                    style={{
                        marginTop: 10,
                    }}
                >
                    <textarea
                        rows={10}
                        ref={inputRef}
                        style={{
                            width: "95%",
                            resize: "none",
                            margin: "0 auto",
                        }}
                        placeholder="Paste a JSON array of objects"
                        onChange={() => {
                            try {
                                const value =
                                    inputRef && inputRef.current
                                        ? inputRef.current.value
                                        : null
                                updateNodeSimpleData(id, null, null, {
                                    manualData:
                                        value === "" || value === null
                                            ? []
                                            : JSON.parse(value),
                                    manualDataString: value,
                                })
                            } catch (error) {
                                updateNodeSimpleData(
                                    id,
                                    null,
                                    //@ts-ignore
                                    error.message,
                                    {}
                                )
                                setSucces(false)
                            }
                        }}
                        defaultValue={data.manualDataString}
                    ></textarea>
                </div>
            ) : null}
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
