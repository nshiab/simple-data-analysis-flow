import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useNodesData, useReactFlow } from "@xyflow/react"
import { useEffect, useState } from "react"
import OptionsTextArea from "../partials/OptionsTextArea"
import { Textarea } from "../ui/textarea"

export default function Note({ id }: { id: string }) {
  const [text, setText] = useState<string | undefined>(undefined)

  const { updateNodeData } = useReactFlow()

  const nodeData = useNodesData(id)
  useEffect(() => {
    if (nodeData?.data.imported) {
      if (typeof nodeData.data.text === "string") {
        setText(nodeData.data.text)
      }
      nodeData.data.imported = false
    }
  }, [nodeData])

  useEffect(() => {
    async function run() {
      updateNodeData(id, {
        text,
      })
    }

    run()
  }, [text, id, updateNodeData])

  return (
    <div>
      <Card>
        <Textarea
          className="w-96 h-48 text-pink-500 text-md"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </Card>
    </div>
  )
}
