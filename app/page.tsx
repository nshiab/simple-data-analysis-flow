import GithubLogo from "@/components/partials/GithubLogo"
import SimpleFlow from "@/components/SimpleFlow"
import { ReactFlowProvider } from "@xyflow/react"

export default function Home() {
  return (
    <main>
      <div className="flex flex-col">
        <div className="container pt-6 bg-white pb-4" id="header">
          <div className="flex items-center justify-between">
            <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              Simple Data Analysis Flow
            </h1>
            <GithubLogo />
          </div>
          <p className="leading-7 [&:not(:first-child)]:mt-2">
            This is a node-based editor for{" "}
            <a
              className="font-medium underline underline-offset-2"
              target="_blank"
              href="https://github.com/nshiab/simple-data-analysis.js"
            >
              simple-data-analysis
            </a>{" "}
            that runs in your browser. To add nodes, right-click on the panel
            below. Not{" "}
            <a
              className="font-medium underline underline-offset-2"
              target="_blank"
              href="https://nshiab.github.io/simple-data-analysis/classes/SimpleWebTable.html"
            >
              {" "}
              all methods
            </a>{" "}
            are implemented. If you need one,{" "}
            <a
              className="font-medium underline underline-offset-2"
              target="_blank"
              href="https://github.com/nshiab/simple-data-analysis-flow/issues"
            >
              create an issue
            </a>
            .
          </p>
        </div>
        <ReactFlowProvider>
          <SimpleFlow />
        </ReactFlowProvider>
      </div>
    </main>
  )
}
