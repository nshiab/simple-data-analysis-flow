// @ts-nocheck
import { useState, useEffect } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { SimpleData } from 'simple-data-analysis';
import useStore from '../../flow/store';
import Arguments from '../Arguments';
const width = 200


export default function LoadDataFromUrl({ id, data }) {

    const { updateNodeSimpleData, testNodeArgs, handleStyle } = useStore()

    const [success, setSucces] = useState(false)

    useEffect(() => {

        trigger()

        async function trigger() {
            try {

                const argsTest = testNodeArgs(data)

                if (argsTest && !data.errorMessage) {
                    const simpleData = await new SimpleData().loadDataFromUrl(data.args)
                    updateNodeSimpleData(id, simpleData, null)
                    setSucces(true)
                }



            } catch (error) {
                updateNodeSimpleData(id, data.simpleData, error.message)
                setSucces(false)
            }
        }

    }, [data.args, data.errorMessage, updateNodeSimpleData, testNodeArgs, id])


    return <div style={{ backgroundColor: "white", border: "1px solid black", borderRadius: 5, padding: 10, maxWidth: 300 }}>
        <div style={{ fontWeight: "bold", textAlign: "center", marginBottom: 10 }}>loadDataFromUrl</div>
        <Arguments id={id} data={data} />
        {data.errorMessage ? <div style={{ maxWidth: width, color: "red", marginTop: 10 }}>{data.errorMessage}</div> : null}
        <Handle type="source" position={Position.Bottom} id="a" style={{ ...handleStyle.source, backgroundColor: success ? "green" : "#ff6666" }} />
    </div >

}
