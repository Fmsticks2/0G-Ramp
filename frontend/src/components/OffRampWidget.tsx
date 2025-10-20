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
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card p-6">
      <div className="flex items-center gap-2 mb-4">
        <Icon icon="mdi:bank-transfer" className="text-accent" />
        <h2 className="text-xl font-semibold">Off-Ramp</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input className="input" type="number" min={1} value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="USDC amount" />
        <select className="input" value={payoutMethod} onChange={(e) => setPayoutMethod(e.target.value)}>
          <option value="bank">Bank Transfer</option>
          <option value="mobile">Mobile Money</option>
        </select>
        <button className="btn-accent btn" onClick={request} disabled={loading}>
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