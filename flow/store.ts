import create from 'zustand';
import {
    Edge,
    Node,
    addEdge,
    OnNodesChange,
    OnEdgesChange,
    OnConnect,
    applyNodeChanges,
    applyEdgeChanges,
} from 'react-flow-renderer';

import methods, { Method, Arg } from "./methods"
import { SimpleData } from 'simple-data-analysis';
import React from 'react';

interface NodeDataArgs { [key: string]: any }

interface NodeData {
    method: string,
    category: string,
    simpleData: SimpleData | null,
    args: NodeDataArgs,
    sourceSimpleData?: SimpleData | null,
    sourceSimpleDataB?: SimpleData | null,
    manualData?: any[],
    manualDataString?: string,
    file?: { content: null | string, name: string, type: string },
    openManualData?: boolean,
    errorMessage?: string
}

interface CustomNode {
    id: string,
    type: string,
    position: { x: number, y: number },
    data: NodeData
}

type RFState = {
    logs: boolean;
    startNodeId: number;
    getNodeId: () => number;
    setStartNodeId: (number: number) => void;
    generateArgId: (id: string, i: number, method: string) => string
    nodes: Node[];
    edges: Edge[];
    setNodes: (nodes: CustomNode[]) => void;
    setEdges: (edges: Edge[]) => void;
    methods: { [key: string]: Method };
    handleStyle: {
        [key: string]: {
            width: number, height: number, bottom: number, borderRadius?: number
        }
    },
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    addCustomNode: (evt: React.ChangeEvent<HTMLButtonElement | HTMLSelectElement>, nodeId: string, cat: string) => void;
    testNodeArgs: (data: NodeData) => boolean;
    updateNodeArgs: (id: string) => void;
    updateNodeSimpleData: (nodeId: string, simpleData: SimpleData | null, errorMessage: string | null | undefined, data?: {}) => void;
    remainingItemsShowTable: (data: NodeData) => string;
};

