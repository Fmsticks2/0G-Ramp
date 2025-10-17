import { http } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import type { Chain } from 'viem'

// Optional custom 0G chain (if RPC provided)
const ogRpcUrl = import.meta.env.VITE_OG_RPC_URL as string | undefined
const ogChainIdRaw = import.meta.env.VITE_OG_CHAIN_ID as string | undefined
const ogChainId = ogChainIdRaw ? Number(ogChainIdRaw) : 16602
const ogChain: Chain | undefined = ogRpcUrl
  ? {
      id: ogChainId,
      name: '0G-Galileo-Testnet',
      nativeCurrency: { name: 'OG', symbol: 'OG', decimals: 18 },
      rpcUrls: {
        default: { http: [ogRpcUrl] },
        public: { http: [ogRpcUrl] },
      },
    }
  : undefined

export const chains: [Chain, ...Chain[]] = ogChain ? [ogChain, mainnet] : [mainnet]

const wcProjectId = (import.meta.env.VITE_WC_PROJECT_ID as string | undefined) || 'demo'

export const wagmiConfig = getDefaultConfig({
  appName: 'Velora Ramp',
  projectId: wcProjectId,
  chains,
  transports: chains.reduce((acc, c) => {
    acc[c.id] = http(c.rpcUrls.default.http[0] ?? 'https://rpc.ankr.com/eth')
    return acc
  }, {} as Record<number, ReturnType<typeof http>>),
})