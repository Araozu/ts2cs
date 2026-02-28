import {
  FileTsIcon,
  FileCSharpIcon,
  ArrowsLeftRightIcon,
} from "@phosphor-icons/react/dist/ssr"
import { codeToHtml } from "shiki"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

export interface CodeExample {
  title: string
  description: string
  typescript: string
  csharp: string
}

// ─── Language label ───────────────────────────────────────────────────────────

function LangBadge({ lang }: { lang: "TypeScript" | "C#" }) {
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold",
        lang === "TypeScript"
          ? "bg-ts/10 text-ts"
          : "bg-csharp/10 text-csharp"
      )}
    >
      {lang === "TypeScript" ? (
        <FileTsIcon weight="duotone" className="size-3.5" />
      ) : (
        <FileCSharpIcon weight="duotone" className="size-3.5" />
      )}
      {lang}
    </div>
  )
}

// ─── Code pane ────────────────────────────────────────────────────────────────

async function CodePane({ lang, code }: { lang: "TypeScript" | "C#"; code: string }) {
  const html = await codeToHtml(code.trimEnd(), {
    lang: lang === "TypeScript" ? "typescript" : "csharp",
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
    defaultColor: false,
  })

  return (
    <div
      className={cn(
        "flex min-w-0 flex-1 flex-col overflow-hidden rounded-lg border",
        lang === "C#" && "border-csharp/40"
      )}
    >
      <div className="flex items-center gap-2 border-b bg-muted/40 px-3 py-2">
        <LangBadge lang={lang} />
      </div>
      <ScrollArea className="h-full">
        <div
          className="shiki-wrapper min-w-max p-4 text-xs leading-relaxed [&>pre]:contents"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: shiki output is trusted
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}

// ─── Single comparison card ───────────────────────────────────────────────────

async function ComparisonCard({ example }: { example: CodeExample }) {
  return (
    <Card className="flex flex-col gap-0 overflow-hidden p-0">
      <CardHeader className="border-b px-5 py-4">
        <div className="flex items-start gap-3">
          <div className="flex min-w-0 flex-col gap-1">
            <CardTitle className="text-base">{example.title}</CardTitle>
            <CardDescription className="text-xs">
              {example.description}
            </CardDescription>
          </div>
          <Badge variant="secondary" className="ml-auto shrink-0 text-xs">
            <ArrowsLeftRightIcon className="size-3" />
            TS vs C#
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex min-h-64 flex-col gap-3 p-4 sm:flex-row sm:gap-4">
        <CodePane lang="TypeScript" code={example.typescript} />
        <CodePane lang="C#" code={example.csharp} />
      </CardContent>
    </Card>
  )
}

// ─── Page layout ──────────────────────────────────────────────────────────────

export async function CodeComparison({ examples }: { examples: CodeExample[] }) {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 lg:px-12">
      <header className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <FileTsIcon weight="duotone" className="size-6 text-ts" />
          <ArrowsLeftRightIcon className="size-4 text-muted-foreground" />
          <FileCSharpIcon weight="duotone" className="size-6 text-csharp" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">TypeScript → C#</h1>
        <p className="text-sm text-muted-foreground">
          Comparaciones de código lado a lado entre TypeScript y C#
        </p>
      </header>

      <div className="flex flex-col gap-6">
        {examples.map((example) => (
          <ComparisonCard key={example.title} example={example} />
        ))}
      </div>
    </div>
  )
}
