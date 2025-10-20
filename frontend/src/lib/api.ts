const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3001'

export type TxRow = {
  id: number
  sessionId: number
  txHash?: string
  storageCid?: string
  amount: number
  status: string
  type: string
  wallet: string
  createdAt: string
}

export async function createOnrampSession(params: { walletAddress: string; fiatAmount: number; currency: string }) {
  const res = await fetch(`${API_BASE}/api/onramp/create-session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  })
  if (!res.ok) throw new Error('Failed to create session')
  return res.json() as Promise<{ sessionId: number; clientToken: string; paymentUrl: string }>
}

export async function requestOfframp(params: { walletAddress: string; amount: number; payoutMethod: string }) {
  const res = await fetch(`${API_BASE}/api/offramp/request`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  })
  if (!res.ok) throw new Error('Failed to request payout')
  return res.json() as Promise<{ sessionId: number; depositRef: string }>
}

export async function simulateWebhook(sessionId: number, status: 'success' | 'failed') {
  const res = await fetch(`${API_BASE}/api/webhook/payment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-provider-signature': 'dev' },
    body: JSON.stringify({ sessionId, status }),
  })
  if (!res.ok) throw new Error('Webhook failed')
  return res.json()
}

export async function getTransactionsByWallet(wallet: string) {
  const res = await fetch(`${API_BASE}/api/transactions/by-wallet/${wallet}`)
  if (!res.ok) throw new Error('Failed to load transactions')
  return res.json() as Promise<TxRow[]>
}