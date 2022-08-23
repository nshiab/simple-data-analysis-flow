import { useCallback, useState } from "react"
import { SimpleData } from "simple-data-analysis"
import useStore from "../flow/store"

export default function Home({ home, setHome, setName }: { home: boolean, setHome: React.Dispatch<React.SetStateAction<boolean>>, setName: React.Dispatch<React.SetStateAction<string>> }) {

    const { setNodes, setEdges, updateNodeSimpleData, setStartNodeId } = useStore()
    const [errorMessage, setErrorMessage] = useState(null)

    const readFileAsync: (file: Blob) => Promise<string> = useCallback((file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => {
                resolve(reader.result as string)
            }
            reader.onerror = reject
            reader.readAsText(file)
        })
    }, [])

    const onRestore = useCallback((flowString: string) => {
        const restoreFlow = async (flowString: string) => {
            const flow = JSON.parse(flowString);

            setName(flow.name)
            setStartNodeId(flow.startNodeId)

            if (flow) {
                setNodes(flow.nodes || []);
                setEdges(flow.edges || []);
            }

            for (let i = 0; i < flow.nodes.length; i++) {
                if (flow.nodes[i].data.category === "Importing") {
                    updateNodeSimpleData(flow.nodes[i].id, new SimpleData({ data: flow.nodes[i].data.dataSaved, fillMissingKeys: true }), null)
                }

            }
        };

        restoreFlow(flowString);
    }, [setNodes, setEdges, setName, setStartNodeId, updateNodeSimpleData]);

    return home ?
        <div>
            <h1 style={{ textAlign: "center" }}>Simple Data Analysis Flow</h1>
            <div style={{ padding: "0 10px", fontSize: 16, lineHeight: 1.4, backgroundColor: "white", maxWidth: 600, margin: "0 auto" }}>Welcome! The aim of this project is to allow non-coders to use the open source library <a href="https://github.com/nshiab/simple-data-analysis.js" >simple-data-analysis.js</a> with a node-based editor running in the browser. If you use this project, show off your work and tag me on <a href="https://twitter.com/NaelShiab" >Twitter</a> or <a href="https://www.linkedin.com/in/naelshiab/" >LinkedIn</a>! Feel to start a conversation, raise an issue or contribute to the <a href="https://github.com/nshiab/simple-data-analysis-flow" >code on Github</a>.</div>
            <button style={{ fontSize: 18, marginTop: 40, marginLeft: "auto", marginRight: "auto", display: "block" }} onClick={() => {
                setHome(false)
                setNodes([])
                setEdges([])
            }}>Start a new flow</button>
            <div style={{ width: 200, height: 200, border: "1px solid #D3D3D3", borderRadius: 5, display: "flex", alignItems: "center", margin: "30px  auto 0 auto" }} onDrop={async (evt) => {
                evt.preventDefault()

                const items = evt.dataTransfer.items

                try {
                    if (items.length > 1) {
                        throw new Error("Multiple files dropped. You can only drop one.")
                    }

                    if (items[0].type !== "application/json") {
                        throw new Error("Only JSON files are accepted.")
                    }

                    const f = items[0].getAsFile()

                    if (f) {
                        const fileContent = await readFileAsync(f)

                        onRestore(fileContent)

                        setHome(false)
                        setErrorMessage(null)
                    } else {
                        throw new Error("There's a problem with the file")
                    }

                } catch (error) {
                    //@ts-ignore
                    setErrorMessage(error.message)
                }

            }} onDragOver={(evt) => evt.preventDefault()}><div style={{ fontSize: 14, width: 150, textAlign: "center", margin: "0 auto" }}>Or drop a flow here </div></div>
            {errorMessage ? <div style={{ maxWidth: 400, color: "red", marginTop: 10, marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>{errorMessage}</div> : null}
        </div> :
        null
}