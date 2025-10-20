import { useReadContract } from 'wagmi'
import type { Abi } from 'viem'
import { ogGalileo } from '../lib/wagmi'

const adminAddress = import.meta.env.VITE_RAMP_ADMIN_ADDRESS || '0x0601ED877D78dc4BE53cDd25A0dAfF3F6d261640'
const adminAbi: Abi = [
  {
    type: 'function',
    name: 'feeBps',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
  },
]

export default function ContractInfo() {
  const { data, isLoading, error } = useReadContract({
    address: adminAddress as `0x${string}`,
    abi: adminAbi,
    functionName: 'feeBps',
    chainId: ogGalileo.id,
  })

  return (
    <div className="rounded-2xl border border-base-600 bg-base-700/80 backdrop-blur-md p-4 text-sm text-gray-300">
      <div className="font-medium text-white">Chain & Contract</div>
      <div className="mt-1">Network: 0G Galileo (16602)</div>
      <div className="mt-1">RampAdmin: <span className="text-accent">{adminAddress}</span></div>
      <div className="mt-1">Fee: {isLoading ? 'Loading…' : error ? 'Error' : `${data?.toString?.()} bps`}</div>
    </div>
  )
}