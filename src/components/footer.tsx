import Link from "next/link"
import { Github, FileText } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Subgraph Forge. Made for the Web3
            community.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="https://github.com/marianoaguero/subgraph-forge"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
            >
              <Github className="h-4 w-4" />
              GitHub
            </Link>
            <Link
              href="https://github.com/mariano-aguero/subgraph-forge/blob/main/SUBGRAPH_DEPLOYMENT.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Deployment Guide
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
