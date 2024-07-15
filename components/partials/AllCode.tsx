import { useEffect, useMemo, useState } from "react";
import Code from "./Code";
import { useNodes, useNodesData } from "@xyflow/react";

export default function AllCode() {
  const [open, setOpen] = useState(false);

  const [code, setCode] = useState("");

  const nodes = useNodes();
  const ids = useMemo(() => nodes.map((d) => d.id), [nodes]);
  const nodesData = useNodesData(ids);

  useEffect(() => {
    if (open) {
      const code = nodesData
        .map((d) => d.data.code)
        .filter((d) => d !== "" && d !== null && d !== undefined)
        .join("\n\n");
      setCode(code);
    }
  }, [nodesData, open]);

  return (
    <div className="z-10" onClick={() => setOpen(!open)}>
      <Code code={code} border={true} left={true} />
    </div>
  );
}
