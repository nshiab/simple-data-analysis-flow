import { useState, useRef, useEffect } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { SimpleData } from 'simple-data-analysis';
import useStore from '../pages/store';

const width = 200

export default function NewSimpleData({ id }) {

    const [manualData, setManualData] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

    const inputRef = useRef()

    useEffect(() => {
        if (!manualData) {
            updateNodeSimpleData(id, new SimpleData())
        }
    }, [manualData])

    const updateNodeSimpleData = useStore((state) => state.updateNodeSimpleData)

    return <div style={{ backgroundColor: "white", border: "1px solid black", borderRadius: 5, padding: 10 }}>
        <div style={{ fontWeight: "bold", textAlign: "center", marginBottom: 10 }}>New SimpleData</div>
        <button style={{ display: "block", marginLeft: "auto", marginRight: "auto" }} onClick={() => setManualData(!manualData)}>Add data manually</button>
        {manualData ?
            <div style={{ display: "flex", flexDirection: "column", marginTop: 10 }}>
                <input ref={inputRef} style={{ width: width, textAlign: "center" }} placeholder='Paste a JSON array of objects' onChange={() => {
                    try {
                        updateNodeSimpleData(id, new SimpleData({ data: JSON.parse(inputRef.current.value) }))
                        setErrorMessage(null)
                    } catch (error) {
                        setErrorMessage(`Error: ${error.message}`)
                    }
                }}></input>
            </div> :
            null
        }
        {errorMessage ? <div style={{ maxWidth: width, color: "red", marginTop: 10 }}>{errorMessage}</div> : null}
        <Handle type="source" position={Position.Bottom} id="a" />
    </div>

}
