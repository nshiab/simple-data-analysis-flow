import SimpleFlow from "@/components/SimpleFlow";

export default function Home() {
  return (
    <main>
      <div className="container pt-8 fixed z-10 bg-white pb-4">
        <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Simple Data Analysis Flow
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-2">
          This is a node-based editor for{" "}
          <a
            className="font-medium underline underline-offset-2"
            href="https://github.com/nshiab/simple-data-analysis.js"
          >
            simple-data-analysis
          </a>{" "}
          that runs in your browser. To add nodes, right-click on the panel
          below. If you encounter a bug, create an issue on{" "}
          <a
            className="font-medium underline underline-offset-2"
            href="https://github.com/nshiab/simple-data-analysis-flow"
          >
            GitHub
          </a>
          .
        </p>
      </div>
      <SimpleFlow />
    </main>
  );
}
