import SimpleFlow from "@/components/SimpleFlow";

export default function Home() {
  return (
    <main>
      <div className="container pt-8 fixed z-10 bg-white pb-4">
        <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Simple Data Analysis Flow
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-2">
          Welcome! This project allows you to use the open source library{" "}
          <a
            className="font-medium underline underline-offset-2"
            href="https://github.com/nshiab/simple-data-analysis.js"
          >
            simple-data-analysis
          </a>{" "}
          with a node-based editor running in the browser. Feel to start a
          conversation, raise an issue or contribute to the{" "}
          <a
            className="font-medium underline underline-offset-2"
            href="https://github.com/nshiab/simple-data-analysis-flow"
          >
            code on GitHub
          </a>
          .
        </p>
      </div>
      <SimpleFlow />
    </main>
  );
}
