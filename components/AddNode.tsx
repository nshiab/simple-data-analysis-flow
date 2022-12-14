import { useMemo } from "react"
import useStore from "../flow/store"

export default function AddNode() {
    const { addCustomNode, getNodeId, methods } = useStore()

    const categories = useMemo(() => {
        const categories: { [key: string]: string[] } = {}
        for (let method of Object.keys(methods)) {
            if (Object.keys(categories).indexOf(methods[method].category) < 0) {
                categories[methods[method].category] = []
            }
        }

        for (let method of Object.keys(methods)) {
            categories[methods[method].category].push(method)
        }

        return categories
    }, [methods])

    return (
        <div>
            <div
                style={{
                    paddingBottom: 5,
                    paddingLeft: 5,
                    display: "flex",
                    flexWrap: "wrap",
                    backgroundColor: "white",
                }}
            >
                {Object.keys(categories).map((cat) => (
                    <select
                        onChange={(evt) =>
                            addCustomNode(evt, `${getNodeId()}`, cat)
                        }
                        key={`methodCategory-${cat}`}
                    >
                        <option>{cat}</option>
                        {categories[cat].sort().map((opt) => (
                            <option key={`methodCategory-${cat}-${opt}`}>
                                {opt}
                            </option>
                        ))}
                    </select>
                ))}
            </div>
        </div>
    )
}
