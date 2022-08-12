export default function Keys({ id, method, generateArgId, updateArgs, d, i, simpleData }) {
    return <select id={generateArgId(id, i, method)} onChange={() => updateArgs()} defaultValue={d.defaultValue}>
        {simpleData ? [undefined, ...simpleData.getKeys()].map((opt, index) => <option key={`${method}-option-${index}`}>{opt}</option>
        ) : null}
    </select>
}