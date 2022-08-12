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
import { SimpleData } from 'simple-data-analysis';

type RFState = {
    nodes: Node[];
    edges: Edge[];
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    addCustomNode: (evt: any, nodeId: string) => void,
    updateNodeSimpleData: (nodeId: string, simpleData: SimpleData) => void;
};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = create<RFState>((set, get) => ({
    nodes: initialNodes,
    edges: initialEdges,
    onNodesChange: (changes: NodeChange[]) => {

        const removedNodes = changes.filter(d => d.type === "remove").map(d => d.id)

        for (let id of removedNodes) {
            get().updateNodeSimpleData(id, null)
        }

        set({
            nodes: applyNodeChanges(changes, get().nodes),
        });
    },
    onEdgesChange: (changes: EdgeChange[]) => {
        set({
            edges: applyEdgeChanges(changes, get().edges),
        });

        if (changes.length === 1 && changes[0].type === "remove") {
            const targetId = changes[0].id.split("-")[2].replace(/\D+/g, '')

            set({
                nodes: get().nodes.map((node) => {
                    if (node.id === targetId) {
                        node.data = { ...node.data, sourceSimpleData: null };
                    }
                    return node;
                }),
            });
        }

    },
    onConnect: (connection: Connection) => {

        const nodes = get().nodes
        const sourceSimpleData = nodes.find(d => d.id === connection.source)?.data.simpleData

        set({
            edges: addEdge(connection, get().edges),
            nodes: nodes.map((node) => {
                if (node.id === connection.target) {
                    node.data = { ...node.data, sourceSimpleData: sourceSimpleData ? sourceSimpleData.clone() : null };
                }
                return node;
            }),
        });
    },
    addCustomNode: (evt, nodeId: string, cat) => {
        const method = evt.target.value
        evt.target.value = cat
        const nodes = get().nodes
        const lastNode = nodes[nodes.length - 1]

        if (method === "newSimpleData") {
            set({
                nodes: [...nodes, {
                    id: nodeId,
                    type: 'newSimpleData',
                    data: { method: method, simpleData: new SimpleData() },
                    position: { x: lastNode.position.x, y: lastNode.position.y + lastNode.height + 20 }
                }]
            })
        } else {
            set({
                nodes: [...nodes, {
                    id: nodeId,
                    type: 'simpleDataMethod',
                    data: { method: method, sourceSimpleData: null, simpleData: null },
                    position: { x: lastNode.position.x, y: lastNode.position.y + lastNode.height + 20 }
                }]
            })
        }

    },
    updateNodeSimpleData: (nodeId: string, simpleData: SimpleData) => {

        const nodes = get().nodes

        const updatedNodes = nodes.map((node) => {
            if (node.id === nodeId) {
                node.data = { ...node.data, simpleData };
            }
            return node;
        })

        const nodesTarget = get().edges.filter(d => d.source === nodeId).map(d => d.target)

        updatedNodes.map((node) => {
            if (nodesTarget.includes(node.id)) {
                node.data = { ...node.data, sourceSimpleData: simpleData };
            }
            return node;
        })

        set({
            nodes: updatedNodes
        });
    }
}));

export default useStore;
