# 🛠️ Subgraph Forge

> **AI-Powered Subgraph Generator for The Graph Protocol**

Subgraph Forge is a modern web tool that automates the creation of Subgraph code (schema, manifest, and mappings) from a smart contract address. By leveraging Claude AI and blockchain explorers, it streamlines the development of data indexing layers for Web3 applications.

---

## ✨ Features

- **🚀 Instant Generation**: Enter a contract address and network to get a fully functional subgraph.
- **🔍 Automated ABI Fetching**: Automatically retrieves the contract ABI and name from Etherscan and other explorers.
- **🤖 Claude AI Integration**: Uses Claude 3.5 Sonnet to intelligently analyze events and generate optimized AssemblyScript mappings.
- **📦 Ready-to-use ZIP**: Download all generated files (`schema.graphql`, `subgraph.yaml`, `mapping.ts`) in a single package.
- **🌐 Multi-Network Support**: Support for Ethereum, Base, Polygon, Optimism, Arbitrum, and Sepolia.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **AI Engine**: [Anthropic Claude API](https://www.anthropic.com/api)
- **Validation**: [Zod](https://zod.dev/) & [next-safe-action](https://next-safe-action.dev/)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.17 or higher)
- [pnpm](https://pnpm.io/) (v9 or higher)
- [Anthropic API Key](https://console.anthropic.com/)

### Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd subgraph-forge
   ```

2. **Install dependencies**:

   ```bash
   pnpm install
   ```

3. **Configure environment variables**:

   ```bash
   cp .env.example .env.local
   ```

   Fill in your `ANTHROPIC_API_KEY` and any explorer API keys in `.env.local`.

4. **Run the development server**:

   ```bash
   pnpm dev
   ```

5. **Open the app**:
   Navigate to [http://localhost:3000](http://localhost:3000).

---

## 🏗️ Project Structure

The project follows a feature-based architecture:

```text
src/
├── app/                # Next.js App Router routes
├── components/         # Shared UI components
├── features/           # Business domain logic
│   └── subgraph-generator/
│       ├── components/ # Generator UI
│       ├── actions.ts  # Server Actions (ABI fetch & AI gen)
│       └── types.ts    # Shared types
├── lib/                # Utilities and shared clients
└── templates/          # AI development templates and guidelines
```

---

## 🛡️ Security & Standards

- **Strict TypeScript**: Type safety across the entire codebase.
- **Input Validation**: All server actions are validated with Zod.
- **English-Only**: Code, comments, and documentation are written in English for consistency.
- **Formatting**: Enforced via Prettier.

---

## 📝 License

MIT License - feel free to use and extend!

---

**Made for the Web3 developer community 🚀**
