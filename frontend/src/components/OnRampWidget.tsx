import { useState } from 'react'
import { createOnRampSession } from '../lib/api'
import Card from './ui/Card'
import Button from './ui/Button'
import Input from './ui/Input'
import Select from './ui/Select'

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
    <Card padded>
      <div className="section-title">On-Ramp</div>
      <form onSubmit={onSubmit}>
        <div className="form-row">
          <div>
            <label>Fiat amount</label>
            <Input value={fiatAmount} onChange={(e) => setFiatAmount(e.target.value)} placeholder="100" />
          </div>
          <div>
            <label>Currency</label>
            <Select value={currency} onChange={(e) => setCurrency(e.target.value)}>
              <option>USD</option>
              <option>EUR</option>
            </Select>
          </div>
        </div>
        <div className="form-actions mt-8">
          <Button variant="primary" disabled={loading}>{loading ? 'Creating...' : 'Create Payment'}</Button>
          {paymentUrl && (
            <a className="btn btn-secondary" href={paymentUrl} target="_blank" rel="noreferrer">Open Checkout</a>
          )}
        </div>
      </form>
    </Card>
  )
}