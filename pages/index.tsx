import React from 'react';
import ReactFlow, { Controls, Background } from 'react-flow-renderer';
import useStore from './store';
import NewSimpleData from "../components/NewSimpleData"
import SimpleDataMethod from '../components/SimpleDataMethod';

const nodeTypes = {
  newSimpleData: NewSimpleData,
  simpleDataMethod: SimpleDataMethod,
};

let nodeId = 0

export default function Flow() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addCustomNode } = useStore();

  return (
    <>
      <div style={{ position: "absolute", top: 0, left: 5, zIndex: 10 }} >
        <div style={{ padding: 5, fontSize: 12, backgroundColor: "white" }}>Welcome on the open source project <a href="https://github.com/nshiab/simple-data-analysis-flow" target="_blank">Simple Data Analysis Flow</a>! I created SDA-Flow to allow non-coders to use another open source project of mine - <a href="https://github.com/nshiab/simple-data-analysis.js" target="_blank">simple-data-analysis.js</a> - without code. If you use this project, show off your work and tag me on <a href="https://twitter.com/NaelShiab" target="_blank">Twitter</a> or <a href="https://www.linkedin.com/in/naelshiab/" target="_blank">LinkedIn</a>! Feel to start a conversation, raise an issue or contribute to the <a href="https://github.com/nshiab/simple-data-analysis-flow" target="_blank">code on Github</a>. :)</div>
        <button onClick={() => addCustomNode(`${++nodeId}`)}>Add node</button>
      </div>
      <div style={{ position: "relative" }}>

        <div style={{ width: "100vw", height: "100vh" }}>
          <ReactFlow
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
        </div>
      </div>
    </>
  );
}
