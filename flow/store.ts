// @ts-nocheck
import create from 'zustand';
import {
    Connection,
    Edge,
    EdgeChange,
    Node,
    NodeChange,
    addEdge,
    OnNodesChange,
    OnEdgesChange,
    OnConnect,
    applyNodeChanges,
    applyEdgeChanges,
} from 'react-flow-renderer';

import initialNodes from './nodes';
import initialEdges from './edges';
import methods from "./methods"
import { SimpleData } from 'simple-data-analysis';

type RFState = {
    nodeId: number;
    getNodeId: () => number,
    nodes: Node[];
    edges: Edge[];
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    addCustomNode: (evt: any, nodeId: string) => void,
    updateNodeSimpleData: (nodeId: string, simpleData: SimpleData) => void;
};

const useStore = create<RFState>((set, get) => ({
    logs: false,
    nodeId: 0,
    nodes: initialNodes,
    edges: initialEdges,
    methods: methods,
    getNodeId: () => {
        get().logs && console.log("getNodeId")
        const newNodeId = ++get().nodeId
        set({ nodeId: newNodeId })
        return newNodeId
    },
    generateArgId: (id, i, method) => {
        return `node${id}method${method}Arg${i}`
    },
    handleStyle: {
        source: { height: 10, width: 10, bottom: -5 },
        target: { height: 10, width: 10, bottom: -5, borderRadius: "0" }
    },
    onNodesChange: (changes: NodeChange[]) => {
        get().logs && console.log("onNodesChange")
        const removedNodes = changes.filter(d => d.type === "remove").map(d => d.id)

        for (let id of removedNodes) {
            get().updateNodeSimpleData(id, null, null)
        }

        set({
            nodes: applyNodeChanges(changes, get().nodes),
        });
    },
    onEdgesChange: (changes: EdgeChange[]) => {
        get().logs && console.log("onEdgesChange")
        set({
            edges: applyEdgeChanges(changes, get().edges),
        });

        if (changes.length === 1 && changes[0].type === "remove") {
            const target = changes[0].id.split("-")
            const targetId = target[2].replace("a", "").replace("b", "")
            const targetHandle = target[2][target[2].length - 1]

            set({
                nodes: get().nodes.map((node) => {
                    if (node.id === targetId) {
                        if (targetHandle === "a") {
                            node.data = { ...node.data, sourceSimpleData: null };
                        } else if (targetHandle === "b") {
                            node.data = { ...node.data, sourceSimpleDataB: null };
                        }
                    }
                    return node;
                }),
            });

            get().updateNodeArgs(targetId)
        }

    },
    onConnect: (connection: Connection) => {

        get().logs && console.log("onConnect")

        const nodes = get().nodes
        const sourceSimpleData = nodes.find(d => d.id === connection.source)?.data.simpleData

        const newEdge = addEdge(connection, [])[0]
        newEdge.style = { strokeWidth: 5 }

        const edges = get().edges
        const edgesToRemove = edges.filter(d => {
            const conditions = (d.source !== newEdge.source || d.target !== newEdge.target) && (d.target !== newEdge.target || d.targetHandle !== newEdge.targetHandle)
            return !conditions
        })
        const edgesIdsToRemove = edgesToRemove.map(d => d.id)

        const updatedEdges = [
            ...edges.filter(d => !edgesIdsToRemove.includes(d.id)),
            newEdge
        ]

        const targetIdsToDeconnect = edgesToRemove.map(d => d.target)

        set({
            edges: updatedEdges,
            nodes: nodes.map((node) => {

                const index = targetIdsToDeconnect.indexOf(node.id)

                if (index > -1) {

                    const ed = edgesToRemove.filter(d => node.id === d.target)

                    for (let e of ed) {
                        if (e.targetHandle === "a") {
                            node.data = { ...node.data, sourceSimpleData: null }
                        } else if (e.targetHandle === "b") {
                            node.data = { ...node.data, sourceSimpleDataB: null }
                        }
                    }


                }
                if (node.id === connection.target) {
                    if (connection.targetHandle === "a") {
                        node.data = { ...node.data, sourceSimpleData: sourceSimpleData ? sourceSimpleData.clone() : null };
                    } else if (connection.targetHandle === "b") {
                        node.data = { ...node.data, sourceSimpleDataB: sourceSimpleData ? sourceSimpleData.clone() : null };
                    }
                }
                return node;
            }),
        });

        get().updateNodeArgs(connection.target)

    },
    addCustomNode: (evt, nodeId: string, cat) => {
        get().logs && console.log("addCustomNode")
        const method = evt.target.value
        evt.target.value = cat
        const nodes = get().nodes
        const lastNode = nodes[nodes.length - 1]

        if (method === "newSimpleData") {
            set({
                nodes: [...nodes, {
                    id: nodeId,
                    type: 'newSimpleData',
                    data: { method: method, simpleData: new SimpleData(), args: {} },
                    position: { x: lastNode ? lastNode.position.x : 0, y: lastNode ? lastNode.position.y + lastNode.height + 20 : 0 }
                }]
            })
        } else if (method === "dropFile") {
            set({
                nodes: [...nodes, {
                    id: nodeId,
                    type: 'dropFile',
                    data: { method: method, simpleData: null, args: {} },
                    position: { x: lastNode ? lastNode.position.x : 0, y: lastNode ? lastNode.position.y + lastNode.height + 20 : 0 }
                }]
            })
        } else if (method === "loadDataFromUrl") {
            set({
                nodes: [...nodes, {
                    id: nodeId,
                    type: 'loadDataFromUrl',
                    data: { method: method, simpleData: null, args: {} },
                    position: { x: lastNode ? lastNode.position.x : 0, y: lastNode ? lastNode.position.y + lastNode.height + 20 : 0 }
                }]
            })
        } else {
            set({
                nodes: [...nodes, {
                    id: nodeId,
                    type: 'simpleDataMethod',
                    data: { method: method, sourceSimpleData: null, sourceSimpleDataB: null, simpleData: null, args: {} },
                    position: { x: lastNode ? lastNode.position.x : 0, y: lastNode ? lastNode.position.y + lastNode.height + 20 : 0 }
                }]
            })
        }

    },
    testNodeArgs: (data) => {

        const methods = get().methods

        let argsTest = false

        if (methods[data.method].arguments.filter(d => d.optional === false).length === 0) {
            argsTest = true
        } else {

            for (let arg of methods[data.method].arguments.filter(d => d.optional === false)) {
                if (data.args[arg.name]) {
                    argsTest = true
                } else {
                    argsTest = false
                    break
                }
            }
        }

        return argsTest
    },
    updateNodeArgs: (id) => {

        get().logs && console.log("updateNodeArgs")

        const nodes = get().nodes
        const { method, sourceSimpleDataB } = nodes.find(d => d.id === id).data

        const args = {}
        let errorMessage = null

        const methods = get().methods

        for (let i = 0; i < methods[method].arguments.length; i++) {

            if (["text", "number", "keys", "select"].includes(methods[method].arguments[i].type)) {
                const el = document.querySelector(`#${get().generateArgId(id, i, method)}`)

                if (el) {

                    let val = el.value

                    if (methods[method].arguments[i].jsOption) {
                        if (document.querySelector(`#${get().generateArgId(id, i, method)}-JS`).checked) {
                            val = Function(`return ${val}`)()
                        }

                    }

                    if (methods[method].arguments[i].type === "number") {
                        val = parseInt(val)
                        val = isNaN(val) ? undefined : val
                    }

                    args[methods[method].arguments[i].name] = val === "" ? undefined : val

                }

            } else if (methods[method].arguments[i].type === "javascript") {

                let val = document.querySelector(`#${get().generateArgId(id, i, method)}`).value

                try {
                    val = Function(`return ${val}`)()

                    args[methods[method].arguments[i].name] = val
                } catch (error) {
                    errorMessage = error.message
                }


            } else if (methods[method].arguments[i].type === "checkbox") {
                args[methods[method].arguments[i].name] = document.querySelector(`#${get().generateArgId(id, i, method)}`).checked
            } else if (["multipleKeys", "multipleBoxes"].includes(methods[method].arguments[i].type)) {

                const els = document.querySelectorAll(`.${get().generateArgId(id, i, method)}`)
                if (els.length > 0) {
                    args[methods[method].arguments[i].name] = Array.from(document.querySelectorAll(`.${get().generateArgId(id, i, method)}`)).filter(d => d.checked).map(d => d.value)
                }

            } else if (methods[method].arguments[i].type === "sourceB") {
                args[methods[method].arguments[i].name] = sourceSimpleDataB
            }

        }

        const updatedNodes = nodes.map((node) => {
            if (node.id === id) {
                node.data = { ...node.data, args, errorMessage };
            }
            return node;
        })
        set({
            nodes: updatedNodes
        });
    },
    updateNodeSimpleData: (nodeId: string, simpleData: SimpleData, errorMessage) => {

        get().logs && console.log("updateNodeSimpleData")

        const nodes = get().nodes

        const updatedNodes = nodes.map((node) => {
            if (node.id === nodeId) {
                node.data = { ...node.data, simpleData, errorMessage };
            }
            return node;
        })


        const nodesTarget = get().edges.filter(d => d.source === nodeId)

        const ids = nodesTarget.map(d => d.target)
        const handles = nodesTarget.map(d => d.targetHandle)

        updatedNodes.map((node) => {
            const index = ids.indexOf(node.id)
            if (index > -1) {
                if (handles[index] === "a") {
                    node.data = { ...node.data, sourceSimpleData: simpleData };
                } else if (handles[index] === "b") {
                    node.data = { ...node.data, sourceSimpleDataB: simpleData };
                }
            }
            return node;
        })

        set({
            nodes: updatedNodes
        });

        for (let id of ids) {
            get().updateNodeArgs(id)
        }
    },
    remainingItemsShowTable: (data) => {
        const nbItems = data.simpleData.getLength()
        const nbItemsInTable = data.args.nbItemsInTable ? data.args.nbItemsInTable : 5
        const reminingItems = nbItems - nbItemsInTable

        return `${nbItems} items in total${reminingItems > 0 ? ` (${reminingItems} hidden)` : ""}`
    }
}));

export default useStore;
