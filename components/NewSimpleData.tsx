// @ts-nocheck
import { useState, useRef, useEffect } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { SimpleData } from 'simple-data-analysis';
import useStore from '../flow/store';

const width = 200

export default function NewSimpleData({ id, data }) {

    const [success, setSucces] = useState(true)
    const [manualData, setManualData] = useState(false)

    const inputRef = useRef()

    useEffect(() => {
        if (!manualData) {
            updateNodeSimpleData(id, new SimpleData(), "")
            setSucces(true)
        } else {
            updateNodeSimpleData(id, null, null)
        }
    }, [manualData])

    const { updateNodeSimpleData, handleStyle } = useStore()

    return <div style={{ backgroundColor: "white", border: "1px solid black", borderRadius: 5, padding: 10 }}>
        <div style={{ fontWeight: "bold", textAlign: "center", marginBottom: 10 }}>New SimpleData</div>
        <button style={{ display: "block", marginLeft: "auto", marginRight: "auto" }} onClick={() => setManualData(!manualData)}>Add data manually</button>
        {manualData ?
            <div style={{ display: "flex", flexDirection: "column", marginTop: 10 }}>
                <textarea rows="10" ref={inputRef} style={{ width: width }} placeholder='Paste a JSON array of objects' onChange={() => {
                    try {
                        updateNodeSimpleData(id, new SimpleData({ data: inputRef.current.value === "" ? [] : JSON.parse(inputRef.current.value) }))
                        setSucces(true)
                    } catch (error) {
                        updateNodeSimpleData(id, null, error.message)
                        setSucces(false)
                    }
                }}></textarea>
            </div> :
            null
        }
        {data.errorMessage ? <div style={{ maxWidth: width, color: "red", marginTop: 10 }}>{data.errorMessage}</div> : null}
        <Handle type="source" position={Position.Bottom} id="a" style={{ ...handleStyle.source, backgroundColor: success ? "green" : "#ff6666" }} />
    </div>

}
