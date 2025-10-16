import { http } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'

// Optional custom 0G chain (if RPC provided)
const ogRpcUrl = import.meta.env.VITE_OG_RPC_URL as string | undefined
const ogChain = ogRpcUrl
  ? {
      id: 11155111, // default to Sepolia-like id for dev unless provided
      name: '0G (Custom)',
      nativeCurrency: { name: 'OG', symbol: 'OG', decimals: 18 },
      rpcUrls: {
        default: { http: [ogRpcUrl] },
        public: { http: [ogRpcUrl] },
      },
    }
  : null

export const chains = ogChain ? [ogChain, mainnet] : [mainnet]

export const wagmiConfig = getDefaultConfig({
  appName: 'Velora Ramp',
  projectId: 'velora-dev', // WalletConnect project id placeholder
  chains,
  transports: chains.reduce((acc: Record<number, ReturnType<typeof http>>, c: any) => {
    acc[c.id] = http(c.rpcUrls?.default?.http?.[0] ?? 'https://rpc.ankr.com/eth')
    return acc
  }, {}),
})