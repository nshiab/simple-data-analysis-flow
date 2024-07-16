import {
  BundledLanguage,
  BundledTheme,
  createHighlighter,
  HighlighterGeneric,
} from "shiki"

let highlighter: HighlighterGeneric<BundledLanguage, BundledTheme> | null = null
let creating = false
let ready = false
export default async function codeToHtml(code: string) {
  if (!highlighter && !creating && !ready) {
    creating = true
    highlighter = await createHighlighter({
      themes: ["slack-ochin"],
      langs: ["ts"],
    })
    ready = true
  }
  return (
    highlighter?.codeToHtml(code, { lang: "ts", theme: "slack-ochin" }) ?? ""
  )
}
