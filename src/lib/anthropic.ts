import "server-only"
import Anthropic from "@anthropic-ai/sdk"
import { env } from "./env"

const anthropicClientSingleton = () => {
  return new Anthropic({
    apiKey: env.ANTHROPIC_API_KEY,
  })
}

declare global {
  var anthropic: undefined | ReturnType<typeof anthropicClientSingleton>
}

export const anthropic = globalThis.anthropic ?? anthropicClientSingleton()

if (process.env.NODE_ENV !== "production") globalThis.anthropic = anthropic