const useStore = create<RFState>((set, get) => ({
    logs: false,
    startNodeId: 0,
    setStartNodeId: (number) => { set({ startNodeId: number }) },
    nodes: [],
    edges: [],
    setNodes: (nodes) => { set({ nodes: nodes }) },
    setEdges: (edges) => { set({ edges: edges }) },
    methods: methods,
    getNodeId: () => {
        get().logs && console.log("getNodeId")
        const newNodeId = ++get().startNodeId
        set({ startNodeId: newNodeId })
        return newNodeId
    },
    generateArgId: (id, i, method) => {
        return `node${id}method${method}Arg${i}`
    },
    handleStyle: {
        source: { height: 10, width: 10, bottom: -5 },
        target: { height: 10, width: 10, bottom: -5, borderRadius: 0 }
    },
    onNodesChange: (changes) => {
        get().logs && console.log("onNodesChange")

        //@ts-ignore
        const removedNodes = changes.filter(d => d.type === "remove").map(d => d.id)

        for (let id of removedNodes) {
            get().updateNodeSimpleData(id, null, null)
        }

        set({
            nodes: applyNodeChanges(changes, get().nodes),
        });
    },
    onEdgesChange: (changes) => {
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
    onConnect: (connection) => {

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

        get().updateNodeArgs(connection.target as string)

    },
    addCustomNode: (evt, nodeId, cat) => {
        get().logs && console.log("addCustomNode")
        const method = evt.target.value
        evt.target.value = cat
        const nodes = get().nodes
        const lastNode = nodes[nodes.length - 1]

        let newNode: CustomNode
        if (method === "newSimpleData") {
            newNode = {
                id: nodeId,
                type: 'newSimpleData',
                data: { method: method, category: "Importing", simpleData: new SimpleData(), args: {} },
                position: { x: lastNode ? lastNode.position.x : 0, y: lastNode && lastNode.height ? lastNode.position.y + lastNode.height + 20 : 0 }
            }
        } else if (method === "dropFile") {
            newNode = {
                id: nodeId,
                type: 'dropFile',
                data: { method: method, category: "Importing", simpleData: null, args: {} },
                position: { x: lastNode ? lastNode.position.x : 0, y: lastNode && lastNode.height ? lastNode.position.y + lastNode.height + 20 : 0 }
            }
        } else if (method === "loadDataFromUrl") {
            newNode = {
                id: nodeId,
                type: 'loadDataFromUrl',
                data: { method: method, category: "Importing", simpleData: null, args: {} },
                position: { x: lastNode ? lastNode.position.x : 0, y: lastNode && lastNode.height ? lastNode.position.y + lastNode.height + 20 : 0 }
            }
        } else {
            newNode = {
                id: nodeId,
                type: 'simpleDataMethod',
                data: { method: method, category: cat, sourceSimpleData: null, sourceSimpleDataB: null, simpleData: null, args: {} },
                position: { x: lastNode ? lastNode.position.x : 0, y: lastNode && lastNode.height ? lastNode.position.y + lastNode.height + 20 : 0 }
            }
        }


        for (let arg of methods[method].arguments) {
            newNode.data.args[arg.name] = ""
        }

        set({
            nodes: [...nodes, newNode]
        })


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

        //@ts-ignore
        const { method, sourceSimpleDataB } = nodes.find(d => d.id === id).data

        const args: { [key: string]: string | number | boolean | undefined | string[] } = {}
        let errorMessage: string | null = null

        const methods = get().methods

        for (let i = 0; i < methods[method].arguments.length; i++) {

            if (["text", "number", "keys", "select"].includes(methods[method].arguments[i].type)) {
                const el: HTMLInputElement | null = document.querySelector(`#${get().generateArgId(id, i, method)}`)

                if (el) {

                    let val = el.value

                    if (methods[method].arguments[i].jsOption) {
                        const elOption: HTMLInputElement | null = document.querySelector(`#${get().generateArgId(id, i, method)}JS`)
                        if (elOption && elOption.checked) {
                            const optionId = get().generateArgId(id, i, method)
                            args[`${optionId}JS`] = true
                            val = Function(`return ${val}`)()
                        }

                    }

                    if (methods[method].arguments[i].type === "number") {
                        let valNumber = parseInt(val)

                        args[methods[method].arguments[i].name] = isNaN(valNumber) ? undefined : valNumber
                    } else {
                        args[methods[method].arguments[i].name] = val === "" ? undefined : val
                    }

                }

            } else if (methods[method].arguments[i].type === "javascript") {

                const el: HTMLInputElement | null = document.querySelector(`#${get().generateArgId(id, i, method)}`)

                if (el) {
                    try {
                        const fVal = Function(`return ${el.value}`)()

                        args[methods[method].arguments[i].name] = fVal
                    } catch (error: any) {
                        errorMessage = error.message
                    }

                }

            } else if (methods[method].arguments[i].type === "checkbox") {
                const el: HTMLInputElement | null = document.querySelector(`#${get().generateArgId(id, i, method)}`)
                if (el) {
                    args[methods[method].arguments[i].name] = el.checked
                }

            } else if (["multipleKeys", "multipleBoxes"].includes(methods[method].arguments[i].type)) {

                const els = document.querySelectorAll(`.${get().generateArgId(id, i, method)}`)
                if (els.length > 0) {
                    const values = Array.from(document.querySelectorAll(`.${get().generateArgId(id, i, method)}`) as unknown as HTMLInputElement[]).filter(d => d.checked).map(d => d.value)
                    args[methods[method].arguments[i].name] = values.length > 0 ? values : undefined
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
    updateNodeSimpleData: (nodeId, simpleData, errorMessage, data?) => {

        get().logs && console.log("updateNodeSimpleData")

        const nodes = get().nodes

        const updatedNodes = nodes.map((node) => {
            if (node.id === nodeId) {
                node.data = { ...node.data, simpleData, errorMessage, ...data };
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
        const nbItems = data.simpleData ? data.simpleData.getLength() : 0
        const nbItemsInTable = data.args.nbItemsInTable ? data.args.nbItemsInTable : 5
        const reminingItems = nbItems - nbItemsInTable

        return `${nbItems} items in total${reminingItems > 0 ? ` (${reminingItems} hidden)` : ""}`
    }
}));

export default useStore;
export type { NodeData, NodeDataArgs }