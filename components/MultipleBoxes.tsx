// @ts-nocheck
export default function MultipleBoxes({ id, method, generateArgId, updateNodeArgs, d, i }) {
    return (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
            {d.options.map((opt, index) => <div style={{ display: "flex", alignItems: "center", border: "1px solid grey", borderRadius: 5, padding: "5px 5px", margin: 3 }} key={`${id}-${method}-arg${i}-multipleBoxes${index}`}>
                <div>{opt}</div>
                <input type={"checkbox"} className={generateArgId(id, i, method)} onChange={() => updateNodeArgs(id)} style={{ marginBottom: 0 }} defaultChecked={d.defaultValues[index]} value={opt}></input>
            </div>)}
        </div>
    )
}