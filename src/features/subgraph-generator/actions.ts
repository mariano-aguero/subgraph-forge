"use server"

import { actionClient } from "@/lib/safe-action"
import { z } from "zod"
import { env } from "@/lib/env"
import { anthropic } from "@/lib/anthropic"
import { Network } from "./types"

const fetchAbiSchema = z.object({
  address: z.string().regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address"),
  network: z.enum([
    "mainnet",
    "base",
    "polygon",
    "optimism",
    "arbitrum",
    "sepolia",
  ]),
})

const EXPLORER_APIS: Record<
  Network,
  { url: string; chainId: string; key?: string }
> = {
  mainnet: {
    url: "https://api.etherscan.io/v2/api",
    chainId: "1",
    key: env.ETHERSCAN_API_KEY,
  },
  base: {
    url: "https://api.etherscan.io/v2/api",
    chainId: "8453",
    key: env.BASESCAN_API_KEY,
  },
  polygon: {
    url: "https://api.etherscan.io/v2/api",
    chainId: "137",
    key: env.POLYGONSCAN_API_KEY,
  },
  optimism: {
    url: "https://api.etherscan.io/v2/api",
    chainId: "10",
    key: env.OPTIMISM_ETHERSCAN_API_KEY,
  },
  arbitrum: {
    url: "https://api.etherscan.io/v2/api",
    chainId: "42161",
    key: env.ARBISCAN_API_KEY,
  },
  sepolia: {
    url: "https://api.etherscan.io/v2/api",
    chainId: "11155111",
    key: env.ETHERSCAN_API_KEY,
  },
}

export const fetchAbiAction = actionClient
  .schema(fetchAbiSchema)
  .action(async ({ parsedInput: { address, network } }) => {
    const explorer = EXPLORER_APIS[network]
    const query = new URLSearchParams({
      chainid: explorer.chainId,
      module: "contract",
      action: "getsourcecode",
      address: address,
      apikey: explorer.key || "",
    })

    const response = await fetch(`${explorer.url}?${query.toString()}`)
    const data = await response.json()

    if (data.status !== "1") {
      console.error(`Error fetching ABI from ${network}:`, data)
      throw new Error(data.result || data.message || "Failed to fetch ABI")
    }

    const result = data.result[0]
    if (
      !result ||
      !result.ABI ||
      result.ABI === "Contract source code not verified"
    ) {
      throw new Error("Contract source code not verified")
    }
    const abi = JSON.parse(result.ABI)
    const name = result.ContractName

    return { abi, name }
  })

const generateSubgraphSchema = z.object({
  address: z.string(),
  network: z.string(),
  abi: z.array(z.any()),
  name: z.string().optional(),
})

export const generateSubgraphAction = actionClient
  .schema(generateSubgraphSchema)
  .action(async ({ parsedInput: { address, network, abi, name } }) => {
    const contractName = name || "Contract"

    const events = abi.filter((item: any) => item.type === "event")

    const prompt = `
Generate a Subgraph for the following smart contract:
Address: ${address}
Network: ${network}
Contract Name: ${contractName}

Events:
${JSON.stringify(events, null, 2)}

Please provide the content for the following 3 files in a JSON format:
1. schema.graphql (Define entities based on events)
2. subgraph.yaml (Manifest with dataSources, source address, abi, and eventHandlers)
3. mapping.ts (AssemblyScript mappings for each event handler)

Specific instructions for subgraph.yaml:
- The network field MUST be exactly "${network}".
- The name of the ABI in the source and mapping sections MUST be "${contractName}".
- The file path for the ABI MUST be "./${contractName}.json".
- Include a "startBlock" field under the source section (use 0 as a placeholder if you don't know the exact block, but add a comment that the user should update it).

The output must be strictly a JSON object with these keys: "schema.graphql", "subgraph.yaml", "mapping.ts".
Do not include any explanation, only the JSON.
`

    const msg = await anthropic.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 16384,
      messages: [{ role: "user", content: prompt }],
    })

    const content = msg.content[0].type === "text" ? msg.content[0].text : ""

    try {
      // Find the JSON block in case Claude adds some text
      const jsonMatch = content.match(/\{[\s\S]*\}/)
      const jsonContent = jsonMatch ? jsonMatch[0] : content
      const generatedFiles = JSON.parse(jsonContent)
      return generatedFiles
    } catch (e) {
      console.error("Failed to parse Claude response:", content)
      throw new Error("Failed to generate subgraph files. Please try again.")
    }
  })
