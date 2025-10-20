import { useState } from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { useAccount } from 'wagmi'
import { requestOfframp } from '../lib/api'

export default function OffRampWidget() {
  const { address } = useAccount()
  const [amount, setAmount] = useState('50')
  const [payoutMethod, setPayoutMethod] = useState('bank')
  const [depositRef, setDepositRef] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const request = async () => {
    if (!address) return setMessage('Connect wallet first.')
    setLoading(true)
    setMessage(null)
    try {
      const res = await requestOfframp({ walletAddress: address, amount: Number(amount), payoutMethod })
      setDepositRef(res.depositRef)
      setMessage('Off-ramp request created. Send USDC to vault with memo if required.')
    } catch (e: any) {
      setMessage(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-base-600 bg-base-700/80 backdrop-blur-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <Icon icon="mdi:bank-transfer" className="text-accent" />
        <h2 className="text-xl font-semibold">Off-Ramp</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input className="w-full rounded-xl bg-base-800 border border-base-600 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent" type="number" min={1} value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="USDC amount" />
        <select className="w-full rounded-xl bg-base-800 border border-base-600 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent" value={payoutMethod} onChange={(e) => setPayoutMethod(e.target.value)}>
          <option value="bank">Bank Transfer</option>
          <option value="mobile">Mobile Money</option>
        </select>
        <button className="inline-flex items-center justify-center rounded-2xl px-4 py-2 font-medium transition-colors bg-accent hover:bg-accent-600 text-white shadow-glow" onClick={request} disabled={loading}>
          {loading ? 'Submitting…' : 'Request Payout'}
        </button>
      </div>
      {depositRef && (
        <div className="mt-3 text-sm">Deposit Reference: <span className="text-accent">{depositRef}</span></div>
      )}
      {message && <div className="mt-3 text-gray-300 text-sm">{message}</div>}
    </motion.div>
  )
}