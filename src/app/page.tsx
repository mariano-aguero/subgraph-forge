import { GeneratorForm } from "@/features/subgraph-generator/components/generator-form"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
            Subgraph Forge
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Generate production-ready Subgraph code from any smart contract in
            seconds using AI.
          </p>
        </div>

        <GeneratorForm />
      </div>
    </main>
  )
}
