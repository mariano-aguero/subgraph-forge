"use client"

import { useState } from "react"
import { useAction } from "next-safe-action/hooks"
import * as actions from "../actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Network, GeneratedFiles } from "../types"
import JSZip from "jszip"
import { Download, Loader2 } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export function GeneratorForm() {
  const [address, setAddress] = useState("")
  const [network, setNetwork] = useState<Network>("mainnet")
  const [abi, setAbi] = useState<any[] | null>(null)
  const [contractName, setContractName] = useState("")
  const [generatedFiles, setGeneratedFiles] = useState<GeneratedFiles | null>(
    null
  )

  const fetchAbi = useAction(actions.fetchAbiAction, {
    onSuccess: ({ data }) => {
      if (data) {
        setAbi(data.abi)
        setContractName(data.name || "Contract")
      }
    },
    onError: ({ error }) => {
      alert(error.serverError || "Failed to fetch ABI")
    },
  })

  const generateSubgraph = useAction(actions.generateSubgraphAction, {
    onSuccess: ({ data }) => {
      if (data) {
        setGeneratedFiles(data)
      }
    },
    onError: ({ error }) => {
      alert(error.serverError || "Failed to generate subgraph")
    },
  })

  const handleFetchAbi = () => {
    setAbi(null)
    setGeneratedFiles(null)
    fetchAbi.execute({ address, network })
  }

  const handleGenerate = () => {
    if (!abi) return
    setGeneratedFiles(null)
    generateSubgraph.execute({ address, network, abi, name: contractName })
  }

  const downloadZip = async () => {
    if (!generatedFiles) return
    const zip = new JSZip()
    zip.file("schema.graphql", generatedFiles["schema.graphql"])
    zip.file("subgraph.yaml", generatedFiles["subgraph.yaml"])
    zip.file("mapping.ts", generatedFiles["mapping.ts"])
    zip.file(`${contractName || "Contract"}.json`, JSON.stringify(abi, null, 2))

    const content = await zip.generateAsync({ type: "blob" })
    const url = URL.createObjectURL(content)
    const a = document.createElement("a")
    a.href = url
    a.download = `subgraph-${contractName || "generated"}.zip`
    a.click()
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end bg-card p-6 rounded-lg border shadow-sm">
        <div className="space-y-2">
          <Label htmlFor="address">Contract Address</Label>
          <Input
            id="address"
            placeholder="0x..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            disabled={fetchAbi.isPending || generateSubgraph.isPending}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="network">Network</Label>
          <Select
            value={network}
            onValueChange={(v) => setNetwork(v as Network)}
            disabled={fetchAbi.isPending || generateSubgraph.isPending}
          >
            <SelectTrigger id="network">
              <SelectValue placeholder="Select network" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mainnet">Ethereum Mainnet</SelectItem>
              <SelectItem value="sepolia">Sepolia</SelectItem>
              <SelectItem value="base">Base</SelectItem>
              <SelectItem value="polygon">Polygon</SelectItem>
              <SelectItem value="optimism">Optimism</SelectItem>
              <SelectItem value="arbitrum">Arbitrum</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          onClick={handleFetchAbi}
          disabled={
            fetchAbi.isPending || generateSubgraph.isPending || !address
          }
          className="md:col-span-2"
        >
          {fetchAbi.isPending && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Fetch ABI
        </Button>
      </div>

      {fetchAbi.isPending && (
        <div className="space-y-4 bg-card p-6 rounded-lg border shadow-sm">
          <div className="flex justify-between items-center">
            <Skeleton className="h-7 w-64" />
            <Skeleton className="h-10 w-44" />
          </div>
        </div>
      )}

      {abi && !fetchAbi.isPending && (
        <div className="space-y-4 bg-card p-6 rounded-lg border shadow-sm">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">
              ABI Fetched: {contractName}
            </h3>
            <Button
              onClick={handleGenerate}
              disabled={generateSubgraph.isPending}
            >
              {generateSubgraph.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Generate Subgraph with Claude
            </Button>
          </div>
        </div>
      )}

      {generateSubgraph.isPending && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-[400px] w-full" />
          </div>
        </div>
      )}

      {generatedFiles && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Generated Files</h3>
            <Button onClick={downloadZip} variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download ZIP
            </Button>
          </div>

          <Tabs defaultValue="yaml" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="yaml">subgraph.yaml</TabsTrigger>
              <TabsTrigger value="graphql">schema.graphql</TabsTrigger>
              <TabsTrigger value="mapping">mapping.ts</TabsTrigger>
              <TabsTrigger value="abi">ABI.json</TabsTrigger>
            </TabsList>
            <TabsContent value="yaml">
              <pre className="p-4 bg-muted rounded-md overflow-auto max-h-[500px] text-sm">
                {generatedFiles["subgraph.yaml"]}
              </pre>
            </TabsContent>
            <TabsContent value="graphql">
              <pre className="p-4 bg-muted rounded-md overflow-auto max-h-[500px] text-sm">
                {generatedFiles["schema.graphql"]}
              </pre>
            </TabsContent>
            <TabsContent value="mapping">
              <pre className="p-4 bg-muted rounded-md overflow-auto max-h-[500px] text-sm">
                {generatedFiles["mapping.ts"]}
              </pre>
            </TabsContent>
            <TabsContent value="abi">
              <pre className="p-4 bg-muted rounded-md overflow-auto max-h-[500px] text-sm">
                {JSON.stringify(abi, null, 2)}
              </pre>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}
