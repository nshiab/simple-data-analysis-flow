import SDA from "../node_modules/simple-data-analysis/package.json"
import SDAFlow from "../package.json"

export default function Version() {
    return <div style={{ position: "absolute", bottom: 14, right: 0, paddingRight: 3, fontSize: 10, color: "#555", background: "hsla(0,0%,100%,.5)", zIndex: 1000 }}>
        <div>SDA-Flow v{SDAFlow.version} / SDA v{SDA.version}</div>
    </div>
}