import path from "path"
import fs from "fs"
import jsYaml from "js-yaml"
import { CodeComparison, type CodeExample } from "@/components/code-comparison"

interface ExamplesFile {
  examples: CodeExample[]
}

export default function Page() {
  const filePath = path.join(process.cwd(), "public", "examples.yaml")
  const raw = fs.readFileSync(filePath, "utf-8")
  const { examples } = jsYaml.load(raw) as ExamplesFile

  return <CodeComparison examples={examples} />
}
