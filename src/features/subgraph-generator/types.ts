export type Network =
  | "mainnet"
  | "base"
  | "polygon"
  | "optimism"
  | "arbitrum"
  | "sepolia"

export interface ContractData {
  address: string
  network: Network
  abi: any[]
  name?: string
}

export interface GeneratedFiles {
  "schema.graphql": string
  "subgraph.yaml": string
  "mapping.ts": string
}
