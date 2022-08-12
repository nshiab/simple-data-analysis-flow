// @ts-nocheck
export default function MultipleKeys({ id, method, generateArgId, updateArgs, d, i, simpleData }) {
    return (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
            {simpleData ?
                simpleData.getKeys().map((key, index) => <div style={{ display: "flex", alignItems: "center", border: "1px solid grey", borderRadius: 5, padding: "5px 5px", margin: 3 }} key={`${id}-${method}-arg${i}-multipleKeys${index}`}>
                    <div>{key}</div>
                    <input type={"checkbox"} className={generateArgId(id, i, method)} onChange={() => updateArgs()} style={{ marginBottom: 0 }} defaultChecked={d.defaultValue} value={key}></input>
                </div>)
                : null}
        </div>
    )
}