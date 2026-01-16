# Vercel Deployment Guide

This guide details the steps to deploy **Subgraph Forge** on Vercel.

## 🚀 Deployment Steps

The project can be easily deployed to Vercel at: **[https://subgraph-forge.vercel.app/](https://subgraph-forge.vercel.app/)** (or your own fork).

### 1. Prepare the Repository

Make sure your code is in a GitHub, GitLab, or Bitbucket repository.

### 2. Import the Project in Vercel

1. Go to [vercel.com](https://vercel.com) and log in.
2. Click on **"Add New..."** and then on **"Project"**.
3. Select your repository from the list.

### 3. Project Configuration

Vercel will automatically detect that it is a **Next.js** project and that you are using **pnpm**.

- **Framework Preset**: Next.js
- **Build Command**: `next build` (Vercel sets this by default)
- **Install Command**: `pnpm install` (Vercel sets this by default)

### 4. Environment Variables

It is **essential** to configure the following environment variables in Vercel's "Environment Variables" section for the application to function correctly:

| Variable                     | Description                        | Required      |
| :--------------------------- | :--------------------------------- | :------------ |
| `ANTHROPIC_API_KEY`          | Your Anthropic API Key (Claude AI) | Yes           |
| `ETHERSCAN_API_KEY`          | Your Etherscan API Key (V2 API)    | No (Optional) |
| `BASESCAN_API_KEY`           | Your Basescan API Key              | No (Optional) |
| `POLYGONSCAN_API_KEY`        | Your Polygonscan API Key           | No (Optional) |
| `OPTIMISM_ETHERSCAN_API_KEY` | Your Optimism Etherscan API Key    | No (Optional) |
| `ARBISCAN_API_KEY`           | Your Arbiscan API Key              | No (Optional) |

_Note: While explorer keys are optional, they are recommended to avoid rate limits when fetching ABIs._

### 5. Deploy

Click on **"Deploy"**. Vercel will compile the project and provide you with a public URL.

## 🛠️ Additional Notes

- **Runtime**: The project uses Next.js 16.0.0, which is compatible with Vercel's Node.js runtime.
- **Server Actions**: Subgraph generation uses Server Actions, which work automatically as Serverless Functions on Vercel.
- **Time Limits**: Generating subgraphs with Claude can take several seconds. Vercel has a runtime limit for serverless functions (10s on the Hobby plan). If you encounter timeouts, you may need a Pro plan for longer execution times or optimize the generation prompt.
