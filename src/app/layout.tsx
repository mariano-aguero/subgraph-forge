import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Subgraph Forge | AI-Powered Subgraph Generator",
  description:
    "Generate production-ready Subgraph code (schema, manifest, and mappings) from any smart contract address in seconds using Claude AI.",
  keywords: [
    "Subgraph",
    "The Graph",
    "Blockchain",
    "Ethereum",
    "Smart Contract",
    "AI",
    "Claude",
    "Web3",
    "Indexer",
  ],
  authors: [{ name: "Mariano Aguero", url: "mailto:mariano.aguero@gmail.com" }],
  openGraph: {
    title: "Subgraph Forge | AI-Powered Subgraph Generator",
    description:
      "Generate production-ready Subgraph code from any smart contract address in seconds.",
    url: "https://subgraph-forge.vercel.app/",
    siteName: "Subgraph Forge",
    images: [
      {
        url: "https://subgraph-forge.vercel.app/og-image.svg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Subgraph Forge | AI-Powered Subgraph Generator",
    description:
      "Generate production-ready Subgraph code from any smart contract address in seconds.",
    creator: "@marianoaguero",
    images: ["https://subgraph-forge.vercel.app/og-image.svg"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
