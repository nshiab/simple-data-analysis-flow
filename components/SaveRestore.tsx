// @ts-nocheck
import { useCallback } from "react";
import useStore from "../flow/store";
import { SimpleData } from "simple-data-analysis";

export default function ({ flowInstance }) {

    const { setNodes, setEdges, updateNodeSimpleData } = useStore()

    const onSave = useCallback(() => {
        if (flowInstance) {
            const flow = flowInstance.toObject();

            for (let i = 0; i < flow.nodes.length; i++) {
                if (flow.nodes[i].category === "Importing") {
                    flow.nodes[i].data.dataSaved = flow.nodes[i].data.simpleData ? flow.nodes[i].data.simpleData.getData() : []
                }

                flow.nodes[i].data.simpleData = null

            }

            localStorage.setItem("SDA-Flow", JSON.stringify(flow));
        }
    }, [flowInstance]);

    const onRestore = useCallback(() => {
        const restoreFlow = async () => {
            const flow = JSON.parse(localStorage.getItem("SDA-Flow"));

            for (let i = 0; i < flow.nodes.length; i++) {
                if (flow.nodes[i].category === "Importing") {
                    updateNodeSimpleData(flow.nodes[i].id, new SimpleData({ data: flow.nodes[i].data.dataSaved, fillMissingKeys: true }), null)
                }

            }

            if (flow) {
                setNodes(flow.nodes || []);
                setEdges(flow.edges || []);
            }
        };

        restoreFlow();
    }, [setNodes, setEdges]);

    return <div style={{ position: "absolute", right: 10, zIndex: 5 }}>
        <button onClick={onSave}>save</button>
        <button onClick={onRestore}>restore</button>
    </div>
}