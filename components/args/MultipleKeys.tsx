import { useEffect, useState } from "react"
import { SimpleData } from "simple-data-analysis"
import { Arg } from "../../flow/methods"
import useStore, { NodeDataArgs } from "../../flow/store"

export default function MultipleKeys({
    id,
    method,
    d,
    i,
    sourceSimpleData,
    args,
}: {
    id: string
    method: string
    d: Arg
    i: number
    sourceSimpleData: SimpleData | null | undefined
    args: NodeDataArgs
}) {
    const { generateArgId, updateNodeArgs } = useStore()

    return (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
            {sourceSimpleData
                ? sourceSimpleData.getKeys().map((key, index) => (
                      <div
                          style={{
                              display: "flex",
                              alignItems: "center",
                              border: "1px solid grey",
                              borderRadius: 5,
                              padding: "5px 5px",
                              margin: 3,
                          }}
                          key={`${id}-${method}-arg${i}-multipleKeys${index}`}
                      >
                          <div>{key}</div>
                          <input
                              type={"checkbox"}
                              className={generateArgId(id, i, method)}
                              onChange={() => updateNodeArgs(id)}
                              style={{ marginBottom: 0 }}
                              value={key}
                              checked={
                                  args[d.name]
                                      ? args[d.name].includes(key)
                                      : false
                              }
                          ></input>
                      </div>
                  ))
                : args[d.name]
                ? args[d.name].map((key: string, index: number) => (
                      <div
                          style={{
                              display: "flex",
                              alignItems: "center",
                              border: "1px solid grey",
                              borderRadius: 5,
                              padding: "5px 5px",
                              margin: 3,
                          }}
                          key={`${id}-${method}-arg${i}-multipleKeys${index}`}
                      >
                          <div>{key}</div>
                          <input
                              type={"checkbox"}
                              className={generateArgId(id, i, method)}
                              onChange={() => updateNodeArgs(id)}
                              style={{ marginBottom: 0 }}
                              value={key}
                              checked={
                                  args[d.name]
                                      ? args[d.name].includes(key)
                                      : false
                              }
                          ></input>
                      </div>
                  ))
                : null}
        </div>
    )
}
