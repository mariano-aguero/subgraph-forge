# Subgraph Deployment Guide

This guide explains how to deploy the generated subgraph code to **The Graph Protocol**.

## 📋 Prerequisites

Before you begin, ensure you have the following:

1.  **Node.js** (v18 or higher)
2.  **Graph CLI**: Install it globally using pnpm:
    ```bash
    pnpm add -g @graphprotocol/graph-cli
    ```
3.  **Account on Subgraph Studio**: Create an account at [https://thegraph.com/studio/](https://thegraph.com/studio/).
4.  **A Created Subgraph**: In the Studio dashboard, click "Create a Subgraph".

---

## 🚀 Deployment Steps

### 1. Download and Initialize

1.  **Download the ZIP**: Click the **"Download ZIP"** button in Subgraph Forge after generating your files.
2.  **Extract**: Extract the downloaded ZIP file into a new directory on your computer.

```bash
mkdir my-awesome-subgraph
cd my-awesome-subgraph
# Extract files (schema.graphql, subgraph.yaml, mapping.ts) into this folder
```

### 2. Install Dependencies

You need to create a `package.json` in your subgraph directory to manage the Graph CLI and AssemblyScript dependencies.

```bash
pnpm init
pnpm add @graphprotocol/graph-cli @graphprotocol/graph-ts
```

### 3. Authenticate

Get your **Deploy Key** from the Subgraph Studio dashboard and run:

```bash
graph auth --studio <YOUR_DEPLOY_KEY>
```

### 4. Code Generation & Build

Generate AssemblyScript types from your schema and manifest, then build the subgraph.

```bash
# Generate types
graph codegen

# Build the subgraph
graph build
```

### 5. Deploy to Subgraph Studio

Run the deploy command. You will be asked for a version label (e.g., `v0.0.1`).

```bash
graph deploy --studio <SUBGRAPH_SLUG>
```

Replace `<SUBGRAPH_SLUG>` with the name you gave your subgraph in the Studio.

---

## 🛠️ Common Commands

| Command         | Description                                 |
| :-------------- | :------------------------------------------ |
| `graph codegen` | Generates types from GraphQL schema and ABI |
| `graph build`   | Compiles the subgraph to WebAssembly        |
| `graph test`    | Runs unit tests (requires Matchstick)       |
| `graph auth`    | Authenticates your CLI with the Studio      |
| `graph deploy`  | Deploys the subgraph to the Graph Node      |

---

## 💡 Tips

- **ABIs**: Subgraph Forge now includes the `.json` ABI file in the downloaded ZIP and automatically configures the path in `subgraph.yaml`.
- **Network**: The `network` field in `subgraph.yaml` is automatically set to match the network you selected in the UI.
- **Start Block**: A placeholder for `startBlock` is added to your `subgraph.yaml`. It is highly recommended to update this value with the actual block number where the contract was deployed to speed up indexing. You can find this on the block explorer for your contract.

For more detailed information, visit the [official The Graph Documentation](https://thegraph.com/docs/en/deploying/deploying-a-subgraph-to-studio/).
