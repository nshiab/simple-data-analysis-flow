// @ts-nocheck
import cloneDeep from "lodash.clonedeep"
import { useRef, useState, useCallback } from "react"
import EditIcon from "@mui/icons-material/Edit"
import DownloadIcon from "@mui/icons-material/Download"
import HomeIcon from "@mui/icons-material/Home"
import useStore from "../flow/store"

export default function Header({ flowInstance, setHome, name, setName }) {
    const [editMode, setEditMode] = useState(false)

    const inputRef = useRef()

    const { startNodeId } = useStore()

    const onSave = useCallback(() => {
        if (flowInstance) {
            const flow = cloneDeep(flowInstance.toObject())

            for (let i = 0; i < flow.nodes.length; i++) {
                if (flow.nodes[i].data.category === "Importing") {
                    flow.nodes[i].data.dataSaved = flow.nodes[i].data.simpleData
                        ? flow.nodes[i].data.simpleData.getData()
                        : []
                }

                flow.nodes[i].data.simpleData = null
                flow.nodes[i].data.sourceSimpleData = null
                flow.nodes[i].data.sourceSimpleDataB = null
            }

            flow.name = name
            flow.startNodeId = startNodeId
            console.log(flow.startNodeId)

            const stringified = JSON.stringify(flow)

            const a = document.createElement("a")
            const file = new Blob([stringified], { type: "application/json" })
            a.href = URL.createObjectURL(file)
            a.download = `${name}.json`
            a.click()
        }
    }, [flowInstance, name, startNodeId])

    return (
        <div
            style={{
                backgroundColor: "white",
                paddingTop: 5,
                paddingBottom: 5,
            }}
        >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <HomeIcon
                    style={{ fontSize: 20, cursor: "pointer" }}
                    onClick={() => setHome(true)}
                />
                <div style={{ display: "flex" }}>
                    {!editMode ? (
                        <div style={{ fontWeight: "bold", fontSize: 16 }}>
                            {name}
                        </div>
                    ) : null}
                    {editMode ? (
                        <input
                            ref={inputRef}
                            style={{
                                fontWeight: "bold",
                                width: 400,
                                textAlign: "center",
                                fontSize: 16,
                            }}
                            defaultValue={name}
                            onKeyUp={(evt) => {
                                if (evt.key === "Enter") {
                                    setName(evt.target.value)
                                    setEditMode(false)
                                }
                            }}
                        ></input>
                    ) : null}
                    <EditIcon
                        style={{
                            fill: editMode ? "black" : "grey",
                            height: 18,
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            if (!editMode) {
                                setEditMode(true)
                            } else {
                                setEditMode(false)
                                setName(inputRef.current.value)
                            }
                        }}
                    />
                </div>
                <DownloadIcon
                    style={{
                        fill: editMode ? "grey" : "black",
                        height: 18,
                        cursor: "pointer",
                    }}
                    onClick={() => {
                        if (!editMode) {
                            onSave()
                        }
                    }}
                />
            </div>
        </div>
    )
}
