import { useState } from 'react'
import Card from './ui/Card'
import Button from './ui/Button'
import Input from './ui/Input'
import Select from './ui/Select'

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
    <Card padded>
      <div className="section-title">Off-Ramp</div>
      <form onSubmit={onSubmit}>
        <div className="form-row">
          <div>
            <label>USDC amount</label>
            <Input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="100" />
          </div>
          <div>
            <label>Payout method</label>
            <Select value={payoutMethod} onChange={(e) => setPayoutMethod(e.target.value)}>
              <option value="bank">Bank Transfer</option>
              <option value="paypal">PayPal</option>
            </Select>
          </div>
        </div>
        <div className="form-actions mt-8">
          <Button variant="secondary">Request Payout</Button>
        </div>
      </form>
    </Card>
  )
}