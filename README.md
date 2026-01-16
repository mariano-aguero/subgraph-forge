# 🛠️ Subgraph Forge

[![Deploy with Vercel](https://vercel.com/button)](https://subgraph-forge.vercel.app/)

> **AI-Powered Subgraph Generator for The Graph Protocol**

Subgraph Forge is a modern web tool that automates the creation of Subgraph code (schema, manifest, and mappings) from a smart contract address. By leveraging Claude AI and blockchain explorers, it streamlines the development of data indexing layers for Web3 applications.

**Live Demo**: [https://subgraph-forge.vercel.app/](https://subgraph-forge.vercel.app/)

---

## ✨ Features

- **🚀 Instant Generation**: Enter a contract address and network to get a fully functional subgraph.
- **🔍 Automated ABI Fetching**: Automatically retrieves the contract ABI and name from Etherscan V2 API.
- **🤖 Claude AI Integration**: Uses Claude 3.5 Sonnet (or latest) to intelligently analyze events and generate optimized AssemblyScript mappings.
- **🌓 Dark Mode Support**: Includes a toggle for light and dark themes for a better developer experience.
- **📦 Ready-to-use ZIP**: Download all generated files (`schema.graphql`, `subgraph.yaml`, `mapping.ts`) in a single package.
- **🚀 Easy Deployment**: Follow our [Deployment Guide](SUBGRAPH_DEPLOYMENT.md) to upload your code to The Graph.
- **🌐 Multi-Network Support**: Support for Ethereum, Base, Polygon, Optimism, Arbitrum, and Sepolia.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Theme Management**: [next-themes](https://github.com/pacocoursey/next-themes)
- **AI Engine**: [Anthropic Claude API](https://www.anthropic.com/api)
- **Validation**: [Zod](https://zod.dev/) & [next-safe-action](https://next-safe-action.dev/)
- **Code Quality**: [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/)

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

   Fill in your `ANTHROPIC_API_KEY` and any explorer API keys (like `ETHERSCAN_API_KEY`) in `.env.local`.

4. **Available Scripts**:

   ```bash
   pnpm dev          # Run the development server
   pnpm build        # Build the production application
   pnpm lint         # Run ESLint to check for code issues
   pnpm format       # Run Prettier to format the codebase
   pnpm format:check # Check if the codebase follows formatting rules
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
└── lib/                # Utilities and shared clients
```

---

## 🚀 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

- **Vercel Guide**: Check out our [Vercel Deployment Guide](DEPLOYMENT.md) for step-by-step instructions.
- **Subgraph Guide**: Check out our [Subgraph Deployment Guide](SUBGRAPH_DEPLOYMENT.md) to learn how to deploy the generated code to The Graph.

## 🛡️ Security & Standards

- **Strict TypeScript**: Type safety across the entire codebase.
- **Input Validation**: All server actions are validated with Zod.
- **English-Only**: Code, comments, and documentation are written in English for consistency.
- **Formatting**: Enforced via Prettier.
- **CI/CD**: Automated checks with GitHub Actions (Formatting, Linting, Type checking, and Build).

---

## 📝 License

MIT License - feel free to use and extend!

---

**Made for the Web3 developer community 🚀**
