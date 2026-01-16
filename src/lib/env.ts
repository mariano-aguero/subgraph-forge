import "server-only"
import { z } from "zod"

export const envSchema = z.object({
  ANTHROPIC_API_KEY: z.string().min(1),
  // Explorer API Keys (optional for the user if provided by default or if the user enters them in the UI)
  // But for the server, it's better to validate them
  ETHERSCAN_API_KEY: z.string().optional(),
  BASESCAN_API_KEY: z.string().optional(),
  POLYGONSCAN_API_KEY: z.string().optional(),
  OPTIMISM_ETHERSCAN_API_KEY: z.string().optional(),
  ARBISCAN_API_KEY: z.string().optional(),
})

export type Env = z.infer<typeof envSchema>

export const env = envSchema.parse({
  ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
  ETHERSCAN_API_KEY: process.env.ETHERSCAN_API_KEY,
  BASESCAN_API_KEY: process.env.BASESCAN_API_KEY,
  POLYGONSCAN_API_KEY: process.env.POLYGONSCAN_API_KEY,
  OPTIMISM_ETHERSCAN_API_KEY: process.env.OPTIMISM_ETHERSCAN_API_KEY,
  ARBISCAN_API_KEY: process.env.ARBISCAN_API_KEY,
})
