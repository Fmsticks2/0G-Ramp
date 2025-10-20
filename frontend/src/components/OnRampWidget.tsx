import { useState } from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { useAccount } from 'wagmi'
import { createOnrampSession, simulateWebhook } from '../lib/api'

export default function OnRampWidget() {
  const { address } = useAccount()
  const [fiatAmount, setFiatAmount] = useState('100')
  const [currency, setCurrency] = useState('USD')
  const [sessionId, setSessionId] = useState<number | null>(null)
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const startOnramp = async () => {
    if (!address) return setMessage('Connect wallet first.')
    setLoading(true)
    setMessage(null)
    try {
      const res = await createOnrampSession({ walletAddress: address, fiatAmount: Number(fiatAmount), currency })
      setSessionId(res.sessionId)
      setPaymentUrl(res.paymentUrl)
      setMessage('Payment session created. Complete payment at the provider URL.')
    } catch (e: any) {
      setMessage(e.message)
    } finally {
      setLoading(false)
    }
  }

  const completePayment = async () => {
    if (!sessionId) return
    setLoading(true)
    try {
      await simulateWebhook(sessionId, 'success')
      setMessage('Payment confirmed. USDC transfer simulated and receipt stored.')
    } catch (e: any) {
      setMessage(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-base-600 bg-base-700/80 backdrop-blur-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <Icon icon="mdi:bank-transfer-in" className="text-accent" />
        <h2 className="text-xl font-semibold">On-Ramp</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input className="w-full rounded-xl bg-base-800 border border-base-600 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent" type="number" min={1} value={fiatAmount} onChange={(e) => setFiatAmount(e.target.value)} placeholder="Fiat amount" />
        <select className="w-full rounded-xl bg-base-800 border border-base-600 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent" value={currency} onChange={(e) => setCurrency(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
        <button className="inline-flex items-center justify-center rounded-2xl px-4 py-2 font-medium transition-colors bg-accent hover:bg-accent-600 text-white shadow-glow" onClick={startOnramp} disabled={loading}>
          {loading ? 'Starting…' : 'Create Payment Session'}
        </button>
      </div>
      {paymentUrl && (
        <div className="mt-3 text-sm">
          Payment URL: <a className="text-accent underline" href={paymentUrl} target="_blank" rel="noreferrer">{paymentUrl}</a>
        </div>
      )}
      {sessionId && (
        <div className="mt-3">
          <button className="inline-flex items-center justify-center rounded-2xl px-4 py-2 font-medium transition-colors bg-base-700 hover:bg-base-600 text-white shadow-glow" onClick={completePayment} disabled={loading}>
            <Icon icon="mdi:check-circle-outline" className="mr-2" /> Simulate Provider Success
          </button>
        </div>
      )}
      {message && <div className="mt-3 text-gray-300 text-sm">{message}</div>}
    </motion.div>
  )
}