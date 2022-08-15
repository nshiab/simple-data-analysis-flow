import React from 'react';
import ReactFlow, { Controls, Background } from 'react-flow-renderer';
import useStore from '../flow/store';
import AddNode from '../components/AddNode';
import NewSimpleData from "../components/NewSimpleData"
import SimpleDataMethod from '../components/SimpleDataMethod';

import SDA from "../node_modules/simple-data-analysis/package.json"
import SDAFlow from "../package.json"

const nodeTypes = {
  newSimpleData: NewSimpleData,
  simpleDataMethod: SimpleDataMethod,
};

export default function Flow() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore();

  return (
    <>
      <div style={{ position: "absolute", top: 0, left: 0, zIndex: 10, width: "100vw" }} >
        <div style={{ padding: 5, fontSize: 12, backgroundColor: "white" }}>Welcome on <a href="https://github.com/nshiab/simple-data-analysis-flow" >Simple Data Analysis Flow</a>! The aim of this project is to allow non-coders to use the open source library <a href="https://github.com/nshiab/simple-data-analysis.js" >simple-data-analysis.js</a> with a node-based editor running in the browser. If you use this project, show off your work and tag me on <a href="https://twitter.com/NaelShiab" >Twitter</a> or <a href="https://www.linkedin.com/in/naelshiab/" >LinkedIn</a>! Feel to start a conversation, raise an issue or contribute to the <a href="https://github.com/nshiab/simple-data-analysis-flow" >code on Github</a>. / Version {SDAFlow.version} with simple-data-analysis@{SDA.version}</div>
        <AddNode />

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
            maxZoom={2}
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
