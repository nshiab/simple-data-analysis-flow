import { useEffect, useMemo, useState } from "react";
import Code from "./Code";
import { useNodes, useNodesData } from "@xyflow/react";

export default function AllCode() {
  const [code, setCode] = useState("");

  const nodes = useNodes();
  const ids = useMemo(() => nodes.map((d) => d.id), [nodes]);
  const nodesData = useNodesData(ids);

  useEffect(() => {
    const code = nodesData.map((d) => d.data.code).join("\n\n");
    setCode(code);
  }, [nodesData]);

  return (
    <div className="z-10">
      <Code code={code} border={true} left={true} />
    </div>
  );
}
