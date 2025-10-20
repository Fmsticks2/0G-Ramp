import { configureChains, createConfig } from 'wagmi'
import { http } from 'viem'
import { mainnet } from 'wagmi/chains'

// 0G Galileo testnet definition
export const ogGalileo = {
  id: 16602,
  name: '0G Galileo Testnet',
  network: 'ogGalileo',
  nativeCurrency: { name: 'OG', symbol: 'OG', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://evmrpc-testnet.0g.ai'] },
    public: { http: ['https://evmrpc-testnet.0g.ai'] },
  },
} as const

export const localhost = {
  id: 31337,
  name: 'Hardhat Local',
  network: 'localhost',
  nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
  rpcUrls: { default: { http: ['http://127.0.0.1:8545'] } },
} as const

const chains = [ogGalileo, localhost, mainnet]

export const wagmiConfig = createConfig({
  chains,
  transports: chains.reduce((acc: any, chain: any) => {
    acc[chain.id] = http(chain.rpcUrls.default.http[0])
    return acc
  }, {}),
})