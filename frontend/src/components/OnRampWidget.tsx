import { useState } from 'react'
import { createOnRampSession } from '../lib/api'

type Props = { address?: string; isConnected: boolean; onComplete?: () => void }

export default function OnRampWidget({ address, isConnected, onComplete }: Props) {
  const [fiatAmount, setFiatAmount] = useState('100')
  const [currency, setCurrency] = useState('USD')
  const [loading, setLoading] = useState(false)
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isConnected || !address) return alert('Connect wallet first')
    setLoading(true)
    try {
      const res = await createOnRampSession({ walletAddress: address, fiatAmount: Number(fiatAmount), currency })
      setPaymentUrl(res?.paymentUrl || null)
      onComplete?.()
    } catch (err: any) {
      alert(err?.message || 'Failed to create session')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="section-title">On-Ramp</div>
      <form onSubmit={onSubmit}>
        <div className="row">
          <div>
            <label>Fiat amount</label>
            <input value={fiatAmount} onChange={(e) => setFiatAmount(e.target.value)} placeholder="100" />
          </div>
          <div>
            <label>Currency</label>
            <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
              <option>USD</option>
              <option>EUR</option>
            </select>
          </div>
        </div>
        <div className="actions" style={{ marginTop: 12 }}>
          <button className="glow-btn" disabled={loading}>{loading ? 'Creating...' : 'Create Payment'}</button>
          {paymentUrl && (
            <a className="glow-btn" href={paymentUrl} target="_blank" rel="noreferrer" style={{ background: '#1A1A1A', color: '#EAEAEA', border: '1px solid #222' }}>Open Checkout</a>
          )}
        </div>
      </form>
    </div>
  )
}