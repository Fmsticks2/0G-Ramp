import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { getTransactionsByWallet, TxRow } from '../lib/api'
import { useAccount } from 'wagmi'

export default function Transactions() {
  const { address } = useAccount()
  const [rows, setRows] = useState<TxRow[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      if (!address) return
      setLoading(true)
      setError(null)
      try {
        const data = await getTransactionsByWallet(address)
        setRows(data)
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [address])

  return (
    <Layout>
      <div className="card p-6">
        <div className="text-xl font-semibold mb-4">Transactions</div>
        {!address && <div className="text-sm text-gray-400">Connect wallet to view history.</div>}
        {loading && <div className="text-sm text-gray-400">Loading…</div>}
        {error && <div className="text-sm text-red-400">{error}</div>}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-left text-gray-400">
              <tr>
                <th className="py-2">Date</th>
                <th className="py-2">Type</th>
                <th className="py-2">Amount</th>
                <th className="py-2">TxHash</th>
                <th className="py-2">0G CID</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-base-600">
                  <td className="py-2">{new Date(r.createdAt).toLocaleString()}</td>
                  <td className="py-2 capitalize">{r.type}</td>
                  <td className="py-2">{r.amount}</td>
                  <td className="py-2">
                    {r.txHash ? (
                      <a className="text-accent underline" href={`https://blockexplorer/tx/${r.txHash}`} target="_blank" rel="noreferrer">{r.txHash.slice(0, 10)}…</a>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="py-2">{r.storageCid || '-'}</td>
                  <td className="py-2">{r.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}