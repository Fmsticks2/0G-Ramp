import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:3001',
  timeout: 12000,
})

export interface OnRampSessionInput {
  walletAddress: string
  fiatAmount: number
  currency: string
}

export async function createOnRampSession(input: OnRampSessionInput) {
  const { data } = await api.post('/api/onramp/create-session', input)
  return data
}

export async function getTransactionsByWallet(walletAddress: string) {
  const { data } = await api.get(`/api/transactions/by-wallet/${walletAddress}`)
  return data
}

export default api