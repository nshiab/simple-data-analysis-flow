// @ts-nocheck
export default function Keys({ id, method, generateArgId, updateNodeArgs, d, i, simpleData }) {
    return <select id={generateArgId(id, i, method)} onChange={() => updateNodeArgs(id)} defaultValue={d.defaultValue}>
        {simpleData ? [undefined, ...simpleData.getKeys()].map((opt, index) => <option key={`${method}-option-${index}`}>{opt}</option>
        ) : null}
    </select>
}