// @ts-nocheck
import { useState, useRef, useEffect } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { SimpleData } from 'simple-data-analysis';
import useStore from '../../flow/store';

const width = 200

export default function NewSimpleData({ id, data }) {

    const [success, setSucces] = useState(true)

    const inputRef = useRef()

    useEffect(() => {
        if (!data.errorMessage) {
            try {
                updateNodeSimpleData(id, new SimpleData({ data: data.manualData }), null, {})
                setSucces(true)
            } catch (error) {
                updateNodeSimpleData(id, null, error.message)
            }
        }
    }, [data.manualData, data.errorMessage, id, updateNodeSimpleData])

    const { updateNodeSimpleData, handleStyle } = useStore()

    return <div style={{ backgroundColor: "white", border: "1px solid black", borderRadius: 5, padding: 10 }}>
        <div style={{ fontWeight: "bold", textAlign: "center", marginBottom: 10 }}>New SimpleData</div>
        <button style={{ display: "block", marginLeft: "auto", marginRight: "auto" }} onClick={() => updateNodeSimpleData(id, data.simpleData, data.errorMessage, { openManualData: data.openManualData ? !data.openManualData : true })}>Add data manually</button>
        {data.openManualData ?
            <div style={{ display: "flex", flexDirection: "column", marginTop: 10 }}>
                <textarea rows="10" ref={inputRef} style={{ width: width }} placeholder='Paste a JSON array of objects' onChange={() => {
                    try {
                        const value = inputRef.current.value
                        updateNodeSimpleData(id, null, null, { manualData: value === "" ? [] : JSON.parse(value), manualDataString: value })
                    } catch (error) {
                        updateNodeSimpleData(id, null, error.message, {})
                        setSucces(false)
                    }
                }} defaultValue={data.manualDataString}></textarea>
            </div> :
            null
        }
        {data.errorMessage ? <div style={{ maxWidth: width, color: "red", marginTop: 10 }}>{data.errorMessage}</div> : null}
        <Handle type="source" position={Position.Bottom} id="a" style={{ ...handleStyle.source, backgroundColor: success ? "green" : "#ff6666" }} />
    </div>

}
