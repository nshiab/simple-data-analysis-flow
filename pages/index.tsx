import React, { useMemo, useState } from "react"
import ReactFlow, { Controls, Background } from "react-flow-renderer"
import useStore from "../flow/store"
import AddNode from "../components/AddNode"
import NewSimpleData from "../components/nodes/NewSimpleData"
import SimpleDataMethod from "../components/nodes/SimpleDataMethod"

import DropFile from "../components/nodes/DropFile"
import LoadDataFromUrl from "../components/nodes/LoadDataFromUrl"
import Header from "../components/Header"
import Home from "../components/Home"
import Version from "../components/Version"

export default function Flow() {
    const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore()

    const nodeTypes = useMemo(
        () => ({
            newSimpleData: NewSimpleData,
            simpleDataMethod: SimpleDataMethod,
            dropFile: DropFile,
            loadDataFromUrl: LoadDataFromUrl,
        }),
        []
    )

    const [flowInstance, setFlowInstance] = useState<any>(null)
    const [home, setHome] = useState<boolean>(true)
    const [name, setName] = useState<string>("New SDA-Flow")

    return (
        <>
            <Home home={home} setHome={setHome} setName={setName} />
            {!home && nodes && edges ? (
                <div>
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            margin: "0 auto",
                            zIndex: 5,
                            width: "100%",
                            maxWidth: 800,
                        }}
                    >
                        <Header
                            flowInstance={flowInstance}
                            setHome={setHome}
                            name={name}
                            setName={setName}
                        />
                        <AddNode />
                    </div>
                    <div style={{ position: "relative" }}>
                        <div style={{ width: "100vw", height: "100vh" }}>
                            <ReactFlow
                                //@ts-ignore
                                onInit={setFlowInstance}
                                nodeTypes={nodeTypes}
                                nodes={nodes}
                                edges={edges}
                                onNodesChange={onNodesChange}
                                onEdgesChange={onEdgesChange}
                                onConnect={onConnect}
                                fitView
                            >
                                <Controls />
                                <Background />
                            </ReactFlow>
                            <Version />
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    )
}
