import { useState } from 'react'

type Props = { address?: string; isConnected: boolean; onComplete?: () => void }

export default function OffRampWidget({ address, isConnected, onComplete }: Props) {
  const [amount, setAmount] = useState('100')
  const [payoutMethod, setPayoutMethod] = useState('bank')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isConnected || !address) return alert('Connect wallet first')
    // Placeholder: backend request will be wired later
    onComplete?.()
    alert('Off-ramp request submitted (placeholder).')
  }

  return (
    <div>
      <div className="section-title">Off-Ramp</div>
      <form onSubmit={onSubmit}>
        <div className="row">
          <div>
            <label>USDC amount</label>
            <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="100" />
          </div>
          <div>
            <label>Payout method</label>
            <select value={payoutMethod} onChange={(e) => setPayoutMethod(e.target.value)}>
              <option value="bank">Bank Transfer</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>
        </div>
        <div className="actions" style={{ marginTop: 12 }}>
          <button className="glow-btn">Request Payout</button>
        </div>
      </form>
    </div>
  )
}